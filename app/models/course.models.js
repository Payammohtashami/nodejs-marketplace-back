const mongoose = require('mongoose');
const { commentSchema } = require('./public.models');
const { getTotalCourseTimes } = require('../utils/functions');

const EposideSchema = new mongoose.Schema({
    type: {type: String, default: 'FREE'},
    time: {type: String, default: '00:00:00', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    videoAddress: {type: String, required: true},
}, {
    toJSON: {
        virtuals: true
    }
});
EposideSchema.virtual('videoURL').get(function(){
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.videoAddress}`;
});

const chapter = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ''},
    episode: {type: [EposideSchema], default: []}
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
    likes: {type: [mongoose.Types.ObjectId], ref: "Users", default: []},
    deslikes: {type: [mongoose.Types.ObjectId], ref: "Users", default: []},
    bookmark: {type: [mongoose.Types.ObjectId], ref: "Users", default: []},
    type: {type: String, default: 'FREE' /* FREE, CASH, VIP */, required: true},
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
CourseSchema.virtual('imageURL').get(function(){
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.image}`;
})
CourseSchema.virtual('time').get(function(){
    return getTotalCourseTimes(this.chapters ?? []);
})

module.exports = {
    CourseModel: mongoose.model('Course', CourseSchema)
};