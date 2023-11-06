const router = require('express').Router();
const { uploadFile } = require('../../utils/multer');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { BlogController } = require('../../http/controllers/admin/blog.controller');
const { storagePathName } = require('../../http/middlewares/storagePathName');

router.get('/list', BlogController.getListOfBlogs);
router.get('/:id', BlogController.getOneBlogById);
router.delete('/remove/:id', BlogController.removeBlogById);
router.post( '/add', storagePathName('blogs'), uploadFile.single('image'), stringToArray('tags'),  BlogController.createBlog );
router.patch('/update/:id', storagePathName('blogs'), uploadFile.single('image'), stringToArray('tags'),  BlogController.updateBlogById);

module.exports = { blogsRoutes: router };