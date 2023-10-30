const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String, lowercase: true},
    mobile: {type: String, required: true},
    email : {type : String, lowercase : true},
    password: {type: String},
    profile_image: {type: String},
    otp: {type: Object, default: {
        code: 0,
        expiresIn: 0
    }},
    roles : {type : [String], default : ["USER"]},
    bills: {type: [], default: []},
    discount: {type: Number, default: 0},
    birthday: {type: String},
},{
    versionKey: false,
    timestamps: true,
    toJSON: {
        virtuals: true
    },
});

module.exports = {
    UsersModel: mongoose.model('Users', Schema)
};