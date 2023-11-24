const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    show: { type: Boolean, required: true, default: false },
    owner: { type: mongoose.Types.ObjectId, ref: 'Users', required: true },
    parent: { type: mongoose.Types.ObjectId, ref: 'comment' },
    comment: { type: String, default: '', required: true },
    opdnToComment: {type: Boolean, required: true, default: true},
},
{
    timestamps: {createdAt: true, updatedAt: true},
});

module.exports = { 
    commentSchema
};