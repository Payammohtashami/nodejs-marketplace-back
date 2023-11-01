const Joi = require('@hapi/joi');
const { MONGO_ID_REGEX } = require('../../utils/constans');
const createHttpError = require('http-errors');

const ObjectIdValidator = Joi.object({
    id: Joi.string().regex(MONGO_ID_REGEX).error(createHttpError.BadRequest('آیدی وارد شده صحیح نمی باشد'))
});

module.exports = {
    ObjectIdValidator,
};