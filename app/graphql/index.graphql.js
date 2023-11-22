const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductsResolver } = require("./queries/product.resolver");
const { CategoriesResolver, CategoryChildResolver } = require("./queries/category.resolver");

const RootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        blogs: BlogResolver,
        products: ProductsResolver,
        categories: CategoriesResolver,
        categoriesChild: CategoryChildResolver,
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
    },
});

const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation,
});

module.exports = {
    graphqlSchema,
};