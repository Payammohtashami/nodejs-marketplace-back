const mongoose = require('mongoose');
const { commentSchema } = require('./public.models');

const Eposide = new mongoose.Schema({
    type: {type: String, default: 'FREE'},
    time: {type: String, default: '00:00:00', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    videoAddress: {type: String, required: true},

})
const chapter = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ''},
    episode: {type: [Eposide], default: []}
});

const CourseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], required: true},
    comments: {type: [commentSchema], default: []},
    category: {type: mongoose.Types.ObjectId, ref: 'Category', required: true},
    price: {type: Number, required: true},
    discount: {type: Number},
    like: {type: [mongoose.Types.ObjectId], default: []},
    bookmark: {type: [mongoose.Types.ObjectId], default: []},
    type: {type: String, default: 'FREE' /* FREE, CASH, VIP */, required: true},
    time: {type: String, default: '00:00:00'},
    status: {type: String, default: 'NOT_STARTED'}, // NOT_STARTED, IN_PROGRESS, COMPLETED
    teacher: {type: mongoose.Types.ObjectId, ref: 'Users', required: true},
    chapters: {type: [chapter], default: []}
}, {
    versionKey: false,
    toJSON: {
        virtuals: true
    },
});

CourseSchema.index({title: 'text', description: 'text', subtitle: 'text'});

module.exports = {
    CourseModel: mongoose.model('Course', CourseSchema)
};