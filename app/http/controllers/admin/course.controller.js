const path = require('path');
const Controller = require("../controller");
const { StatusCodes } = require("http-status-codes");
const { CourseModel } = require("../../../models/course.models");

class CourseController extends Controller {
    async addCourse(req, res, next){
        try {
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename).replace(/\\/g, '/');
            const data = req.body;
            return res.status(StatusCodes.CREATED).json({
                error: null,
                data: {
                    status: StatusCodes.CREATED,
                    message: 'دوره با موفقیت ایجاد شد',
                },
            })
        } catch (error) {
            next(error);
        };
    };

    async updateCourse(req, res, next){
        try {
            
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
            if(!!search) await CourseModel.find({$text: {$search: search}}).sort({_id: -1})
            else courses = await CourseModel.find({}).sort({_id: -1});
            return res.status(StatusCodes.OK).json({
                error: null,
                data: {
                    courses,
                    status: StatusCodes.OK,
                },
            });
        } catch (error) {
            next(error);
        };
    };

    async getCourseById(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        };
    };

    async addChapterToCourse(req, res, next){
        try {
            
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
};

module.exports ={
    CourseController: new CourseController()
};