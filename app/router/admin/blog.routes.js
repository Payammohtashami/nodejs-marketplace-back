const { BlogController } = require('../../http/controllers/admin/blog.controller');

const router = require('express').Router();

/**
 * @swagger
 *  /api/admin/blog/list-all:
 *      post:
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

module.exports = { blogsRoutes: router };