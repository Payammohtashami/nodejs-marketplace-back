const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    show: { type: Boolean, required: true, default: false },
    user: { type: mongoose.Types.ObjectId, ref: 'Users', required: true },
    comment: { type: String, default: '', required: true },
    openToComment: {type: Boolean, required: true, default: true},
},
{
    timestamps: {createdAt: true, updatedAt: true},
});

const commentSchema = new mongoose.Schema({
    show: { type: Boolean, required: true, default: false },
    user: { type: mongoose.Types.ObjectId, ref: 'Users', required: true },
    answers: { type: [AnswerSchema], default: [] },
    comment: { type: String, default: '', required: true },
    openToComment: {type: Boolean, required: true, default: true},
},
{
    timestamps: {createdAt: true, updatedAt: true},
});

module.exports = { 
    commentSchema
};