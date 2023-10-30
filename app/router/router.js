const router = require('express').Router();
const { HomeRoutes } = require('./api/router');
const { categoryRoutes } = require('./admin/category.routes');
const { UserAuthRoutes } = require('./user/auth.routes');
const { DeveloperRoutes } = require('./developer.routes');
const { blogsRoutes } = require('./admin/blog.routes');
const VerifyAccessToken = require('../http/middlewares/verifyAccessToken');

/**
 * @swagger
 *  tags:
 *      -   name: Developer-Routes
 *          description: developer-Utils
 *      -   name: Admin-Categories
 *          description: admins categories managment routes
 *      -   name: Admin-Blogs
 *          description: admins blog managment routes
 *      -   name : User-Authentication
 *          description : user-auth section
 */


router.use('/admin/category', categoryRoutes);
router.use('/admin/blog', VerifyAccessToken, blogsRoutes);
router.use('/developer', DeveloperRoutes);
router.use('/user', UserAuthRoutes);
router.use('/', HomeRoutes);

module.exports = router;