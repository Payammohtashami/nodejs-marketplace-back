const { GraphQLList } = require("graphql");
const { getBasketOfUser } = require("../../utils/functions");
const { VerifyAccessTokenInGraphGL } = require("../../http/middlewares/verifyAccessToken");

// types
const { AnyType } = require("../typeDefs/public.type");
const { BlogType } = require("../typeDefs/blogs.type");
const { CoursesType } = require("../typeDefs/course.type");
const { ProductsType } = require("../typeDefs/products.type");

// models
const { BlogsModel } = require("../../models/blogs.models");
const { CourseModel } = require('../../models/course.models');
const { ProductsModel } = require('../../models/products.models');

const getUserBookmarkedBlogs = {
    type : new GraphQLList(BlogType),
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphGL(req)
        const blogs = await BlogsModel.find({bookmark : user._id}).populate([
            {path : 'authe  r'}, 
            {path: "category"}, 
            {path: "comments.user"}, 
            {path: "comments.answers.user"},
            {path: "likes"},
            {path: "deslikes"},
            {path: "bookmark"},
        ]);
        return blogs;
    }
};

const getUserBookmarkedProducts = {
    type : new GraphQLList(ProductsType),
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphGL(req)
        const products = await ProductsModel.find({bookmark: user._id}).populate([
            {path: 'supplier'}, 
            {path: "category"},
            {path: "comments.user"},
            {path: "comments.answers.user"},
            {path: "likes"},
            {path: "deslikes"},
            {path: "bookmark"},
        ]);
        return products
    }
};

const getUserBookmarkedCourses = {
    type : new GraphQLList(CoursesType),
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphGL(req)
        const courses = await CourseModel.find({bookmark: user._id}).populate([
            {path : 'teacher'}, 
            {path: "category"},
            {path: "comments.user"},
            {path: "likes"},
            {path: "deslikes"},
            {path: "bookmark"},
        ]);
        return courses
    }
};

const getUserBasket = {
    type : AnyType,
    resolve : async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphGL(req)
        const userDetail = await getBasketOfUser(user._id)
        return userDetail;
    }
};

module.exports = {
    getUserBookmarkedBlogs,
    getUserBookmarkedCourses,
    getUserBookmarkedProducts,
    getUserBasket
}