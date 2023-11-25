const { GraphQLObjectType, GraphQLString, GraphQLScalarType, Kind } = require("graphql");
const { toObject, parseLiteral } = require("../utils");

const AnyType = new GraphQLScalarType({
    name: 'anyType',
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral,
});

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: {
        _id: {type: GraphQLString},
        mobile: {type: GraphQLString},
        last_name: {type: GraphQLString},
        first_name: {type: GraphQLString},
    },
});

const CategoryType = new GraphQLObjectType({
    name: 'category',
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
    },
});

const ResponseType = new GraphQLObjectType({
    name: 'responseType',
    fields: {
        status: {type: GraphQLString},
        data: {type: AnyType},
    }
});

module.exports = {
    AnyType,
    UserType,
    CategoryType,
    ResponseType,
};