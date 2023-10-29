const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');

const router = require('express').Router();



/**
 * @swagger
 *  /api/user/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in userpanel with phone number
 *          description: one time password(OTP) login
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
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
router.post('/get-otp', UserAuthController.getOtp);

/**
 * @swagger
 *  /api/user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check OTP value
 *          description: one time password(OTP) login
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter SMS code recived
 *              in: formData
 *              required: true
 *              type: string
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
router.post('/check-otp', UserAuthController.checkOtp);

/**
 * @swagger
 *  /api/user/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: send refresh token to get new refresh token
 *          description: Refresh Token
 *          parameters:
 *          -   name: refreshToken
 *              description: send refresh token
 *              in: body    
 *              required: true
 *              type: string
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
router.post('/refresh-token', UserAuthController.refreshToken);

module.exports = {UserAuthRoutes: router};