const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductsResolver } = require("./queries/product.resolver");
const { CategoriesResolver, CategoryChildResolver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { createCommentForBlogs, createCommentForCourses, createCommentForProducts } = require("./mutations/comment.resolver");
const { LikeAndDislikeProducts } = require("./mutations/likeAndDeslike.resolver");
const { BookmarksProducts, BookmarksBlogs, BookmarksCourses } = require("./mutations/bookmarks.resolver");
const { AddProductToBasket, AddCourseToBasket, RemoveCourseToBasket, RemoveProductToBasket } = require("./mutations/basket.resolver");

const RootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        blogs: BlogResolver,
        courses: CourseResolver,
        products: ProductsResolver,
        categories: CategoriesResolver,
        categoriesChild: CategoryChildResolver,
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createCommentForBlogs: createCommentForBlogs,
        createCommentForCourses: createCommentForCourses,
        createCommentForProducts: createCommentForProducts,

        LikeAndDislikeProducts: LikeAndDislikeProducts,

        BookmarksBlogs: BookmarksBlogs,
        BookmarksCourses: BookmarksCourses,
        BookmarksProducts: BookmarksProducts,

        AddCourseToBasket,
        AddProductToBasket,
        RemoveCourseToBasket,
        RemoveProductToBasket,
    },
});

const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

module.exports = {
    graphqlSchema,
};