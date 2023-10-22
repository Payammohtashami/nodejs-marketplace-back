const omitEmpty = require("omit-empty");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { UsersModel } = require("../../../../models/users.models");
const { authSchema } = require("../../../validators/user/auth.schema");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constans");
const { randomNumberGenerator } = require("../../../../utils/functions");

class UserAuthController extends Controller{
    async login(req, res, next){
        try {
            console.log({body: req.body});
            await authSchema.validateAsync(req.body);
            const { mobile } = req.body;
            const code = randomNumberGenerator(5);
            const result = await this.saveUser(mobile, code)
            if(!result) throw createHttpError.Unauthorized('login failed')
            return res.status(200).json({
                data: {
                    status: 200,
                    message: 'login is successfully!',
                    code,
                    mobile,
                },
                error: null
            })
        } catch (error) {
            next(error);
        }
    };
    
    async saveUser(mobile, code){
        const result = await this.checkExistUser(mobile);
        let otp = { code, expiresIn: EXPIRES_IN };
        if(result){
            return await this.updateUser(mobile, { otp });
        };
        return await UsersModel.create({ mobile, otp, roles: [USER_ROLE] });
    };

    async checkExistUser(mobile){
        const user = await UsersModel.findOne({mobile});
        return !!user;
    };
    async updateUser(mobile, objectData = {}){
        try {
            const updateResult = await UsersModel.updateOne({mobile}, {$set: omitEmpty(objectData)});

        } catch (error) {
            next(error);
        };
    };

    async register(req, res, next){

    };

    async logout(req, res, next){

    };
};

module.exports ={
    UserAuthController: new UserAuthController()
}