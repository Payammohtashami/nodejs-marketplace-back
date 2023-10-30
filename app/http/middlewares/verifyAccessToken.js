const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const { UsersModel } = require('../../models/users.models');
const { ACCESS_TOKEN_SECRET_KEY } = require('../../utils/constans');

function VerifyAccessToken(req, res, next){
    const headers = req.headers;
    const [bearer, token] = headers?.['access-token']?.split(' ') || [];
    if(!!token && ['bearer', 'Bearer'].includes(bearer)) {
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) return next(createHttpError.Unauthorized('وارد حساب کاربری خود شوید'))
            const { mobile } = payload || {};
            const user = await UsersModel.findOne({mobile}, {password: 0, otp: 0, bills: 0});
            if(!user) createHttpError.Unauthorized('کاربر یافت نشد')
            req.user = user;
            return next();
        });
    } else {
        return next(createHttpError.Unauthorized('وارد حساب کاربری خود شوید'))
    };
};

module.exports = VerifyAccessToken;