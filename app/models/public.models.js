const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    owner: { type: mongoose.Types.ObjectId, ref: 'Users', required: true },
    comment: { type: String, default: '', required: true },
    createdAt: {type: Date, default: new Date().getTime()},
    parent: { type: mongoose.Types.ObjectId, ref: 'comment' },
});

module.exports = { 
    commentSchema
};