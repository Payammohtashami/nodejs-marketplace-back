const { GraphQLObjectType, GraphQLString } = require("graphql");

const AutherType = new GraphQLObjectType({
    name: 'auther',
    fields: {
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        _id: {type: GraphQLString},
    },
});

module.exports = {
    AutherType,
};