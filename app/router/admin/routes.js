const router = require('express').Router();
const { roleRoutes } = require('./role.routes');
const { usersRoutes } = require('./user.routes');
const { blogsRoutes } = require('./blog.routes');
const { courseRoutes } = require('./course.routes');
const { chapterRoutes } = require('./chapter.routes');
const { episodeRoutes } = require('./episode.routes');
const { categoryRoutes } = require('./category.routes');
const { productsRoutes } = require('./product.routes');
const { permissionRoutes } = require('./permission.routes');
const { checkPermissions } = require('../../http/middlewares/permission.guard');
const { PERMISSIONS } = require('../../utils/constans');

router.use('/user', checkPermissions([]), usersRoutes);

router.use('/role', checkPermissions([]), roleRoutes);
router.use('/permission', checkPermissions([]), permissionRoutes);

router.use('/blog', checkPermissions([PERMISSIONS.TEACHER, PERMISSIONS.WRITER]),blogsRoutes);

router.use('/course', checkPermissions([PERMISSIONS.WRITER, PERMISSIONS.TEACHER]),courseRoutes);
router.use('/chapter', checkPermissions([PERMISSIONS.TEACHER]),chapterRoutes);
router.use('/episode', checkPermissions([PERMISSIONS.TEACHER]),episodeRoutes);

router.use('/category', checkPermissions([PERMISSIONS.WRITER]),categoryRoutes);

router.use('/products', checkPermissions([PERMISSIONS.WRITER]),productsRoutes);

module.exports = { AdminRoutes: router };