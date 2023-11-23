const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryModel } = require("../../models/categories.models");
const { CategoriesType } = require("../typeDefs/category.type");
const { VerifyAccessTokenInGraphGL } = require("../../http/middlewares/verifyAccessToken");

const CategoriesResolver = {
    type: new GraphQLList(CategoriesType),
    resolve: async (_, args, context) => {
        const {req, res} = context;
        VerifyAccessTokenInGraphGL(req, res);
        return await CategoryModel.find({parent: undefined});
    },
};

const CategoryChildResolver = {
    type: new GraphQLList(CategoriesType),
    args: {
        parent: {type: GraphQLString}
    },
    resolve: async (_, args) => {
        const { parent } = args;
        if(!parent) return;
        return await CategoryModel.find({parent});
    },
};

module.exports = {
    CategoriesResolver,
    CategoryChildResolver,
};