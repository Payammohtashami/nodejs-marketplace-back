const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    permissions: {type: [mongoose.Types.ObjectId], ref: 'permissions', default: []},
}, {
    versionKey: false,
    toJSON: {
        virtuals: true
    },
});

module.exports = {
    RoleModel: mongoose.model('role', RoleSchema)
};