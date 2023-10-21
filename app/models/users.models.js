const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String, required: true, unique: true, lowercase: true,},
    mobile: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, lowercase: true,},
    password: {type: String, unique: true},
    profile_image: {type: String},
    otp: {type: Object, default: {
        code: 0,
        expires: 0
    }},
    bills: {type: [], default: []},
    discount: {type: Number, default: 0},
    birthday: {type: String},
},);

module.exports = {
    UsersModel: mongoose.model('Users', Schema)
};