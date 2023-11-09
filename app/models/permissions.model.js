const mongoose = require('mongoose');

const PermissionsSchema = new mongoose.Schema({
    name: {type: String, required: true},
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