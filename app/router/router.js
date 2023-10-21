const router = require('express').Router();
const { HomeRoutes } = require('./api/router');

router.use('/api', HomeRoutes)


module.exports = router;