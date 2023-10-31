const HomeController = require('../../http/controllers/api/home.controller');
const { VerifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

const router = require('express').Router();

/**
 * @swagger
 *  /api:
 *      get:
 *          tags: [Index-Page]
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
router.get('/', VerifyAccessToken, HomeController.indexPage);

module.exports = {
    HomeRoutes: router
};