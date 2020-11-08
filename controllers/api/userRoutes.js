const router = require("express").Router();
const { User } = require("../../models");

router.post("/", (req, res) => {
  User.create({
    user_name: req.body.user_name,
    user_pass: req.body.password
  }).then(dbUserData => {
      //console.log(dbUserData);
      req.session.save(() => {
      req.session.userId = dbUserData.user_id;
      req.session.username = dbUserData.user_name;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: { user_name: req.body.user_name }
  }).then(dbUserData => {
    if (!dbUserData) {
      console.log('='.repeat(50) + '\n user-routes : /login : line 35 : INVALID USER \n' + '='.repeat(50));
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('='.repeat(50) + '\n user-routes /login line 43 : INVALID PASSWORD \n' + '='.repeat(50));
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = dbUserData.user_id;
      req.session.username = dbUserData.user_name;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;