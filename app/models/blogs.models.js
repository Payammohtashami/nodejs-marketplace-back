const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    tags: {type: [String], default: []},
    text: {type: String, required: true},
    title: {type: String, required: true},
    image: {type: String, required: true},
    auther: {type: mongoose.Types.ObjectId, required: true},
    category: {type: mongoose.Types.ObjectId, required: true},
    comments: {type: [], defualt: []},
    like: {type: [mongoose.Types.ObjectId], defualt: []},
    bookmark: {type: [mongoose.Types.ObjectId], defualt: []},
    
});

module.exports = {
    BlogsModel: mongoose.model('Blogs', Schema)
};