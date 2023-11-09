const Joi = require('@hapi/joi');
const { MONGO_ID_REGEX } = require('../../../utils/constans');

const addRoleSchema = Joi.object({
    title: Joi.string().min(4).max(32).required().error(new Error('عنوان نقش صحیح نمی باشد')),
    description: Joi.string().error(new Error("توضیح ارسال شده صحیح نمی باشد")),
    permissions: Joi.array().items(Joi.string().pattern(MONGO_ID_REGEX)).error(new Error('سطوح دسترسی های ارسال شده صحیح نمی باشد')),
});

const addPermissionSchema = Joi.object({
    name: Joi.string().max(32).required().error(new Error('عنوان وظیفه صحیح نمی باشد')),
    description: Joi.string().error(new Error("توضیح ارسال شده صحیح نمی باشد")),
});

module.exports = {
    addRoleSchema,
    addPermissionSchema,
};