const router = require('express').Router();

const userRoute = require('./userRoutes.js');
const postRoute = require('./postRoutes');
const commentRoute = require('./commentRoutes');

router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute);

module.exports = router;