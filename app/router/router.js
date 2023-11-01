const router = require('express').Router();
const { HomeRoutes } = require('./api/router');
const { categoryRoutes } = require('./admin/category.routes');
const { UserAuthRoutes } = require('./user/auth.routes');
const { DeveloperRoutes } = require('./developer.routes');
const { blogsRoutes } = require('./admin/blog.routes');
const { VerifyAccessToken, checkRole } = require('../http/middlewares/verifyAccessToken');
const { productsRoutes } = require('./admin/product.routes');

/**
 * @swagger
 *  tags:
 *      -   name: Developer-Routes
 *          description: developer-Utils
 *      -   name: Category(Admin-Panel)
 *          description: admins categories managment routes
 *      -   name: Blogs(Admin-Panel)
 *          description: admins blog managment routes
 *      -   name : Products(Admin-Panel)
 *          description : managment product routes
 *      -   name : User-Authentication
 *          description : user-auth section
 */


router.use('/admin/products', VerifyAccessToken, checkRole('ADMIN'), productsRoutes);
router.use('/admin/category', VerifyAccessToken, checkRole('ADMIN'), categoryRoutes);
router.use('/admin/blog', VerifyAccessToken, checkRole('ADMIN'), blogsRoutes);
router.use('/developer', DeveloperRoutes);
router.use('/user', UserAuthRoutes);
router.use('/', HomeRoutes);

module.exports = router;