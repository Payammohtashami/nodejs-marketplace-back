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
 *                  -   image
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
 *                  image:
 *                      type: file
 *                      description: product image
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
 *  /api/admin/products:
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
router.post('/', uploadFile.single('image'), stringToArray('tags'), ProductController.addProduct);
router.get('/', ProductController.getAllProducts);

module.exports = { productsRoutes: router };