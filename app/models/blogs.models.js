const string = require('@hapi/joi/lib/types/string');
const mongoose = require('mongoose');
const { commentSchema } = require('./public.models');

const BlogSchema = new mongoose.Schema({
    tags: {type: [String], default: []},
    text: {type: String, required: true},
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    image: {type: String, required: true},
    auther: {type: mongoose.Types.ObjectId, ref: 'Users', required: true},
    category: {type: [mongoose.Types.ObjectId], required: true, ref: 'Category'},
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

BlogSchema.virtual('Users', {
    ref: 'Users',
    localField: '_id',
    foreignField: 'auther',
});

BlogSchema.virtual('category_detail', {
    ref: 'category',
    localField: '_id',
    foreignField: 'category',
});
BlogSchema.virtual('imageURL').get(function(){
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.image}`;
})

module.exports = {
    BlogsModel: mongoose.model('Blogs', BlogSchema)
};