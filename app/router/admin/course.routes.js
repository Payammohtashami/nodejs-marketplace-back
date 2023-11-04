const router = require('express').Router();
const { CourseController } = require('../../http/controllers/admin/course.controller');
const { storagePathName } = require('../../http/middlewares/storagePathName');
const { uploadFile } = require('../../utils/multer');

/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   FREE
 *                  -   CASH
 *                  -   VIP
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   subtitle
 *                  -   description
 *                  -   image
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   teacher
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: course title (name)
 *                  subtitle:
 *                      type: string
 *                      description: course subtitle
 *                  price:
 *                      type: string
 *                      description: course price
 *                  description:
 *                      type: string
 *                      description: course description
 *                  category:
 *                      type: string
 *                      description: course category
 *                  tags:
 *                      type: array
 *                      description: course tags
 *                  teacher:
 *                      type: string
 *                      description: course teacher
 *                  discount:
 *                      type: string
 *                      description: course discount
 *                  type:
 *                      $ref: '#/components/schemas/Types'
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: course image
 */



/**
 * @swagger
 *  /api/admin/course/list:
 *      get:
 *          tags: [Course(Admin-Panel)]
 *          summary: get all course
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  require: false
 *                  type: text
 *                  description: search in course name, description and subtitle
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */
router.get('/list', CourseController.getAllCourse);

/**
 * @swagger
 *  /api/admin/course/{id}:
 *      get:
 *          tags: [Course(Admin-Panel)]
 *          summary: get course by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  require: true
 *                  type: string
 *                  description: find course by id
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */
router.get('/:id', CourseController.getCourseById);


/**
 * @swagger
 *  /api/admin/course/add:
 *      post:
 *          tags: [Course(Admin-Panel)]
 *          summary: create and save new course
 *          consumes:
 *          -   multipart/form-data
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */
router.post('/add', storagePathName('course'), uploadFile.single('image'), CourseController.addCourse);

module.exports = { courseRoutes: router };