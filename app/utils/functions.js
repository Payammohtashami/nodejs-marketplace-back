const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { UsersModel } = require('../models/users.models');
const { SECRET_KEY } = require('./constans');

function randomNumberGenerator(){
    return Math.floor((Math.random() * 90000) + 10000);
};

function SignAccessToken(userID){
    return new Promise(async (resolve, reject) => {
        const user = await UsersModel.findById(userID);
        const payload = {
            mobile: user.mobile,
            userID: user?._id,
        };
        const options = {
            expiresIn: '1h'
        };
        jwt.sign(payload, SECRET_KEY, options, (err, token) => {
            if(err) reject(createHttpError.InternalServerError('خطای سمت سرور به وجود آمده است'));
            resolve(token);
        });
    });
};

module.exports = {
    SignAccessToken,
    randomNumberGenerator,
};