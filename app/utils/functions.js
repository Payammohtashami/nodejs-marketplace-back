const fs = require('fs');
const jwt = require('jsonwebtoken');
const redisClient = require('./init_redis');
const createHttpError = require('http-errors');
const { UsersModel } = require('../models/users.models');
const { ACCESS_TOKEN_SECRET_KEY, REFRSH_TOKEN_SECRET_KEY } = require('./constans');
const path = require('path');

function randomNumberGenerator(){
    return Math.floor((Math.random() * 90000) + 10000);
};

function SignAccessToken(userID){
    return new Promise(async (resolve, reject) => {
        const user = await UsersModel.findById(userID);
        const payload = {
            mobile: user.mobile,
        };
        const options = {
            expiresIn: '1h'
        };
        jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if(err) reject(createHttpError.InternalServerError('خطای سمت سرور به وجود آمده است'));
            resolve(token);
        });
    });
};

function SignRefreshToken(userID){
    return new Promise(async (resolve, reject) => {
        const user = await UsersModel.findById(userID);
        const payload = {
            mobile: user.mobile,
        };
        const options = {
            expiresIn: '1y'
        };
        jwt.sign(payload, REFRSH_TOKEN_SECRET_KEY, options, async (err, token) => {
            console.log(token, userID);
            await redisClient.SETEX(user.mobile, 365*24*60*60, token);
            if(err) reject(createHttpError.InternalServerError('خطای سمت سرور به وجود آمده است'));
            resolve(token);
        });
    });
};

function VerifyRefreshToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRSH_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) return reject(createHttpError.Unauthorized('وارد حساب کاربری خود شوید'))
            const { mobile } = payload || {};
            const user = await UsersModel.findOne({mobile}, {password: 0, otp: 0, bills: 0});
            if(!user) reject(createHttpError.Unauthorized('کاربر یافت نشد'))
            const refreshToken = await redisClient.get(user?._id || 'key_default');
            if(!refreshToken) reject(createHttpError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد')); 
            if(refreshToken === token) return resolve(mobile);
            reject(createHttpError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد')); 
        });
    })
};


function deleteFileInPublic(fileAddress){
    const pathFile = "" + path.join(__dirname, '..', '..', 'public', fileAddress)
    fs.unlinkSync(pathFile);
}; 

module.exports = {
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic,
    randomNumberGenerator,
};