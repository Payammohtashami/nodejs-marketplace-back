const router = require('express').Router();
const { uploadFile } = require('../../utils/multer');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { BlogController } = require('../../http/controllers/admin/blog.controller');
const { storagePathName } = require('../../http/middlewares/storagePathName');

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   subtitle
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Enter blogs title
 *                  subtitle:
 *                      type: string
 *                      description: Enter blogs subtitle
 *                  text:
 *                      type: string
 *                      description: Enter blogs text
 *                  category:
 *                      type: string
 *                      description: Enter blogs category
 *                  tags:
 *                      type: string
 *                      description: Enter blogs tags
 *                  image:
 *                      type: file
 *                      description: Enter blogs image
 */


/**
 * @swagger
 *  /api/admin/blog/list:
 *      get:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: get all blogs
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
router.get('/list', BlogController.getListOfBlogs);

/**
 * @swagger
 *  /api/admin/blog/{id}:
 *      get:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: get blog by object-id
 *          parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
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
router.get('/:id', BlogController.getOneBlogById);

/**
 * @swagger
 *  /api/admin/blog/remove/{id}:
 *      delete:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: remove blog by object-id
 *          parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
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
router.delete('/remove/:id', BlogController.removeBlogById);

/**
 * @swagger
 *  /api/admin/blog/add:
 *      post:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: create new blogs
 *          consumes:
 *          -   multipart/form-data
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/formdata:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateBlog'
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
router.post( '/add', storagePathName('blogs'), uploadFile.single('image'), stringToArray('tags'),  BlogController.createBlog );

/**
 * @swagger
 *  /api/admin/blog/update/{id}:
 *      patch:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: update blog document by object-id
 *          consumes:
 *          -   multipart/form-data
 *          parameters:
 *          -   in: formData
 *              name: title
 *              type: string
 *          -   in: formData
 *              name: subtitle
 *              type: string
 *          -   in: formData
 *              name: category
 *              type: string
 *          -   in: formData
 *              name: tags
 *              type: string
 *          -   in: formData
 *              name: text
 *              type: string
 *          -   in: formData
 *              name: image
 *              type: file
 *          -   in: path
 *              required: true
 *              type: string
 *              name: id
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
router.patch('/update/:id', storagePathName('blogs'), uploadFile.single('image'), stringToArray('tags'),  BlogController.updateBlogById);

module.exports = { blogsRoutes: router };