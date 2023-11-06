/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   FREE
 *                  -   CASH
 *                  -   VIP
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   subtitle
 *                  -   description
 *                  -   image
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   teacher
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: course title (name)
 *                  subtitle:
 *                      type: string
 *                      description: course subtitle
 *                  price:
 *                      type: string
 *                      description: course price
 *                  description:
 *                      type: string
 *                      description: course description
 *                  category:
 *                      type: string
 *                      description: course category
 *                  tags:
 *                      type: array
 *                      description: course tags
 *                  teacher:
 *                      type: string
 *                      description: course teacher
 *                  discount:
 *                      type: string
 *                      description: course discount
 *                  type:
 *                      $ref: '#/components/schemas/Types'
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: course image
 */


/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "65466ea28a76d065b93c47f5"
 *                                  title:
 *                                      type: string
 *                                      example: "course title (name)"
 *                                  subtitle:
 *                                      type: string
 *                                      example: "course subtitle"
 *                                  price:
 *                                      type: string
 *                                      example: "course price"
 *                                  description:
 *                                      type: string
 *                                      example: "course description"
 *                                  category:
 *                                      type: string
 *                                      example: "course category"
 *                                  tags:
 *                                      type: array
 *                                      example: "course tags"
 *                                  teacher:
 *                                      type: string
 *                                      example: "course teacher"
 *                                  discount:
 *                                      type: string
 *                                      example: "course discount"
 * 
 */

/**
 * @swagger
 *  /api/admin/course/list:
 *      get:
 *          tags: [Course(Admin-Panel)]
 *          summary: get all course
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  require: false
 *                  type: text
 *                  description: search in course name, description and subtitle
 *          responses:
 *              200: 
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/ListOfCourses"
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */

/**
 * @swagger
 *  /api/admin/course/{id}:
 *      get:
 *          tags: [Course(Admin-Panel)]
 *          summary: get course by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  require: true
 *                  type: string
 *                  description: find course by id
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
 *  /api/admin/course/add:
 *      post:
 *          tags: [Course(Admin-Panel)]
 *          summary: create and save new course
 *          consumes:
 *          -   multipart/form-data
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
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
