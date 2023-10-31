const router = require('express').Router();
const { CategoryController } = require('../../http/controllers/admin/category.controller');

/**
 * @swagger
 *  components:
 *      schemas:
 *          Create:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Enter categories title
 *                  parent:
 *                      type: string
 *                      description: Enter categories parent
 */


/**
 * @swagger
 *  /api/admin/category/add:
 *      post:
 *          tags: [Admin-Categories]
 *          summary: create new category
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Create'
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
 *          tags: [Admin-Categories]
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
 *  /api/admin/category/list-of-all:
 *      get:
 *          tags: [Admin-Categories]
 *          summary: get all categories with out populate and nested structure
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
router.get('/list-of-all', CategoryController.getAllCategoriesWithoutPopulate);

/**
 * @swagger
 *  /api/admin/category/parents:
 *      get:
 *          tags: [Admin-Categories]
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
 *          tags: [Admin-Categories]
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
 *  /api/admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Categories]
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

/**
 * @swagger
 *  /api/admin/category/update/{id}:
 *      patch:
 *          tags: [Admin-Categories]
 *          summary: Update category by id
 *          parameters:
 *          -   in: path
 *              type: string
 *              required: true
 *              name: id
 *          -   in: formData
 *              type: string
 *              required: true
 *              name: title
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
router.patch('/update/:id', CategoryController.updateCategory);

/**
 * @swagger
 *  /api/admin/category/{id}:
 *      get:
 *          tags: [Admin-Categories]
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

module.exports = { categoryRoutes: router };