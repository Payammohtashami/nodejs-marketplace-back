const createHttpError = require("http-errors");
const { ResponseType } = require("../typeDefs/public.type");
const { GraphQLString } = require("graphql");
const { StatusCodes } = require('http-status-codes');
const { VerifyAccessTokenInGraphGL } = require("../../http/middlewares/verifyAccessToken");

// models
const { BlogsModel } = require("../../models/blogs.models");
const { ProductsModel } = require("../../models/products.models");
const { CourseModel } = require("../../models/course.models");

const BookmarksBlogs = {
    type: ResponseType,
    args: {
        blogID: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const user = req.user;
        const { blogID } = args;
        const bookmarkBlogs = await BlogsModel.findOne({_id: blogID, bookmark: user?._id});
        if(bookmarkBlogs) {
            const bookmarkBlogsResult = await BlogsModel.updateOne({_id: blogID}, {
                $pull: {bookmark: user?._id},
            })
            if(bookmarkBlogsResult.modifiedCount === 0) throw createHttpError.InternalServerError('افزودن به علاقه مندی بلاگ مورد نظر انجام نشد');
            return {
                status: StatusCodes.OK,
                data: {
                    message: 'بلاگ مورد نظر با موفقیت به علاقه مندی برداشته شد',
                },
            };
        } else {
            const bookmarkBlogsResult = await BlogsModel.updateOne({_id: blogID}, {
                $push: {bookmark: user?._id},
            })
            if(bookmarkBlogsResult.modifiedCount === 0) throw createHttpError.InternalServerError('افزودن به علاقه مندی بلاگ مورد نظر انجام نشد');
            return {
                status: StatusCodes.OK,
                data: {
                    message: 'بلاگ مورد نظر با موفقیت به علاقه مندی اضافه شد',
                },
            };
        };
    },
};


const BookmarksCourses = {
    type: ResponseType,
    args: {
        courseID: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const user = req.user;
        const { courseID } = args;
        const bookmarkCourses = await CourseModel.findOne({_id: courseID, bookmark: user?._id});
        if(bookmarkCourses) {
            const bookmarkCoursesResult = await CourseModel.updateOne({_id: courseID}, {
                $pull: {bookmark: user?._id},
            })
            if(bookmarkCoursesResult.modifiedCount === 0) throw createHttpError.InternalServerError('افزودن به علاقه مندی دوره مورد نظر انجام نشد');
            return {
                status: StatusCodes.OK,
                data: {
                    message: 'دوره مورد نظر با موفقیت به علاقه مندی برداشته شد',
                },
            };
        } else {
            const bookmarkBlogsResult = await CourseModel.updateOne({_id: courseID}, {
                $push: {bookmark: user?._id},
            })
            if(bookmarkBlogsResult.modifiedCount === 0) throw createHttpError.InternalServerError('افزودن به علاقه مندی دوره مورد نظر انجام نشد');
            return {
                status: StatusCodes.OK,
                data: {
                    message: 'دوره مورد نظر با موفقیت به علاقه مندی اضافه شد',
                },
            };
        };
    },
};


const BookmarksProducts = {
    type: ResponseType,
    args: {
        productID: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        const user = req.user;
        const { productID } = args;
        const bookmarkProducts = await ProductsModel.findOne({_id: productID, bookmark: user?._id});
        if(bookmarkProducts) {
            const bookmarkProductsResult = await ProductsModel.updateOne({_id: productID}, {
                $pull: {bookmark: user?._id},
            })
            if(bookmarkProductsResult.modifiedCount === 0) throw createHttpError.InternalServerError('افزودن به علاقه مندی محصول مورد نظر انجام نشد');
            return {
                status: StatusCodes.OK,
                data: {
                    message: 'محصول مورد نظر با موفقیت به علاقه مندی برداشته شد',
                },
            };
        } else {
            const bookmarkProductsResult = await ProductsModel.updateOne({_id: productID}, {
                $push: {bookmark: user?._id},
            })
            if(bookmarkProductsResult.modifiedCount === 0) throw createHttpError.InternalServerError('افزودن به علاقه مندی محصول مورد نظر انجام نشد');
            return {
                status: StatusCodes.OK,
                data: {
                    message: 'محصول مورد نظر با موفقیت به علاقه مندی اضافه شد',
                },
            };
        };
    },
};



module.exports = {
    BookmarksBlogs,
    BookmarksCourses,
    BookmarksProducts,
};