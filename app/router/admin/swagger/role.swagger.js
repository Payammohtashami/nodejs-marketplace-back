/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: role title
 *                  description:
 *                      type: string
 *                      description: role description
 *                  permissions:
 *                      type: array
 *                      description: permissions id list
 */


/**
 * @swagger
 *  definitions:
 *      RolesList:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      roles:
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
 *                                      example: "Role description"
 *                                  permissions:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  example: "65466ea28a76d065b93c47f5"
 *                                              title:
 *                                                  type: string
 *                                                  example: "permissions title"
 *                                              description:
 *                                                  type: string
 *                                                  example: "permissions description"
 *                                              
 * 
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: role title 
 *                  description:
 *                      type: string
 *                      description: role description
 *                  permissions:
 *                      $ref: '#/components/schemas/Permissions'
 *                      description: Enter categories parent
 */

/**
 * @swagger
 *  /api/admin/role/list:
 *      get:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: create new role
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
 *                              $ref: "#/definitions/RolesList"
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */

/**
 * @swagger
 *  /api/admin/role/add:
 *      post:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: create new role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
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
 *  /api/admin/role/update/{id}:
 *      patch:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: edit role
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
 *                          $ref: '#/components/schemas/Edit-Role'
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
 *  /api/admin/role/remove/{field}:
 *      delete:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: remove role
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: field
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