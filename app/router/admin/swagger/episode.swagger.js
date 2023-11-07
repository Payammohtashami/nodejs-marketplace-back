/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseId
 *                  -   chapterId
 *                  -   title
 *                  -   description
 *                  -   type
 *                  -   time
 *              properties:
 *                  courseId:
 *                      type: string
 *                      example: "6546718626f0c253e578acab"
 *                  chapterId:
 *                      type: string
 *                      example: "65466ea28a76d065b93c47f5"
 *                  title:
 *                      type: string
 *                      example: "episde title one"
 *                  description:
 *                      type: string
 *                      example: "lorem ipsum for episode description"
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   UNLOCK
 *                          -   LOCK
 *                  time:
 *                      type: string
 *                      example: "00:21:05"
 */

/**
 * @swagger
 *  /api/admin/episode/list/{id}:
 *      get:
 *          tags: [Episode(Admin-Panel)]
 *          summary: get all episode of course
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
 *  /api/admin/episode/add:
 *      post:
 *          tags: [Episode(Admin-Panel)]
 *          summary: create new episode to courses
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
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
 *  /api/admin/episde/remove/{id}:
 *      patch:
 *          tags: [Episode(Admin-Panel)]
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
 *  /api/admin/episode/update/{id}:
 *      put:
 *          tags: [Episode(Admin-Panel)]
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
 *                          $ref: '#/components/schemas/UpdateEpisode'
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