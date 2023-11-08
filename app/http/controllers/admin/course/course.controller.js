const path = require('path');
const mongoose = require('mongoose');
const omitEmpty = require('omit-empty');
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course.models");
const { addCourseSchema } = require('../../../validators/admin/course.schema');
const { deleteFileInPublic, getTotalCourseTimes } = require('../../../../utils/functions');

class CourseController extends Controller {
    async addCourse(req, res, next){
        try {
            req.body.teacher = req.user.id;
            const validateData = await addCourseSchema.validateAsync(req.body);
            req.body.image = path.join(validateData.fileUploadPath, validateData.filename).replace(/\\/g, '/');
            const {title, subtitle, description, image, tags, category, price, discount, type, teacher} = req.body;
            const course = await CourseModel.create({
                title, subtitle, description, image, tags, category, price, discount, type, teacher, time: '00:00:00', status: 'NOT_STARTED'
            });
            if(+price > 0 && type === 'FREE') throw createHttpError.BadRequest('دوره رایگان نمیتواند قیمت داشته باشد');
            if(!course) throw createHttpError.InternalServerError('ثبت دوره انجام نشد');
            return res.status(StatusCodes.CREATED).json({
                error: null,
                status: StatusCodes.CREATED,
                data: {
                    course,
                    message: 'دوره با موفقیت ایجاد شد',
                },
            })
        } catch (error) {
            next(error);
        };
    };

    async updateCourse(req, res, next){
        try {
            const { id } = req.params;
            const course = await this.findCourseById(id);
            const data = omitEmpty(req.body);
            if(req.file){
                const { filename, fileUploadPath } = req.body;
                data.image = path.join(fileUploadPath, filename).replace(/\\/g, '/');
                deleteFileInPublic(course.image);
            };
            let blockListValues = ['fileUploadPath', 'filename', 'episode', 'chapters', 'comments', 'chapters', 'time', 'bookmark', 'like', 'discount'];
            Object.keys(data).forEach(key => {
                if(blockListValues.includes(key)) delete data[key];
            });
            const updateCourseResult = await CourseModel.updateOne({_id: id}, {
                $set: data
            });
            if(updateCourseResult.modifiedCount === 0) throw createHttpError.InternalServerError('به روز رسانی دوره انجام نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    course: data,
                    message: 'دوره با موفقیت به روزرسانی شد شد',
                },
            })
        } catch (error) {
            next(error);
        };
    };
    
    async removeCourse(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        };
    };

    async getAllCourse(req, res, next){
        try {
            const { search } = req.query;
            let courses;
            if(!!search) await CourseModel.find({$text: {$search: search}}).populate([
                {path: 'category', select: {title: 1, children: 0}},
                {path: 'teacher', select: {first_name: 1, last_name: 1, mobile: 1, email: 1}},
            ]).sort({_id: -1})
            else courses = await CourseModel.find({}).populate([
                {path: 'category', select: {children: 0, parent: 0}},
                {path: 'teacher', select: {first_name: 1, last_name: 1, mobile: 1, email: 1}},
            ]).sort({_id: -1});
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    courses,
                },
            });
        } catch (error) {
            next(error);
        };
    };

    async getCourseById(req, res, next){
        try {
            const { id } = req.params;
            const course = await CourseModel.findById(id);
            course.time = getTotalCourseTimes(course.chapters);
            if(!course) throw createHttpError.NotFound('دوره مورد نظر یافت نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    course,
                },
            });
        } catch (error) {
            next(error);
        };
    };

    async addEpisodeToChapter(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        };
    };

    async findCourseById(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest('شناسه ارسال شده صحیح نمی باشد');
        const course = await CourseModel.findById(id);
        if(!course) throw createHttpError.NotFound('دوره ای یافت نشد');
        return course;
    };
};

module.exports = {
    CourseController: new CourseController(),
};