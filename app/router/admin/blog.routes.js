const { BlogController } = require('../../http/controllers/admin/blog.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadFile } = require('../../utils/multer');

const router = require('express').Router();

/**
 * @swagger
 *  /api/admin/blog/list-all:
 *      get:
 *          tags: [Admin-Blogs]
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
router.get('/list-all', BlogController.getListOfBlogs);


/**
 * @swagger
 *  /api/admin/blog/add:
 *      post:
 *          tags: [Admin-Blogs]
 *          summary: create new blogs
 *          consumes:
 *          -   multipart/form-data
 *          parameters:
 *          -   in: formData
 *              required: true
 *              name: title
 *              type: string
 *          -   in: formData
 *              required: true
 *              name: subtitle
 *              type: string
 *          -   in: formData
 *              required: true
 *              name: category
 *              type: string
 *          -   in: formData
 *              required: true
 *              name: tags
 *              type: string
 *          -   in: formData
 *              required: false
 *              name: text
 *              type: string
 *          -   in: formData
 *              required: true
 *              name: image
 *              type: file
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
router.post( '/add', uploadFile.single('image'), stringToArray('tags'),  BlogController.createBlog );

module.exports = { blogsRoutes: router };