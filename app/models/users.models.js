const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String, unique: true, lowercase: true,},
    mobile: {type: String, required: true},
    email: {type: String, unique: true, lowercase: true,},
    password: {type: String, unique: true},
    profile_image: {type: String},
    otp: {type: Object, default: {
        code: 0,
        expiresIn: 0
    }},
    roles: {type: [], default: []},
    bills: {type: [], default: []},
    discount: {type: Number, default: 0},
    birthday: {type: String},
},);

module.exports = {
    UsersModel: mongoose.model('Users', Schema)
};