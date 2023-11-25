const mongoose = require('mongoose');
const { GraphQLString } = require("graphql");

// models
const { BlogsModel } = require("../../models/blogs.models");
const { CourseModel } = require('../../models/course.models');
const { ProductsModel } = require('../../models/products.models');

// utils
const createHttpError = require("http-errors");
const { copyObject } = require("../../utils/functions");
const { StatusCodes } = require('http-status-codes');
const { VerifyAccessTokenInGraphGL } = require("../../http/middlewares/verifyAccessToken");

// types
const { ResponseType } = require("../typeDefs/public.type");

const createCommentForBlogs = {
    type: ResponseType,
    args: {
        blogID: {type: GraphQLString},
        comment: {type: GraphQLString},
        parent: {type: GraphQLString},
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const { comment, blogID, parent } = args;
        if(!mongoose.isValidObjectId(blogID)) throw createHttpError.BadRequest('شناسه ارسال شده صحیح نمی باشد');
        await checkExistItems(BlogsModel, blogID, 'بلاگ');
        if(!!parent && mongoose.isValidObjectId(parent)){
            const commentsDocument = await getComments(BlogsModel, parent);
            if(!!commentsDocument && !commentsDocument?.openToComment) throw createHttpError.BadRequest('امکان ثبت پاسخ وجود ندارد')
            const createAnswerResult = await BlogsModel.updateOne({_id: blogID, 'comments._id': parent}, {
                $push: {
                    'comments.$.answers': {
                        user: req.user._id,
                        show: false,
                        comment,
                        openToComment: false,
                    },
                },
            });
            if(createAnswerResult.modifiedCount === 0) throw createHttpError.InternalServerError('پاسخ شما ثبت نشد')
            return {
                status: StatusCodes.CREATED,
                data: {
                    message: 'پاسخ شما با موفقیت ثبت شد',
                },
            };
        } else {
            const createCommentResult = await BlogsModel.updateOne({_id: blogID}, {
                $push: {
                    comments: {
                        show: false,
                        user: req.user._id,
                        comment,
                        parent: mongoose.isValidObjectId(!parent) ? parent : undefined,
                        openToComment: true,
                    },
                },
            });
            if(createCommentResult.modifiedCount === 0) throw createHttpError.InternalServerError('نظر شما ثبت نشد')
            return {
                status: StatusCodes.CREATED,
                data: {
                    message: 'نظر شما با موفقیت ثبت شد',
                },
            };
        }
    },
};


const createCommentForProducts = {
    type: ResponseType,
    args: {
        productsID: {type: GraphQLString},
        comment: {type: GraphQLString},
        parent: {type: GraphQLString},
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const { comment, productsID, parent } = args;
        if(!mongoose.isValidObjectId(productsID)) throw createHttpError.BadRequest('شناسه ارسال شده صحیح نمی باشد');
        await checkExistItems(ProductsModel, productsID, 'محصول');
        if(!!parent && mongoose.isValidObjectId(parent)){
            const commentsDocument = await getComments(ProductsModel, parent);
            if(!!commentsDocument && !commentsDocument?.openToComment) throw createHttpError.BadRequest('امکان ثبت پاسخ وجود ندارد')
            const createAnswerResult = await ProductsModel.updateOne({_id: productsID, 'comments._id': parent}, {
                $push: {
                    'comments.$.answers': {
                        user: req.user._id,
                        show: false,
                        comment,
                        openToComment: false,
                    },
                },
            });
            if(createAnswerResult.modifiedCount === 0) throw createHttpError.InternalServerError('پاسخ شما ثبت نشد')
            return {
                status: StatusCodes.CREATED,
                data: {
                    message: 'پاسخ شما با موفقیت ثبت شد',
                },
            };
        } else {
            const createCommentResult = await ProductsModel.updateOne({_id: productsID}, {
                $push: {
                    comments: {
                        show: false,
                        user: req.user._id,
                        comment,
                        parent: mongoose.isValidObjectId(!parent) ? parent : undefined,
                        openToComment: true,
                    },
                },
            });
            if(createCommentResult.modifiedCount === 0) throw createHttpError.InternalServerError('نظر شما ثبت نشد')
            return {
                status: StatusCodes.CREATED,
                data: {
                    message: 'نظر شما با موفقیت ثبت شد',
                },
            };
        }
    },
};


const createCommentForCourses = {
    type: ResponseType,
    args: {
        courseID: {type: GraphQLString},
        comment: {type: GraphQLString},
        parent: {type: GraphQLString},
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const { comment, courseID, parent } = args;
        if(!mongoose.isValidObjectId(courseID)) throw createHttpError.BadRequest('شناسه ارسال شده صحیح نمی باشد');
        await checkExistItems(CourseModel, courseID, 'دوره');
        if(!!parent && mongoose.isValidObjectId(parent)){
            const commentsDocument = await getComments(CourseModel, parent);
            if(!!commentsDocument && !commentsDocument?.openToComment) throw createHttpError.BadRequest('امکان ثبت پاسخ وجود ندارد')
            const createAnswerResult = await CourseModel.updateOne({_id: courseID, 'comments._id': parent}, {
                $push: {
                    'comments.$.answers': {
                        user: req.user._id,
                        show: false,
                        comment,
                        openToComment: false,
                    },
                },
            });
            if(createAnswerResult.modifiedCount === 0) throw createHttpError.InternalServerError('پاسخ شما ثبت نشد')
            return {
                status: StatusCodes.CREATED,
                data: {
                    message: 'پاسخ شما با موفقیت ثبت شد',
                },
            };
        } else {
            const createCommentResult = await CourseModel.updateOne({_id: courseID}, {
                $push: {
                    comments: {
                        show: false,
                        user: req.user._id,
                        comment,
                        parent: mongoose.isValidObjectId(!parent) ? parent : undefined,
                        openToComment: true,
                    },
                },
            });
            if(createCommentResult.modifiedCount === 0) throw createHttpError.InternalServerError('نظر شما ثبت نشد')
            return {
                status: StatusCodes.CREATED,
                data: {
                    message: 'نظر شما با موفقیت ثبت شد',
                },
            };
        }
    },
};

async function checkExistItems(model, id, key){
    const item = await model.findById(id);
    if(!item) throw createHttpError.NotFound(`${key} با آیدی مورد نظر یافت نشد`);
    return item;
};

async function getComments(model, id){
    const findedComment = await model.findOne({'comments._id': id}, {'comments.$': 1});
    const comment = copyObject(findedComment);
    if(!comment) throw createHttpError.NotFound('نظری با آیدی مورد نظر یافت نشد');
    return comment?.comments?.[0];
};
module.exports = {
    createCommentForBlogs,
    createCommentForCourses,
    createCommentForProducts,
};