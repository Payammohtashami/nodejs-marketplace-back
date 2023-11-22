const { GraphQLList } = require("graphql");
const { ProductsType } = require("../typeDefs/products.type");
const { ProductsModel } = require("../../models/products.models");

const ProductsResolver = {
    type: new GraphQLList(ProductsType),
    resolve: async () => {
        return await ProductsModel.find({}).populate('auther');
    },
};

module.exports = {
    ProductsResolver
};