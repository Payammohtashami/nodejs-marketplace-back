const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    role: {type : String, default : "USER"},
    bills: {type: [], default: []},
    discount: {type: Number, default: 0},
    birthday: {type: String},
    courses: {type: [mongoose.Types.ObjectId], ref: 'Course', default: []},
},{
    versionKey: false,
    timestamps: true,
    toJSON: {
        virtuals: true
    },
});

UserSchema.index({mobile: 'text', email: 'text', username: 'text'});

module.exports = {
    UsersModel: mongoose.model('Users', UserSchema)
};