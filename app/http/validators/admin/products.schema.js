const Joi = require('@hapi/joi');
const { MONGO_ID_REGEX } = require('../../../utils/constans');
const createHttpError = require('http-errors');

const addProductsSchema = Joi.object({
    title: Joi.string().min(8).max(32).required().error(createHttpError.BadRequest('عنوان دسته بندی صحیح نمی باشد')),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمی توانند بیشتر از 20 تا باشند")),
    subtitle: Joi.string().error(createHttpError.BadRequest("زیرعنوان ارسال شده صحیح نمی باشد")),
    category: Joi.string().pattern(MONGO_ID_REGEX).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    price: Joi.number().error(createHttpError.BadRequest('قیمت وارد شده صحیح نمی باشد')),
    discount: Joi.number().error(createHttpError.BadRequest('تخفیف وارد شده صحیح نمی باشد')),
    avaliable_counts: Joi.number().error(createHttpError.BadRequest('تعداد وارد شده صحیح نمی باشد')),
    width: Joi.number().allow(null, 0, '0').error(createHttpError.BadRequest('عرض وارد شده صحیح نمی باشد')),
    weight: Joi.number().allow(null, 0, '0').error(createHttpError.BadRequest('وزن وارد شده صحیح نمی باشد')),
    length: Joi.number().allow(null, 0, '0').error(createHttpError.BadRequest('طول وارد شده صحیح نمی باشد')),
    height: Joi.number().allow(null, 0, '0').error(createHttpError.BadRequest('ارتفاع وارد شده صحیح نمی باشد')),
    filename: Joi.string().pattern(/(\.png|\.jpeg|\.gif|\.webp|\.jpg)$/).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    fileUploadPath: Joi.allow(),
});

module.exports = {
    addProductsSchema,
};