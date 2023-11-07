const Joi = require('@hapi/joi');
const createHttpError = require('http-errors');
const { MONGO_ID_REGEX } = require('../../../utils/constans');

const addCourseSchema = Joi.object({
    title: Joi.string().min(8).max(32).required().error(createHttpError.BadRequest('عنوان دوره صحیح نمی باشد')),
    type: Joi.string().required().regex(/(VIP|FREE|CASH)/i).error(createHttpError.BadRequest('نوع محصول صحیح نمی باشد')),
    description: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمی توانند بیشتر از 20 تا باشند")),
    price: Joi.number().error(createHttpError.BadRequest('قیمت وارد شده صحیح نمی باشد')),
    teacher: Joi.string().regex(MONGO_ID_REGEX).error(createHttpError.BadRequest("مدرس وارد شده صحیح می باشد")),
    subtitle: Joi.string().error(createHttpError.BadRequest("زیرعنوان ارسال شده صحیح نمی باشد")),
    category: Joi.string().regex(MONGO_ID_REGEX).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    status: Joi.string().regex(/(NOT_STARTED|IN_PROGRESS|COMPLETED)/).error(createHttpError.BadRequest('وضعیت وارد شده صحیح نمی باشد')),
    discount: Joi.number().error(createHttpError.BadRequest('تخفیف وارد شده صحیح نمی باشد')),
    filename: Joi.string().regex(/(\.png|\.jpeg|\.gif|\.webp|\.jpg)$/).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    fileUploadPath: Joi.allow().error(createHttpError.BadRequest('fileUploadPath in not allowed')),
});

const addEpisodeSchema = Joi.object({
    title: Joi.string().min(8).max(32).required().error(createHttpError.BadRequest('عنوان قسمت صحیح نمی باشد')),
    type: Joi.string().required().regex(/(LOCK|UNLOCK)/i).error(createHttpError.BadRequest('نوع صحیح نمی باشد')),
    time: Joi.string().required().regex(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/i).error(createHttpError.BadRequest('زمان وارد شده صحیح نمی باشد')),
    description: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    chapterId: Joi.string().regex(MONGO_ID_REGEX).error(createHttpError.BadRequest('شناسه فصل صحیح نمی باشد')),
    courseId: Joi.string().regex(MONGO_ID_REGEX).error(createHttpError.BadRequest('شناسه دوره صحیح نمی باشد')),
    fileUploadPath: Joi.allow().error(createHttpError.BadRequest('fileUploadPath in not allowed')),
});

module.exports = {
    addCourseSchema,
    addEpisodeSchema,
};