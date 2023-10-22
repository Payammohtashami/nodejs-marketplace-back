const omitEmpty = require("omit-empty");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { UsersModel } = require("../../../../models/users.models");
const { checkOtpSchema, getOtpSchema } = require("../../../validators/user/auth.schema");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constans");
const { randomNumberGenerator, SignAccessToken } = require("../../../../utils/functions");

class UserAuthController extends Controller{
    async getOtp(req, res, next){
        try {
            await getOtpSchema.validateAsync(req.body);
            const { mobile } = req.body;
            const code = randomNumberGenerator(5);
            const result = await this.saveUser(mobile, code)
            if(!result) throw createHttpError.Unauthorized('login failed')
            return res.status(200).json({
                error: null,
                data: {
                    status: 200,
                    message: 'login is successfully!',
                    code,
                    mobile,
                },
            })
        } catch (error) {
            next(error);
        }
    };

    async checkOtp(req, res, next){
        try {
            await checkOtpSchema.validateAsync(req.body);
            const { mobile, code } = req.body;
            const user = await UsersModel.findOne({mobile}, {password: 0});
            if(!user) throw createHttpError.NotFound('شماره موبایل ارسال شده یافت نشد ');
            if(user.otp.code !== +code) throw createHttpError.Unauthorized('کد ارسال شده صحیح نمی باشد');
            const now = Date.now();
            if(+user.otp.expiresIn < now) createHttpError.Unauthorized('کد شما منقضی شده است');
            const accessToken = await SignAccessToken(user._id)
            return res.status(200).json({
                error: null,
                data: {
                    accessToken
                },
            });
        } catch (error) {
            next(error);
        };
    };
    
    async saveUser(mobile, code){
        const result = await this.checkExistUser(mobile);
        let otp = { code, expiresIn: EXPIRES_IN };
        if(result){
            return await this.updateUser(mobile, { otp });
        };
        return await !!(UsersModel.create({ mobile, otp, roles: [USER_ROLE] }));
    };

    async checkExistUser(mobile){
        const user = await UsersModel.findOne({mobile});
        return !!user;
    };
    async updateUser(mobile, objectData = {}){
        const updateResult = await UsersModel.updateOne({mobile}, {$set: omitEmpty(objectData)});
        return !!updateResult.modifiedCount
    };

    async register(req, res, next){

    };

    async logout(req, res, next){

    };
};

module.exports ={
    UserAuthController: new UserAuthController()
}