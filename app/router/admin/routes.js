const router = require('express').Router();
const { blogsRoutes } = require('./blog.routes');
const { courseRoutes } = require('./course.routes');
const { categoryRoutes } = require('./category.routes');
const { productsRoutes } = require('./product.routes');
const { chapterRoutes } = require('./chapter.routes');

router.use('/blog', blogsRoutes);

router.use('/course', courseRoutes);
router.use('/chapter', chapterRoutes);

router.use('/category', categoryRoutes);

router.use('/products', productsRoutes);

module.exports = { AdminRoutes: router };