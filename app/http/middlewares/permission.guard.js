const { RoleModel } = require("../../models/role.models");
const { PermissionsModel } = require("../../models/permissions.model");
const createHttpError = require("http-errors");
const { PERMISSIONS } = require("../../utils/constans");

function checkPermissions(requiredPermissions = []){
    return async function(req, res, next){
        try {
            const user = req.user;
            const allPermissions = requiredPermissions.flat(2);
            const role = await RoleModel.findOne({title: user.role});
            console.log(user, 'I am Here');
            if(!role) throw createHttpError.Forbidden('نقش مورد نظر در سیستم ثبت نشده است');
            const permissions = await PermissionsModel.find({_id: {$in: role.permissions}})
            const userPermissions = permissions.map(item => item.name);
            const hasPermission = allPermissions.every(permission => {
                return userPermissions.includes(permission);
            });
            if(userPermissions.includes(PERMISSIONS.SUPER_ADMIN[0])) return next();
            if(allPermissions.length === 0 || hasPermission) return next();
            throw createHttpError.Forbidden('شما به این آدرس دسترسی ندارید');
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    checkPermissions,
};