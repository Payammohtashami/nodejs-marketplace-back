const { GraphQLList } = require("graphql");
const { BlogType } = require("../typeDefs/blogs.type");
const { BlogsModel } = require("../../models/blogs.models");

const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async () => {
        return await BlogsModel.find({}).populate(['auther', 'category']);
    },
};

module.exports = {
    BlogResolver
};