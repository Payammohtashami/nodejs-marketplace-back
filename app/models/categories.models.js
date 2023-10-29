const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, default: null},
});

module.exports = {
    CategoryModel: mongoose.model('Category', Schema)
};