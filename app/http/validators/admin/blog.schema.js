const Joi = require('@hapi/joi');
const { MONGO_ID_REGEX } = require('../../../utils/constans');
const createHttpError = require('http-errors');

const addBlogSchema = Joi.object({
    title: Joi.string().min(8).max(32).required().error(createHttpError.BadRequest('عنوان دسته بندی صحیح نمی باشد')),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    subtitle: Joi.string().error(createHttpError.BadRequest("زیرعنوان ارسال شده صحیح نمی باشد")),
    filename: Joi.string().pattern(/(\.png|\.jpeg|\.gif|\.webp|\.jpg)$/).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمی توانند بیشتر از 20 تا باشند")),
    category: Joi.string().pattern(MONGO_ID_REGEX).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    fileUploadPath: Joi.allow(),
});

module.exports = {
    addBlogSchema,
};