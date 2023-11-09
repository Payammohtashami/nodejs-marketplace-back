/**
 * @swagger
 *  components:
 *      schemas:
 *          Permission:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Enter permission title
 *                  description:
 *                      type: string
 *                      description: Enter permission title
 */


/**
 * @swagger
 *  definitions:
 *      PermissionList:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      permissions:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "65466ea28a76d065b93c47f5"
 *                                  title:
 *                                      type: string
 *                                      example: "Role title (name)"
 *                                  description:
 *                                      type: string
 *                                      example: "permissions description"
 *                                              
 * 
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Role:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Enter categories title
 *                  permissions:
 *                      $ref: '#/components/schemas/Permissions'
 *                      description: Enter categories parent
 */

/**
 * @swagger
 *  /api/admin/permission/list:
 *      get:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: create new permission
 *          parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: text for search in title & description
 *          responses:
 *              200: 
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/PermissionList"
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */

/**
 * @swagger
 *  /api/admin/permission/add:
 *      post:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: create new permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Permission'
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
 *  /api/admin/permission/update/{id}:
 *      patch:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: edit permission
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Permission'
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
 *  /api/admin/permission/remove/{id}:
 *      delete:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: remove permission
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
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