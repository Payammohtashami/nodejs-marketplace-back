const { GraphQLList } = require("graphql");
const { BlogType } = require("../typeDefs/blogs.type");
const { BlogsModel } = require("../../models/blogs.models");
const { VerifyAccessTokenInGraphGL } = require("../../http/middlewares/verifyAccessToken");

const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        console.log(req.user);
        return await BlogsModel.find({}).populate(['auther', 'category']);
    },
};

module.exports = {
    BlogResolver
};