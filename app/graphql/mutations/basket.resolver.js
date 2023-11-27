// function
const { VerifyAccessTokenInGraphGL } = require("../../http/middlewares/verifyAccessToken");
// type
const { ResponseType } = require("../typeDefs/public.type");
// lib
const { StatusCodes } = require('http-status-codes');
const { GraphQLString, GraphQLInt } = require("graphql");
// model
const { UsersModel } = require("../../models/users.models");
const { ProductsModel } = require("../../models/products.models");
const { copyObject } = require("../../utils/functions");
const createHttpError = require("http-errors");
const { CourseModel } = require("../../models/course.models");

const AddProductToBasket = {
    type: ResponseType,
    args: {
        productID: {type: GraphQLString},
        count: {type: GraphQLInt}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const user = req.user;
        const { productID } = args;
        await checkExistItems(ProductsModel, productID, 'محصول');
        const product = await findProductInBasket(user._id, productID);
        let addProductResult;
        if(product){
            addProductResult = await UsersModel.updateOne({
                _id: user._id,
                'basket.product.productID': productID
            }, {
                $inc: {
                    'basket.product.$.count': 1
                }
            });
        } else {
            addProductResult = await UsersModel.updateOne({
                _id: user._id,
            }, {
                $push: {
                    'basket.product': {
                        productID,
                        count: 1
                    }
                }
            })
        };
        if(addProductResult.modifiedCount === 0) throw createHttpError.InternalServerError('اضافه شدن محصول به سبد خرید با مشکل مواجه شد');
        return {
            status: StatusCodes.OK,
            data: {
                message: 'محصول به سبد خرید افزوده شد',
            },
        };
    },
};

const AddCourseToBasket = {
    type: ResponseType,
    args: {
        courseID: {type: GraphQLString},
        count: {type: GraphQLInt}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const user = req.user;
        const { courseID } = args;
        await checkExistItems(CourseModel, courseID, 'دوره');
        const product = await findCourseInBasket(user._id, courseID);
        let addProductResult;
        if(product){
            addProductResult = await UsersModel.updateOne({
                _id: user._id,
                'basket.course.courseID': courseID
            }, {
                $inc: {
                    'basket.course.$.count': 1
                }
            });
        } else {
            addProductResult = await UsersModel.updateOne({
                _id: user._id,
            }, {
                $push: {
                    'basket.course': {
                        courseID,
                        count: 1
                    },
                }
            })
        };
        if(addProductResult.modifiedCount === 0) throw createHttpError.InternalServerError('اضافه شدن دوره به سبد خرید با مشکل مواجه شد');
        return {
            status: StatusCodes.OK,
            data: {
                message: 'دوره به سبد خرید افزوده شد',
            },
        };
    },
};


const RemoveProductToBasket = {
    type: ResponseType,
    args: {
        productID: {type: GraphQLString},
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const user = req.user;
        const { productID } = args;
        await checkExistItems(ProductsModel, productID, 'محصول');
        const product = await findProductInBasket(user._id, productID);
        if(!product) throw createHttpError.NotFound('محصول مورد نظر در سبد شما وجود ندارد');
        let addProductResult;
        if(product.count > 1){
            addProductResult = await UsersModel.updateOne({
                _id: user._id,
                'basket.product.productID': productID
            }, {
                $inc: {
                    'basket.product.$.count': -1
                }
            });
        } else {
            addProductResult = await UsersModel.updateOne({
                _id: user._id,
                'basket.product.productID': productID,
            }, {
                $pull: {
                    'basket.product': {
                        productID,
                    }
                }
            })
        };
        if(addProductResult.modifiedCount === 0) throw createHttpError.InternalServerError('حذف محصول به سبد خرید با مشکل مواجه شد');
        return {
            status: StatusCodes.OK,
            data: {
                message: 'محصول از سبد خرید برداشته شد',
            },
        };
    },
};

const RemoveCourseToBasket = {
    type: ResponseType,
    args: {
        courseID: {type: GraphQLString},
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const user = req.user;
        const { courseID } = args;
        await checkExistItems(CourseModel, courseID, 'دوره');
        const Course = await findCourseInBasket(user._id, courseID);
        if(!Course) throw createHttpError.NotFound('دوره مورد نظر در سبد شما وجود ندارد');
        let addCourseResult;
        if(Course){
            addCourseResult = await UsersModel.updateOne({
                _id: user._id,
                'basket.course.courseID': courseID
            }, {
                $inc: {
                    'basket.course.$.count': -1
                }
            });
        } else {
            addCourseResult = await UsersModel.updateOne({
                _id: user._id,
                'basket.course.courseID': courseID
            }, {
                $pull: {
                    'basket.course': {
                        courseID,
                    },
                }
            })
        };
        if(addCourseResult.modifiedCount === 0) throw createHttpError.InternalServerError('حدف دوره به سبد خرید با مشکل مواجه شد');
        return {
            status: StatusCodes.OK,
            data: {
                message: 'دوره از سبد خرید برداشته شد',
            },
        };
    },
};

async function checkExistItems(model, id, key){
    const item = await model.findById(id);
    if(!item) throw createHttpError.NotFound(`${key} با آیدی مورد نظر یافت نشد`);
    return item;
};

async function findProductInBasket(userID, productID){
    const result = await UsersModel.findOne({_id: userID, 'basket.product.productID': productID});
    const product = copyObject(result);
    return product?.basket?.product[0];
};

async function findCourseInBasket(userID, courseID){
    const result = await UsersModel.findOne({_id: userID, 'basket.course.productID': courseID});
    const courses = copyObject(result);
    return courses?.basket?.course[0];
};

module.exports = {
    AddCourseToBasket,
    AddProductToBasket,
    RemoveCourseToBasket,
    RemoveProductToBasket,
};