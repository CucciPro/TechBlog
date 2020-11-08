const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./routes/home');
const dashboardRoutes = require('./routes/dashboard.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;