const router = require('express').Router();
const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');

router.post('/get-otp', UserAuthController.getOtp);
router.post('/check-otp', UserAuthController.checkOtp);
router.post('/refresh-token', UserAuthController.refreshToken);

module.exports = {UserAuthRoutes: router};