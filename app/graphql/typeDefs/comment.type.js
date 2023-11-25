const { UserType } = require("./public.type");
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");

const anwserOfCommentType = new GraphQLObjectType({
    name: 'anwserOfCommentType',
    fields: {
        _id: {type: GraphQLString},
        user: {type: UserType},
        show: {type: GraphQLBoolean},
        comment: {type: GraphQLString},
        createdAt: {type: GraphQLString},
    },
}); 

const commentType = new GraphQLObjectType({
    name: 'commentsType',
    fields: {
        _id: {type: GraphQLString},
        user: {type: UserType},
        comment: {type: GraphQLString},
        answers: {type: new GraphQLList(anwserOfCommentType)},
        show: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString},
        openToComment: {type: GraphQLBoolean},
    }
});




module.exports = {
    commentType,
};