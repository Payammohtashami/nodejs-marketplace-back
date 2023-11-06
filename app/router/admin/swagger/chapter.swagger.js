/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      example: "65466ea28a76d065b93c47f5"
 *                  title:
 *                      type: string
 *                      example: "chapter one"
 *                  description:
 *                      type: string
 *                      example: "lorem ipsum ..."
 *          UpdateChapter:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      example: "65466ea28a76d065b93c47f5"
 *                  title:
 *                      type: string
 *                      example: "chapter one"
 *                  description:
 *                      type: string
 *                      example: "lorem ipsum ..."
 */

/**
 * @swagger
 *  /api/admin/chapter/list/{id}:
 *      get:
 *          tags: [Chapter(Admin-Panel)]
 *          summary: get all chapter of course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  require: true
 *                  type: string
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


/**
 * @swagger
 *  /api/admin/chapter/add:
 *      post:
 *          tags: [Chapter(Admin-Panel)]
 *          summary: create new chapter to courses
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
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
 *  /api/admin/chapter/remove/{id}:
 *      patch:
 *          tags: [Chapter(Admin-Panel)]
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
 *  /api/admin/chapter/update/{id}:
 *      put:
 *          tags: [Chapter(Admin-Panel)]
 *          summary: update category by id
 *          parameters:
 *          -   in: path
 *              type: string
 *              required: true
 *              name: id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateChapter'
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