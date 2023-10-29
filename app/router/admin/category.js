const {CategoryController} = require('../../http/controllers/admin/category.controller');

const router = require('express').Router();

/**
 * @swagger
 *  /api/admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
 *          summary: create new category
 *          parameters:
 *          -   in: formData
 *              required: true
 *              name: title
 *          -   in: formData
 *              required: false
 *              name: parent
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
router.post('/add', CategoryController.addCategory);

/**
 * @swagger
 *  /api/admin/category/all:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all categories parents
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
router.get('/all', CategoryController.getAllCategory);

/**
 * @swagger
 *  /api/admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all categories parents children
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
router.get('/parents', CategoryController.getAllParents);

/**
 * @swagger
 *  /api/admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all categories parents
 *          parameters:
 *          -   in: path
 *              type: string
 *              required: true
 *              name: parent
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
router.get('/children/:parent', CategoryController.getchildrenOfParents);

/**
 * @swagger
 *  /api/admin/category/{id}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get category by object-id
 *          parameters:
 *          -   in: path
 *              type: string
 *              required: true
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
router.get('/:id', CategoryController.getCategoryById);

/**
 * @swagger
 *  /api/admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Panel]
 *          summary: remove category by id
 *          parameters:
 *          -   in: path
 *              type: string
 *              required: true
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
router.delete('/remove/:id', CategoryController.removeCategory);

module.exports = { categoryRoutes: router };