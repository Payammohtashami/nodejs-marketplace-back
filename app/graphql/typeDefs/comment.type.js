const { UserType, AnyType } = require("./public.type");
const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");

const parentOfCommentType = new GraphQLObjectType({
    name: 'parentOfCommentType',
    fields: {
        user: {type: UserType},
        comment: {type: GraphQLString},
    },
}); 

const commentType = new GraphQLObjectType({
    name: 'commentsType',
    fields: {
        user: {type: UserType},
        comment: {type: GraphQLString},
        parent: {type: parentOfCommentType},
        show: {type: GraphQLBoolean},
        openToComment: {type: GraphQLBoolean},
    }
});




module.exports = {
    commentType,
};