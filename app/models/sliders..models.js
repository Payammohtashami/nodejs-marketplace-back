const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    image: {type: String, required: true},
});

module.exports = {
    SlidersModel: mongoose.model('Sliders', Schema)
};