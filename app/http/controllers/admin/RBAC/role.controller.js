const omitEmpty = require("omit-empty");
const createHttpError = require("http-errors");
const { RoleModel } = require("../../../../models/role.models");
const Controller = require("../../controller");
const { StatusCodes } =require('http-status-codes');
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");
const { copyObject } = require("../../../../utils/functions");

class RoleController extends Controller {
    async getAllRoles(req, res, next){
        try {
            const roles = await RoleModel.find({});
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    roles,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    async createRole(req, res, next){
        try {
            const data = await addRoleSchema.validateAsync(req.body);
            await this.findRoleWithTitle(data.title)
            const role = await RoleModel.create(data);
            if(!role) throw createHttpError.InternalServerError('نقش مورد نظر ایجاد نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'نفش با موفقیت ایجاد شد',
                },
            });
        } catch (error) {
            next(error);
        }
    };

    async removeRole(req, res, next){
        try {
            const { field } = req.params;
            const role = await this.findRoleWithTitleOrID(field)
            const removeRoleResult = await RoleModel.deleteOne({_id: role._id});
            if(!removeRoleResult) throw createHttpError.InternalServerError('نقش مورد نظر حذف نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'نفش با موفقیت حذف شد',
                },
            });
        } catch (error) {
            next(error);
        }
    };

    async updateRoleById(req, res, next){
        try {
            const { id } = req.params;
            const role = await this.findRoleWithTitleOrID(id)
            const data = copyObject(omitEmpty(req.body));
            const updateRoleResult = await RoleModel.updateOne({_id: role._id}, {$set: data});
            if(updateRoleResult.matchedCount === 0) throw createHttpError.InternalServerError('نقش مورد نظر به روز رسانی نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'نفش با موفقیت به روز رسانی شد',
                },
            });
        } catch (error) {
            next(error);
        }
    };

    async findRoleWithTitle(title){
        const role = await RoleModel.findOne({title});
        if(role) throw createHttpError.NotFound('نقش مورد نظر  قبلا ثبت شده است')
    };

    async findRoleWithTitleOrID(field){
        let findQuery = mongoose.isValidObjectId(field) ? {_id: field} : {title: field};
        const role = await RoleModel.findOne(findQuery);
        if(!role) throw createHttpError.NotFound('نقش مورد نظر یافت نشد')
        return role;
    };
};

module.exports = {
    RoleController: new RoleController(),
}