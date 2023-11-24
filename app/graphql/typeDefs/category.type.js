const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AnyType } = require("./public.type");

const CategoriesType = new GraphQLObjectType({
    name: 'categories',
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        children: {type: new GraphQLList(AnyType)}
    }
});

module.exports = {
    CategoriesType,
};