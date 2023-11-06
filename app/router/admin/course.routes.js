const router = require('express').Router();
const { CourseController } = require('../../http/controllers/admin/course.controller');
const { storagePathName } = require('../../http/middlewares/storagePathName');
const { uploadFile } = require('../../utils/multer');


router.get('/list', CourseController.getAllCourse);
router.get('/:id', CourseController.getCourseById);
router.post('/add', storagePathName('course'), uploadFile.single('image'), CourseController.addCourse);

module.exports = { courseRoutes: router };