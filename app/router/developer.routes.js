const router = require('express').Router();
const bcrypt = require('bcrypt');
const { randomNumberGenerator } = require('../utils/functions');

/**
 * @swagger
 *  /api/developer/password-hash/{password}:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: Hash data with bcrypt
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: password
 *                  required: true
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
router.get('/password-hash/:password', (req, res, next) => {
    try {
        const { password } = req.params;
        const salt = bcrypt.genSaltSync(10);
        return  res.status(200).json({
            error: null,
            data: {
                result: bcrypt.hashSync(password, salt),
            },
        });
    } catch (error) {
        next(error)
    }
});

/**
 * @swagger
 *  /api/developer/random-number:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: get random number
 *          description: create 5 Digit random number 
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
router.get('/random-number', (req, res, next) => {
    try {
        return  res.status(200).json({
            error: null,
            data: {
                result: randomNumberGenerator().toString(),
            },
        });
    } catch (error) {
        next(error)
    }
});

module.exports = {DeveloperRoutes: router};