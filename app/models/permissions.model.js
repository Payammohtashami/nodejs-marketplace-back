const mongoose = require('mongoose');

const PermissionsSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, default: ''},
}, {
    versionKey: false,
    toJSON: {
        virtuals: true
    },
});

module.exports = {
    PermissionsModel: mongoose.model('permission', PermissionsSchema)
};