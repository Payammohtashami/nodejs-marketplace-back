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
 *          parameters:
 *          -   in: header
 *              required: true
 *              name: access-token
 *              type: string
 *              value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE4Nzk1ODgwNSIsImlhdCI6MTY5ODY5NzI0MywiZXhwIjoxNjk4NzAwODQzfQ.3Omip5hGDPTL0okW4n9yP4DkXC3rlL1ikpOS7si2lcA
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
 *  /api/admin/blog/{id}:
 *      get:
 *          tags: [Admin-Blogs]
 *          summary: get blog by object-id
 *          parameters:
 *          -   in: header
 *              required: true
 *              name: access-token
 *              type: string
 *              value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE4Nzk1ODgwNSIsImlhdCI6MTY5ODY5NzI0MywiZXhwIjoxNjk4NzAwODQzfQ.3Omip5hGDPTL0okW4n9yP4DkXC3rlL1ikpOS7si2lcA
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
 *          tags: [Admin-Blogs]
 *          summary: remove blog by object-id
 *          parameters:
 *          -   in: header
 *              required: true
 *              name: access-token
 *              type: string
 *              value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE4Nzk1ODgwNSIsImlhdCI6MTY5ODY5NzI0MywiZXhwIjoxNjk4NzAwODQzfQ.3Omip5hGDPTL0okW4n9yP4DkXC3rlL1ikpOS7si2lcA
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
 *          tags: [Admin-Blogs]
 *          summary: create new blogs
 *          consumes:
 *          -   multipart/form-data
 *          parameters:
 *          -   in: header
 *              required: true
 *              name: access-token
 *              type: string
 *              value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE4Nzk1ODgwNSIsImlhdCI6MTY5ODY5NzI0MywiZXhwIjoxNjk4NzAwODQzfQ.3Omip5hGDPTL0okW4n9yP4DkXC3rlL1ikpOS7si2lcA
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

/**
 * @swagger
 *  /api/admin/blog/update/{id}:
 *      patch:
 *          tags: [Admin-Blogs]
 *          summary: update blog document by object-id
 *          consumes:
 *          -   multipart/form-data
 *          parameters:
 *          -   in: header
 *              required: true
 *              name: access-token
 *              type: string
 *              value: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE4Nzk1ODgwNSIsImlhdCI6MTY5ODY5NzI0MywiZXhwIjoxNjk4NzAwODQzfQ.3Omip5hGDPTL0okW4n9yP4DkXC3rlL1ikpOS7si2lcA
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
router.patch('/update/:id', uploadFile.single('image'), stringToArray('tags'),  BlogController.updateBlogById);

module.exports = { blogsRoutes: router };