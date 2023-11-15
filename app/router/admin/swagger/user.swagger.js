/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateUser:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 *                  username:
 *                      type: string
 *                  discount:
 *                      type: string
 *                  email:
 *                      type: string
 *                  profile_image:
 *                      type: string
 *                      format: binary
 *                      description: course image
 */


/**
 * @swagger
 *  /api/admin/user/all:
 *      get:
 *          tags: [User(Admin-Panel)]
 *          summary: get all users list
 *          parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: text for search in username, mobile, email
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
 *  /api/admin/user/profile:
 *      get:
 *          tags: [User(Admin-Panel)]
 *          summary: get user information
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
 *  /api/admin/user/update/{id}:
 *      patch:
 *          tags: [User(Admin-Panel)]
 *          summary: update and save new course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  require: true
 *                  type: string
 *                  description: find course by id
 *          consumes:
 *          -   multipart/form-data
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateUser'
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
