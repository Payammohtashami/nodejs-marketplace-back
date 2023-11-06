const router = require('express').Router();
const { HomeRoutes } = require('./api/router');
const { AdminRoutes } = require('./admin/routes');
const { UserAuthRoutes } = require('./user/auth.routes');
const { DeveloperRoutes } = require('./developer.routes');
const { VerifyAccessToken, checkRole } = require('../http/middlewares/verifyAccessToken');

router.use('/developer', DeveloperRoutes);
router.use('/admin', VerifyAccessToken, checkRole('ADMIN'), AdminRoutes);
router.use('/user', UserAuthRoutes);
router.use('/', HomeRoutes);

module.exports = router;