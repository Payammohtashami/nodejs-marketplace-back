const router = require('express').Router();
const redisClient = require('../utils/init_redis');
const { HomeRoutes } = require('./api/router');
const { DeveloperRoutes } = require('./developer.routes');
const { UserAuthRoutes } = require('./user/auth.routes');
(async() => {
    await redisClient.set('key', 'value');
    const value = await redisClient.get('key');
    console.log(value);
})();
router.use('/developer', DeveloperRoutes);
router.use('/user', UserAuthRoutes);
router.use('/', HomeRoutes);

module.exports = router;