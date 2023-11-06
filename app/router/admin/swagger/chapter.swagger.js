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
 */

/**
 * @swagger
 *  /api/admin/chapter/add:
 *      post:
 *          tags: [Chapter(Admin-Panel)]
 *          summary: create new chapter to courses
 *          consumes:
 *          -   multipart/form-data
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
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
