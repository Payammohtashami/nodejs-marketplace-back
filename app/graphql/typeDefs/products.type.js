const { UserType, CategoryType } = require("./public.type");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");

const FeatureType = new GraphQLObjectType({
    name: 'features',
    fields: {
        width: {type: GraphQLInt},
        height: {type: GraphQLInt},
        length: {type: GraphQLInt},
    },
});

const ProductsType = new GraphQLObjectType({
    name: 'product',
    fields: {
        _id: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        title: {type: GraphQLString},
        subtitle: {type: GraphQLString},
        images: {type: new GraphQLList(GraphQLString)},
        imagesURL: {type: new GraphQLList(GraphQLString)},
        description: {type: GraphQLString},
        category: {type: CategoryType},
        comments: {type: new GraphQLList(GraphQLString)},
        auther: {type: UserType},
        price: {type: GraphQLInt},
        count: {type: GraphQLInt},
        avaliable_counts: {type: GraphQLInt},
        type: {type: GraphQLString},
        supplier: {type: GraphQLString},
        features: {type: FeatureType}
    },
});

module.exports = {
    ProductsType,
};