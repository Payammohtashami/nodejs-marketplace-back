const router = require('express').Router();
const { HomeRoutes } = require('./api/router');
const { AdminRoutes } = require('./admin/routes');
const { UserAuthRoutes } = require('./user/auth.routes');
const { DeveloperRoutes } = require('./developer.routes');
const { VerifyAccessToken, checkRole } = require('../http/middlewares/verifyAccessToken');

/**
 * @swagger
 *  tags:
 *      -   name: Developer-Routes
 *          description: developer-Utils
 *      -   name: Category(Admin-Panel)
 *          description: admins categories managment routes
 *      -   name: Course(Admin-Panel)
 *          description: admins courses, chapter and episode managment routes
 *      -   name: Blogs(Admin-Panel)
 *          description: admins blog managment routes
 *      -   name : Products(Admin-Panel)
 *          description : managment product routes
 *      -   name : User-Authentication
 *          description : user-auth section
 */



router.use('/developer', DeveloperRoutes);
router.use('/admin', VerifyAccessToken, checkRole('ADMIN'), AdminRoutes);
router.use('/user', UserAuthRoutes);
router.use('/', HomeRoutes);

module.exports = router;