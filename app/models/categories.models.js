const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, ref: 'Category', default: null},
}, {
    toJSON: {
        virtuals: true
    },
    versionKey: false,
    id: false,
});

Schema.virtual('children', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent',
});

function autoPopulate(next){
    this.populate([{path: 'children', select: {__v: 0, id: 0}}])
    next();
};

Schema.pre('findOne', autoPopulate).pre('find', autoPopulate);

module.exports = {
    CategoryModel: mongoose.model('Category', Schema)
};