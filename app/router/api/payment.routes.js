const { PaymentController } = require('../../http/controllers/api/payment/payment.controller');
const { VerifyAccessToken } = require('../../http/middlewares/verifyAccessToken');
const router = require('express').Router();


router.post('/payment', VerifyAccessToken, PaymentController.paymentGateway)

module.exports = {paymentRouter: router}