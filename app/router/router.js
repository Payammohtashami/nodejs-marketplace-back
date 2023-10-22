const router = require('express').Router();
const { HomeRoutes } = require('./api/router');
const { UserAuthRoutes } = require('./user/auth.routes');

router.use('/', HomeRoutes);
router.use('/user', UserAuthRoutes);

module.exports = router;