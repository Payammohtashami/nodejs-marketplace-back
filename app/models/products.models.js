const mongoose = require('mongoose');
const { commentSchema } = require('./public.models');

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    description: {type: String, required: true},
    images: {type: [String], required: true},
    tags: {type: [String], required: true},
    comments: {type: [commentSchema], default: []},
    category: {type: mongoose.Types.ObjectId, ref: 'Category', required: true},
    price: {type: Number, required: true},
    count: {type: Number},
    avaliable_counts: {type: Number},
    type: {type: String, required: true},
    like: {type: [mongoose.Types.ObjectId], default: []},
    bookmark: {type: [mongoose.Types.ObjectId], default: []},
    format: {type: String},
    supplier: {type: mongoose.Types.ObjectId, required: false},
    feature: {type: Object, default: {
        length: 0,
        width: 0,
        height: 0,
    }},
}, {
    versionKey: false,
});

module.exports = {
    ProductsModel: mongoose.model('Products', Schema)
};