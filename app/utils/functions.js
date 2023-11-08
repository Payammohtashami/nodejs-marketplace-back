const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const redisClient = require('./init_redis');
const createHttpError = require('http-errors');
const { UsersModel } = require('../models/users.models');
const { ACCESS_TOKEN_SECRET_KEY, REFRSH_TOKEN_SECRET_KEY } = require('./constans');

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
            expiresIn: '14d'
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
            const refreshToken = await redisClient.get(user?._id.toString() || 'key_default');
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

function listOfImagesFromRequest(files, fileUploadPath){
    if(files?.length > 0) {
        return files.map((file) => path.join(fileUploadPath.replace(/\\/g, '/'), file.filename).replace(/\\/g, '/'))
    } else return [];
};

function copyObject(object){
    return JSON.parse(JSON.stringify(object));
};

function getTime(seconds){
    let total = Math.round(seconds) / 60
    let [minutes, percent] = String(total).split('.');
    let second = Math.round((percent * 60) / 100).toString().substring(0, 2);
    let hours = 0;
    if(minutes > 60){
        total = minutes / 60;
        let [h1, percent] = String(total).split('.');
        hours = h1;
        minutes = Math.round((percent * 60) / 100).toString().substring(0, 2)
    };
    if(String(hours).length === 1) hours = `0${hours}`;
    if(String(second).length === 1) second = `0${second}`;
    if(String(minutes).length === 1) minutes = `0${minutes}`;
    return (hours + ':' + minutes + ':' + second)
};

function getTotalCourseTimes(chapters = []){
    let time, hour, minute, second = 0;
    for(const { episode } of chapters){
        if(Array.isArray(episode)){
            for(let episodeItem of episode){
                if(episodeItem?.time) time = episodeItem.time.split(":")
                else time = '00:00:00'.split(':');
                if(time.length === 3) {
                    second += Number(time[0] * 3600);
                    second += Number(time[1] * 60);
                    second += Number(time[2]);
                } else if(time.length === 2) {
                    second += Number(time[0] * 60);
                    second += Number(time[1]);
                }
            };
        };
    };
    hour = Math.floor(second / 3600);
    minute = Math.floor(second / 60) % 60;
    second = Math.floor(second % 60);
    if(String(hour).length === 1) hour = `0${hour}`;
    if(String(second).length === 1) second = `0${second}`;
    if(String(minute).length === 1) minute = `0${minute}`;
    return (hour + ':' + minute + ':' + second)
};

module.exports = {
    getTime,
    copyObject,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic,
    getTotalCourseTimes,
    randomNumberGenerator,
    listOfImagesFromRequest,
};