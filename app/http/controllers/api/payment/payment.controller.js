const { UsersModel } = require("../../../../models/users.models");
const Controller = require("../../controller");

class PaymentController extends Controller {
    async paymentGateway(req, res, next){
        try {
            const user = req.user;
            const basket = await UsersModel.findOne(user?._id)?.
            const zarinpallRequestURL = 'https://api.zarinpal.com/pg/v4/payment/request.json';
            const zarinpallOptions = {
                merchant_id: '',
                amount: '',
                description: '',
                callback_url: '',
            };
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    PaymentController: new PaymentController(),
};