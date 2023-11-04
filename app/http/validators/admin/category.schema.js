const Joi = require('@hapi/joi');
const { MONGO_ID_REGEX } = require('../../../utils/constans');

const addCategorySchema = Joi.object({
    title: Joi.string().min(6).max(32).required().error(new Error('عنوان دسته بندی صحیح نمی باشد')),
    parent: Joi.string().allow('').regex(MONGO_ID_REGEX).error(new Error("شناسه ارسال شده صحیح نمی باشد")),
});

const updateCategorySchema = Joi.object({
    title: Joi.string().min(8).max(32).required().error(new Error('عنوان دسته بندی صحیح نمی باشد')),
    parent: Joi.string().allow('').regex(MONGO_ID_REGEX).error(new Error("شناسه ارسال شده صحیح نمی باشد")),
});

module.exports = {
    addCategorySchema,
    updateCategorySchema,
};