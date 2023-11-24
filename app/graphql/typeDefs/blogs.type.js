const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { UserType, CategoryType } = require("./public.type");

const BlogType = new GraphQLObjectType({
    name: 'blog',
    fields: {
        _id: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        text: {type: GraphQLString},
        title: {type: GraphQLString},
        subtitle: {type: GraphQLString},
        image: {type: GraphQLString},
        auther: {type: UserType},
        category: {type: CategoryType},
        comments: {type: new GraphQLList(GraphQLString)},
        // like: {type: new GraphQLList(), defualt: []},
        // deslike: {type: [mongoose.Types.ObjectId], defualt: []},
        // bookmark: {type: [mongoose.Types.ObjectId], defualt: []},
    },
});

module.exports = {
    BlogType,
};