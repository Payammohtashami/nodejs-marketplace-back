const router = require('express').Router();
const { ProductController } = require('../../http/controllers/admin/product.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadFile } = require('../../utils/multer');

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   subtitle
 *                  -   price
 *                  -   tags
 *                  -   description
 *                  -   images
 *                  -   category
 *                  -   teacher
 *              properties:
 *                  title:
 *                      type: string
 *                      description: product title (name)
 *                  subtitle:
 *                      type: string
 *                      description: product subtitle
 *                  price:
 *                      type: string
 *                      description: product price
 *                  description:
 *                      type: string
 *                      description: product description
 *                  category:
 *                      type: string
 *                      description: product category
 *                  tags:
 *                      type: array
 *                      description: product tags
 *                  teacher:
 *                      type: string
 *                      description: product teacher
 *                  avaliable_counts:
 *                      type: string
 *                      description: product teacher
 *                  discount:
 *                      type: string
 *                      description: product teacher
 *                  images:
 *                      type: array
 *                      description: product images
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: height of product pack
 *                  width:
 *                      type: string
 *                      description: width of product pack
 *                  length:
 *                      type: string
 *                      description: length of product pack
 *                  weight:
 *                      type: string
 *                      description: weight of product pack
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-Product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: product title (name)
 *                  subtitle:
 *                      type: string
 *                      description: product subtitle
 *                  price:
 *                      type: string
 *                      description: product price
 *                  description:
 *                      type: string
 *                      description: product description
 *                  category:
 *                      type: string
 *                      description: product category
 *                  tags:
 *                      type: array
 *                      description: product tags
 *                  teacher:
 *                      type: string
 *                      description: product teacher
 *                  avaliable_counts:
 *                      type: string
 *                      description: product teacher
 *                  discount:
 *                      type: string
 *                      description: product teacher
 *                  images:
 *                      type: array
 *                      description: product images
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: height of product pack
 *                  width:
 *                      type: string
 *                      description: width of product pack
 *                  length:
 *                      type: string
 *                      description: length of product pack
 *                  weight:
 *                      type: string
 *                      description: weight of product pack
 */


/**
 * @swagger
 *  /api/admin/products/add:
 *      post:
 *          tags: [Products(Admin-Panel)]
 *          summary: create and save products
 *          consumes:
 *          -   multipart/form-data
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
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
router.post('/add', uploadFile.array('images', 10), stringToArray('tags'), ProductController.addProduct);

/**
 * @swagger
 *  /api/admin/products/all:
 *      get:
 *          tags: [Products(Admin-Panel)]
 *          summary: get all products
 *          parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: text for search in title & description
 *          responses:
 *              200: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */
router.get('/all', ProductController.getAllProducts);

/**
 * @swagger
 *  /api/admin/products/{id}:
 *      get:
 *          tags: [Products(Admin-Panel)]
 *          summary: get product details by id
 *          parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *          responses:
 *              200: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */
router.get('/:id', ProductController.getOneProduct);

/**
 * @swagger
 *  /api/admin/products/remove/{id}:
 *      delete:
 *          tags: [Products(Admin-Panel)]
 *          summary: remove product by products id
 *          parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *          responses:
 *              200: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */
router.delete('/remove/:id', ProductController.removeProduct);

/**
 * @swagger
 *  /api/admin/products/update/{id}:
 *      put:
 *          tags: [Products(Admin-Panel)]
 *          summary: update product by products id
 *          parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *          consumes:
 *          -   multipart/form-data
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Product'
 *          responses:
 *              200: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */
router.put('/update/:id', uploadFile.array('images', 10), stringToArray('tags'),ProductController.updateProduct);

module.exports = { productsRoutes: router };