const { CourseModel } = require("../../models/course.models");
const { CoursesType } = require("../typeDefs/course.type");
const { GraphQLList, GraphQLString } = require("graphql");
const { VerifyAccessTokenInGraphGL } = require("../../http/middlewares/verifyAccessToken");

const CourseResolver = {
    type: new GraphQLList(CoursesType),
    args: {
        category: {type: GraphQLString},
    },
    resolve: async (_, args, context) => {
        const { category } = args;
        const findQuery = !!category ? { category } : {};
        const { req } = context;
        req.user = await VerifyAccessTokenInGraphGL(req);
        return await CourseModel.find(findQuery).populate('category');
    },
};

module.exports = {
    CourseResolver
};