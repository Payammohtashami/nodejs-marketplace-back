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
 *          tags: [Category(Admin-Panel)]
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

/**
 * @swagger
 *  /api/admin/category/all:
 *      get:
 *          tags: [Category(Admin-Panel)]
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

/**
 * @swagger
 *  /api/admin/category/list-of-all:
 *      get:
 *          tags: [Category(Admin-Panel)]
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

/**
 * @swagger
 *  /api/admin/category/parents:
 *      get:
 *          tags: [Category(Admin-Panel)]
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

/**
 * @swagger
 *  /api/admin/category/children/{parent}:
 *      get:
 *          tags: [Category(Admin-Panel)]
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

/**
 * @swagger
 *  /api/admin/category/remove/{id}:
 *      delete:
 *          tags: [Category(Admin-Panel)]
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

/**
 * @swagger
 *  /api/admin/category/update/{id}:
 *      patch:
 *          tags: [Category(Admin-Panel)]
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

/**
 * @swagger
 *  /api/admin/category/{id}:
 *      get:
 *          tags: [Category(Admin-Panel)]
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
