const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AutherType } = require("./public.type");

const BlogType = new GraphQLObjectType({
    name: 'blog',
    fields: {
        _id: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        text: {type: GraphQLString},
        title: {type: GraphQLString},
        subtitle: {type: GraphQLString},
        image: {type: GraphQLString},
        auther: {type: AutherType},
        category: {type: GraphQLString},
        comments: {type: new GraphQLList(GraphQLString)},
        // like: {type: new GraphQLList(), defualt: []},
        // deslike: {type: [mongoose.Types.ObjectId], defualt: []},
        // bookmark: {type: [mongoose.Types.ObjectId], defualt: []},
    },
});

module.exports = {
    BlogType,
};