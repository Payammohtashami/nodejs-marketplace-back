const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    description: {type: String},
    images: {type: [String], required: true},
    tags: {type: [String], required: true},
    comments: {type: [], default: []},
    category: {type: mongoose.Types.ObjectId, required: true},
    price: {type: Number, required: true},
    discount: {type: Number},
    avaliable_counts: {type: Number},
    type: {type: String, required: true},
    like: {type: [mongoose.Types.ObjectId], default: []},
    bookmark: {type: [mongoose.Types.ObjectId], default: []},
    time: {type: String},
    format: {type: String},
    teacher: {type: mongoose.Types.ObjectId, required: true},
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