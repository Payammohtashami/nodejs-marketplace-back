const omitEmpty = require("omit-empty");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { UsersModel } = require("../../../../models/users.models");
const { deleteBlockedItems, copyObject } = require("../../../../utils/functions");

class UserController extends Controller {
    async getAllUser(req, res, next){
        try {
            const { search } = copyObject(req.query);
            const databaseQuery = {};
            if(!!search) databaseQuery['$text'] = {$search: search};
            const users = await UsersModel.find(databaseQuery);
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    users
                },
            })
        } catch (error) {
            next(error);
        };
    };

    async updateUserProfile(req, res, next){
        try {
            const userId = req.user._id;
            const users = await UsersModel.findById(userId);
            if(!users.mobile) throw createHttpError.NotFound('کاربر مورد نظر یافت نشد');
            let blockListValues = ['courses', 'password', 'mobile', 'otp', 'roles', 'bills', 'birthday'];
            const data = omitEmpty(req.body);
            deleteBlockedItems(data, blockListValues)
            const updateUserResult = await UsersModel.updateOne({_id: userId}, {$set: data});
            if(updateUserResult.modifiedCount === 0) throw createHttpError.InternalServerError('به روز رسانی انجام نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'پروفایل یوزر با موفقیت به روز رسانی شد'
                },
            });
        } catch (error) {
            next(error);
        };
    };
};

module.exports = {
    UserController: new UserController()
};