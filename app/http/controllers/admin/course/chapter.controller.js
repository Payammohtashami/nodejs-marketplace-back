const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course.models");

class ChapterController extends Controller {
    async addChapter(req, res, next){
        try {
            const { id, title, description } = body.body;
            const course = await this.findCourseById(id);
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

    async findCourseById(id){
        if(mongoose.isValidObjectId(id)) throw createHttpError.BadRequest('شناسه ارسال شده صحیح نمی باشد');
        const course = await CourseModel.findById(id);
        if(!course) throw createHttpError.NotFound('دوره ای یافت نشد');
        return course;
    };
};

module.exports = {
    ChapterController: new ChapterController()
};