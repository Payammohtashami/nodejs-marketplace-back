const { GraphQLList, GraphQLString } = require("graphql");
const { ProductsType } = require("../typeDefs/products.type");
const { ProductsModel } = require("../../models/products.models");

const ProductsResolver = {
    type: new GraphQLList(ProductsType),
    args: {
        category: {type: GraphQLString},
    },
    resolve: async (_, args, context) => {
        const { category } = args;
        const findQuery = !!category ? { category } : {};
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        return await ProductsModel.find(findQuery).populate('auther');
    },
};

module.exports = {
    ProductsResolver
};