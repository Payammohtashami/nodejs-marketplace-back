const createHttpError = require("http-errors");
const { ResponseType } = require("../typeDefs/public.type");
const { GraphQLString } = require("graphql");
const { StatusCodes } = require('http-status-codes');
const { VerifyAccessTokenInGraphGL } = require("../../http/middlewares/verifyAccessToken");

// models
const { BlogsModel } = require("../../models/blogs.models");
const { ProductsModel } = require("../../models/products.models");
const { CourseModel } = require("../../models/course.models");

const LikeAndDislikeBlogs = {
    type: ResponseType,
    args: {
        blogID: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const user = req.user;
        const { blogID } = args;
        const likedProducts = await BlogsModel.findOne({_id: blogID, likes: user?._id});
        if(likedProducts) {
            const deslikeProduct = await BlogsModel.updateOne({_id: blogID, likes: user?._id}, {
                $pull: {likes: user?._id},
                $push: {deslikes: user?._id},
            })
            if(deslikeProduct.modifiedCount === 0) throw createHttpError.InternalServerError('دیس لایک کردن بلاگ مورد نظر انجام نشد');
            return {
                status: StatusCodes.OK,
                data: {
                    message: 'بلاگ مورد نظر با موفقیت دیس لایک شد',
                },
            };
        } else {
            const desLikedProducts = await BlogsModel.findOne({_id: blogID, deslikes: user?._id});
            if(desLikedProducts) {
                const likeProduct = await BlogsModel.updateOne({_id: blogID, likes: user?._id}, {
                    $push: {likes: user?._id},
                    $pull: {deslikes: user?._id},
                })
                if(likeProduct.modifiedCount === 0) throw createHttpError.InternalServerError('لایک کردن بلاگ مورد نظر انجام نشد');
                return {
                    status: StatusCodes.OK,
                    data: {
                        message: 'بلاگ مورد نظر با موفقیت لایک شد',
                    },
                };
            } else {
                const likeProduct = await BlogsModel.updateOne({_id: blogID}, {
                    $push: {likes: user?._id},
                })
                if(likeProduct.modifiedCount === 0) throw createHttpError.InternalServerError('لایک کردن بلاگ مورد نظر انجام نشد');
                return {
                    status: StatusCodes.OK,
                    data: {
                        message: 'بلاگ مورد نظر با موفقیت لایک شد',
                    },
                };
            }
        };
    },
};


const LikeAndDislikeCourses = {
    type: ResponseType,
    args: {
        courseID: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const user = req.user;
        const { courseID } = args;
        const likedProducts = await CourseModel.findOne({_id: courseID, likes: user?._id});
        if(likedProducts) {
            const deslikeProduct = await CourseModel.updateOne({_id: courseID, likes: user?._id}, {
                $pull: {likes: user?._id},
                $push: {deslikes: user?._id},
            })
            if(deslikeProduct.modifiedCount === 0) throw createHttpError.InternalServerError('دیس لایک کردن دوره مورد نظر انجام نشد');
            return {
                status: StatusCodes.OK,
                data: {
                    message: 'دوره مورد نظر با موفقیت دیس لایک شد',
                },
            };
        } else {
            const desLikedProducts = await CourseModel.findOne({_id: courseID, deslikes: user?._id});
            if(desLikedProducts) {
                const likeProduct = await CourseModel.updateOne({_id: courseID, likes: user?._id}, {
                    $push: {likes: user?._id},
                    $pull: {deslikes: user?._id},
                })
                if(likeProduct.modifiedCount === 0) throw createHttpError.InternalServerError('لایک کردن دوره مورد نظر انجام نشد');
                return {
                    status: StatusCodes.OK,
                    data: {
                        message: 'دوره مورد نظر با موفقیت لایک شد',
                    },
                };
            } else {
                const likeProduct = await CourseModel.updateOne({_id: courseID}, {
                    $push: {likes: user?._id},
                })
                if(likeProduct.modifiedCount === 0) throw createHttpError.InternalServerError('لایک کردن دوره مورد نظر انجام نشد');
                return {
                    status: StatusCodes.OK,
                    data: {
                        message: 'دوره مورد نظر با موفقیت لایک شد',
                    },
                };
            }
        };
    },
};


const LikeAndDislikeProducts = {
    type: ResponseType,
    args: {
        productID: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const user = req.user;
        const { productID } = args;
        const likedProducts = await ProductsModel.findOne({_id: productID, likes: user?._id});
        if(likedProducts) {
            const deslikeProduct = await ProductsModel.updateOne({_id: productID, likes: user?._id}, {
                $pull: {likes: user?._id},
                $push: {deslikes: user?._id},
            })
            if(deslikeProduct.modifiedCount === 0) throw createHttpError.InternalServerError('دیس لایک کردن محصول مورد نظر انجام نشد');
            return {
                status: StatusCodes.OK,
                data: {
                    message: 'محصول مورد نظر با موفقیت دیس لایک شد',
                },
            };
        } else {
            const desLikedProducts = await ProductsModel.findOne({_id: productID, deslikes: user?._id});
            if(desLikedProducts) {
                const likeProduct = await ProductsModel.updateOne({_id: productID, likes: user?._id}, {
                    $push: {likes: user?._id},
                    $pull: {deslikes: user?._id},
                })
                if(likeProduct.modifiedCount === 0) throw createHttpError.InternalServerError('لایک کردن محصول مورد نظر انجام نشد');
                return {
                    status: StatusCodes.OK,
                    data: {
                        message: 'محصول مورد نظر با موفقیت لایک شد',
                    },
                };
            } else {
                const likeProduct = await ProductsModel.updateOne({_id: productID}, {
                    $push: {likes: user?._id},
                })
                if(likeProduct.modifiedCount === 0) throw createHttpError.InternalServerError('لایک کردن محصول مورد نظر انجام نشد');
                return {
                    status: StatusCodes.OK,
                    data: {
                        message: 'محصول مورد نظر با موفقیت لایک شد',
                    },
                };
            }
        };
    },
};



module.exports = {
    LikeAndDislikeBlogs,
    LikeAndDislikeCourses,
    LikeAndDislikeProducts,
};