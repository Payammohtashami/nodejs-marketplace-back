const router = require('express').Router();
const { categoryRoutes } = require('./admin/category');
const { HomeRoutes } = require('./api/router');
const { DeveloperRoutes } = require('./developer.routes');
const { UserAuthRoutes } = require('./user/auth.routes');

/**
 * @swagger
 *  tags:
 *      name: Developer-Routes
 *      description: developer-Utils
 */

/**
 * @swagger
 *  tags:
 *      name: Admin-Panel
 *      description: admins-routes
 */

/**
 * @swagger
 *  tags:
 *      name : User-Authentication
 *      description : user-auth section
 */
router.use('/developer', DeveloperRoutes);
router.use('/user', UserAuthRoutes);
router.use('/admin/category', categoryRoutes);
router.use('/', HomeRoutes);

module.exports = router;