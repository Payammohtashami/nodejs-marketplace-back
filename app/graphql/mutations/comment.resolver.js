const createHttpError = require("http-errors");
const { BlogsModel } = require("../../models/blogs.models");
const { StatusCodes } = require('http-status-codes');
const { ResponseType } = require("../typeDefs/public.type");
const { GraphQLString } = require("graphql");
const { VerifyAccessTokenInGraphGL } = require("../../http/middlewares/verifyAccessToken");

const createComment = {
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
        await checkExistBlogs(blogID);
        await BlogsModel.updateOne({id: blogID}, {
            $push: {
                comments: {
                    show: false,
                    user: req.user._id,
                    parent,
                    comment,
                    openToComment: !parent,
                },
            },
        })
        return {
                status: StatusCodes.CREATED,
                data: {
                    message: 'ثبت نظر با موفقیت انجام شد',
                },
        }
    },
};

async function checkExistBlogs(id){
    const blog = await BlogsModel.findById(id);
    if(!blog) throw createHttpError.NotFound('بلاگی با آیدی مورد نظر یافت نشد');
    return blog;
}
module.exports = {
    createComment,
};