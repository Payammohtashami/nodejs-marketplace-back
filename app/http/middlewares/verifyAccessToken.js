const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const { UsersModel } = require('../../models/users.models');
const { ACCESS_TOKEN_SECRET_KEY } = require('../../utils/constans');

function getToken(headers){
    const [bearer, token] = headers?.authorization?.split(' ') || [];
    if(!!token && ['bearer', 'Bearer'].includes(bearer)) {
        return token;
    } throw createHttpError.Unauthorized('کاربر یافت نشد');
};

function VerifyAccessToken(req, res, next){
    try {
        const token = getToken(req.headers);
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            try {
                if(err) return next(createHttpError.Unauthorized('وارد حساب کاربری خود شوید'))
                const { mobile } = payload || {};
                const user = await UsersModel.findOne({mobile}, {password: 0, otp: 0, bills: 0});
                if(!user) throw createHttpError.Unauthorized('کاربر یافت نشد')
                req.user = user;
                return next();
            } catch (error) {
                next(error);                
            }
        });
    } catch (error) {
        next(error);
    }
};


module.exports = { 
    VerifyAccessToken
};