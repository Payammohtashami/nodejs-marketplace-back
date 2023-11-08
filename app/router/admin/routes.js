const router = require('express').Router();
const { usersRoutes } = require('./user.routes');
const { blogsRoutes } = require('./blog.routes');
const { courseRoutes } = require('./course.routes');
const { chapterRoutes } = require('./chapter.routes');
const { episodeRoutes } = require('./episode.routes');
const { categoryRoutes } = require('./category.routes');
const { productsRoutes } = require('./product.routes');

router.use('/user', usersRoutes);

router.use('/blog', blogsRoutes);

router.use('/course', courseRoutes);
router.use('/chapter', chapterRoutes);
router.use('/episode', episodeRoutes);

router.use('/category', categoryRoutes);

router.use('/products', productsRoutes);

module.exports = { AdminRoutes: router };