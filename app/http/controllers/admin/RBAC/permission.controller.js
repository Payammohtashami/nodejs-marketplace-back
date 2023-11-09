const omitEmpty = require("omit-empty");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { copyObject } = require("../../../../utils/functions");
const { StatusCodes } = require("http-status-codes");
const { PermissionsModel } = require("../../../../models/permissions.model");
const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");

class PermissionController extends Controller {
    async getAllPermossions(req, res, next){
        try {
            const permissions = await PermissionsModel.find({});
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    permissions,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    
    async createPermission(req, res, next){
        try {
            const data = await addPermissionSchema.validateAsync(req.body);
            await this.findPermissionWithTitle(data.name)
            console.log(data);
            const role = await PermissionsModel.create(data);
            if(!role) throw createHttpError.InternalServerError('سطح دسترسی مورد نظر ایجاد نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'سطح دسترسی با موفقیت ایجاد شد',
                },
            });
        } catch (error) {
            next(error);
        };
    };

    async removePermission(req, res, next){
        try {
            const { id } = req.params;
            const role = await this.findPermissionWithId(id)
            const removeRoleResult = await PermissionsModel.deleteOne({_id: role._id});
            if(!removeRoleResult) throw createHttpError.InternalServerError('سطح دسترسی حذف نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'سطح دسترسی با موفقیت حذف شد',
                },
            });
        } catch (error) {
            next(error);
        }
    };

    async updatePermissionById(req, res, next){
        try {
            const { id } = req.params;
            await this.findPermissionWithId(id)
            const data = copyObject(omitEmpty(req.body));
            const updatePermissionResult = await PermissionsModel.updateOne({_id: id}, {$set: data});
            if(updatePermissionResult.matchedCount === 0) throw createHttpError.InternalServerError('سطح دسترسی نظر به روز رسانی نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'سطح دسترسی با موفقیت به روز رسانی شد',
                },
            });
        } catch (error) {
            next(error);
        };
    };

    async findPermissionWithTitle(name){
        const permission = await PermissionsModel.findOne({name});
        if(permission) throw createHttpError.NotFound('سطج دسترسی مورد نظر قبلا ثبت شده است')
    };

    async findPermissionWithId(id){
        const permission = await PermissionsModel.findOne({_id: id});
        if(!permission) throw createHttpError.NotFound('سطج دسترسی مورد نظر یافت نشد')
        return permission
    };
};

module.exports = {
    PermissionController: new PermissionController(),
}