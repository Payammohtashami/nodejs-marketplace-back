const { GraphQLList, GraphQLString } = require("graphql");
const { BlogType } = require("../typeDefs/blogs.type");
const { BlogsModel } = require("../../models/blogs.models");
const { VerifyAccessTokenInGraphGL } = require("../../http/middlewares/verifyAccessToken");

const BlogResolver = {
    type: new GraphQLList(BlogType),
    args: {
        category: {type: GraphQLString},
    },
    resolve: async (_, args, context) => {
        const { category } = args;
        const findQuery = !!category ? { category } : {};
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        return await BlogsModel.find(findQuery).populate([
            {path: 'auther'}, 
            {path: 'category'}, 
            {path: 'comments.user'},
            {path: 'comments.answers.user'},
        ]);
    },
};

module.exports = {
    BlogResolver
};