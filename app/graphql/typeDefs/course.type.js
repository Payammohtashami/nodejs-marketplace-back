const { commentType } = require("./comment.type");
const { UserType, CategoryType } = require("./public.type");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");

const EpisodesType = new GraphQLObjectType({
    name: 'episodesType',
    fields: {
        type: {type: GraphQLString},
        time: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        videoAddress: {type: GraphQLString},
    },
});


const ChaptersType = new GraphQLObjectType({
    name: 'ChaptersType',
    fields: {
        title: {type: CategoryType},
        description: {type: CategoryType},
        episode: {type: new GraphQLList(EpisodesType)},
    },
});

const CoursesType = new GraphQLObjectType({
    name: 'coursesType',
    fields: {
        _id: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        title: {type: GraphQLString},
        subtitle: {type: GraphQLString},
        image: {type: GraphQLString},
        imageURL: {type: GraphQLString},
        description: {type: GraphQLString},
        category: {type: CategoryType},
        comments: {type: new GraphQLList(commentType)},
        price: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        like: {type: GraphQLInt},
        type: {type: GraphQLString},
        bookmark: {type: GraphQLString},
        status: {type: GraphQLString},
        teacher: {type: UserType},
        chapters: {type: new GraphQLList(ChaptersType)},
    },
});

module.exports = {
    CoursesType,
};