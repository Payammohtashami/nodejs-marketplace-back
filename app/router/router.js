const router = require('express').Router();
const { HomeRoutes } = require('./api/router');
const { AdminRoutes } = require('./admin/routes');
const { UserAuthRoutes } = require('./user/auth.routes');
const { DeveloperRoutes } = require('./developer.routes');
const { VerifyAccessToken } = require('../http/middlewares/verifyAccessToken');
const { graphqlHTTP } = require('express-graphql');
const { graphqlConfig } = require('../utils/graphql.config');

router.use('/developer', DeveloperRoutes);
router.use('/admin', VerifyAccessToken, AdminRoutes);
router.use('/user', UserAuthRoutes);
router.use('/graphql', graphqlHTTP(graphqlConfig));
router.use('/', HomeRoutes);

module.exports = router;