const string = require('@hapi/joi/lib/types/string');
const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    owner: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    comment: { type: String, default: '', required: true },
    createdAt: {type: Date, default: new Date().getTime()},
    parent: { type: mongoose.Types.ObjectId },
});

const Schema = new mongoose.Schema({
    tags: {type: [String], default: []},
    text: {type: String, required: true},
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    image: {type: String, required: true},
    auther: {type: mongoose.Types.ObjectId, ref: 'Users', required: true},
    category: {type: [mongoose.Types.ObjectId], required: true},
    comments: {type: [commentSchema], defualt: []},
    like: {type: [mongoose.Types.ObjectId], ref: 'Users', defualt: []},
    deslike: {type: [mongoose.Types.ObjectId], ref: 'Users', defualt: []},
    bookmark: {type: [mongoose.Types.ObjectId], ref: 'Users', defualt: []},
    
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true
    },
});

Schema.virtual('Users', {
    ref: 'Users',
    localField: '_id',
    foreignField: 'auther',
});

Schema.virtual('category_detail', {
    ref: 'category',
    localField: '_id',
    foreignField: 'category',
});
module.exports = {
    BlogsModel: mongoose.model('Blogs', Schema)
};