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

function deleteBlockedItems(objectValue, blockList){
    Object.keys(objectValue).forEach(key => {
        if(blockList.includes(key)) delete objectValue[key];
    });
};

function calculateDiscount(price, discount){
    return Number(price) - ((Number(discount) / 100) * Number(price))
};

async function getBasketOfUser(userID, discount = {}){
    const userDetail = await UsersModel.aggregate([
        {
            $match : { _id: userID }
        },
        {
            $project:{ basket: 1}
        },
        {
            $lookup: {
                from: "products",
                localField: "basket.product.productID",
                foreignField: "_id",
                as: "productDetail",
            }
        },
        {
            $lookup: {
                from: "courses",
                localField: "basket.course.courseID",
                foreignField: "_id",
                as: "courseDetail"
            }
        },
        {
            $addFields : {
                "productDetail" : {
                    $function: {
                        body: function(productDetail, products){
                            return productDetail.map(function(product){
                                const count = products.find(item => item.productID.valueOf() === product._id.valueOf()).count;
                                const totalPrice = count * product.price
                                return {
                                    ...product,
                                    basketCount: count,
                                    totalPrice,
                                    finalPrice: totalPrice - Math.floor((product.discount / 100) * totalPrice)
                                }
                            })
                        },
                        args: ["$productDetail", "$basket.product"],
                        lang: "js"
                    }
                },
                "courseDetail" : {
                    $function: {
                        body: function(courseDetail){
                            return courseDetail.map(function(course){
                                return {
                                    ...course,
                                    finalPrice: course.price - ((course.discount / 100) * course.price)
                                }
                            })
                        },
                        args: ["$courseDetail"],
                        lang: "js"
                    }
                },
                "payDetail" : {
                    $function: {
                        body: function(courseDetail, productDetail, products){
                            const courseAmount =  courseDetail.reduce(function(total, course){
                                return total + (course.price - ((course.discount / 100) * course.price))
                            }, 0)
                            const productAmount =  productDetail.reduce(function(total, product){
                                const count = products.find(item => item.productID.valueOf() == product._id.valueOf()).count
                                const totalPrice = count * product.price;
                                return total + (totalPrice - ((product.discount / 100) * totalPrice))
                            }, 0)
                            const courseIds = courseDetail.map(course => course._id.valueOf())
                            const productIds = productDetail.map(product => product._id.valueOf())
                            return {
                                courseAmount,
                                productAmount,
                                paymentAmount : courseAmount + productAmount,
                                courseIds,
                                productIds
                            }
                        },
                        args: ["$courseDetail", "$productDetail", "$basket.product"],
                        lang: "js"
                    }
                },
            }
        },
        {
            $project: {
                basket: 0
            }
        }
    ]);
    return copyObject(userDetail)
}

module.exports = {
    getTime,
    copyObject,
    SignAccessToken,
    getBasketOfUser,
    SignRefreshToken,
    deleteBlockedItems,
    VerifyRefreshToken,
    deleteFileInPublic,
    getTotalCourseTimes,
    randomNumberGenerator,
    listOfImagesFromRequest,
};