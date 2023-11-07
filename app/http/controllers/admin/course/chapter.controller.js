const omitEmpty = require("omit-empty");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course.models");
const { CourseController } = require("./course.controller");

class ChapterController extends Controller {
    async addChapter(req, res, next){
        try {
            const { id, title, description } = req.body;
            const course = await CourseController.findCourseById(id);
            const saveChapterResult = await CourseModel.updateOne({_id: course.id}, {$push: {chapters: {title, description, episode: []}}})
            if(saveChapterResult.modifiedCount === 0) throw createHttpError.InternalServerError('فصل افزوده نشد')
            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                error: null,
                data: {
                    message: 'فصل با موفقیت ایجاد شد'
                },
            })
        } catch (error) {
            next(error);
        };
    };

    async chapterList(req, res, next){
        try {
            const { id } = req.params;
            await CourseController.findCourseById(id);
            const chapters = await CourseModel.findOne({_id: id}, {chapters: 1, title: 1});
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                error: null,
                data: {
                    course: chapters,
                },
            })
        } catch (error) {
            next(error);
        };
    };

    async removeChapterById(req, res, next){
        try {
            const { id } = req.params;
            const chapter = await this.getOneChapter(id);
            const removeChapterResult = await CourseModel.updateOne({'chapters._id': id}, {
                $pull: {
                    chapters: {
                        _id: id
                    }
                }
            });
            if(removeChapterResult.modifiedCount === 0) throw createHttpError.InternalServerError('حذف فصل انجام نشد')
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'حذف فصل با موفقیت انجام شد',
                }
            });
        } catch (error) {
            next(error);
        };
    };

    async updateChapterById(req, res, next){
        try {
            const { id } = req.params;
            const data = omitEmpty(req.body);
            await this.getOneChapter(id);
            const updateChapterResult = await CourseModel.updateOne({'chapters._id': id}, {
                $set: {
                    "chapters.$": data,
                }
            });
            if(updateChapterResult.modifiedCount === 0) throw createHttpError.InternalServerError('به روز رسانی فصل انجام نشد')
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'به روز رسانی فصل با موفقیت انجام شد',
                }
            });
        } catch (error) {
            next(error);
        };
    };

    async getOneChapter(id){
        const chapter = await CourseModel.findOne({'chapters._id': id}, {'chapters.$': 1});
        if(!chapter) throw createHttpError.NotFound('فصل مورد نظر یافت نشد')
        return chapter;
    }
};

module.exports = {
    ChapterController: new ChapterController()
};