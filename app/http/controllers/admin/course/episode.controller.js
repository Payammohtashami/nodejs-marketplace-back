const path = require('path');
const Controller = require("../../controller");
const createHttpError = require('http-errors');
const { getTime } = require('../../../../utils/functions');
const { StatusCodes } = require('http-status-codes');
const { CourseModel } = require('../../../../models/course.models');
const { addEpisodeSchema } = require("../../../validators/admin/course.schema");
const { getVideoDurationInSeconds } = require("get-video-duration");
const { ObjectIdValidator } = require('../../../validators/public.validators');

class EpisodeController extends Controller {
    async addEpisode(req, res, next){
        try {
            const { title, type, filename, description, chapterId, courseId, fileUploadPath } = await addEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, '/');
            const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`
            const videoSecondsDuration = await getVideoDurationInSeconds(videoUrl);
            const time = getTime(videoSecondsDuration);
            const createEpisodeResult = await CourseModel.updateOne({_id: courseId, 'chapters._id': chapterId}, {
                $push: {
                    'chapters.$.episode': {
                        type,
                        time,
                        title,
                        description,
                        videoAddress,
                    }
                },
            });
            if(createEpisodeResult.modifiedCount === 0) throw createHttpError.InternalServerError('قسمت جدید ساخته نشد');
            return res.status(StatusCodes.CREATED).json({
                error: null,
                status: StatusCodes.CREATED,
                data: {
                    message: 'قسمت جدید با موفقیت ایجاد شد',
                },
            });
        } catch (error) {
            next(error);
        };
    };

    async episodeList(req, res, next){
        try {
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                },
            });
        } catch (error) {
            next(error);
        };
    };

    async removeEpisodeById(req, res, next){
        try {
            const { id } = await ObjectIdValidator.validateAsync(req.params);
            const removeEpisodeResult = await CourseModel.updateOne({'chapters.episode._id': id},
            {
                $pull: {
                    'chapters.$.episode': {
                        _id: id,
                    },
                },
            });
            if(removeEpisodeResult.modifiedCount === 0) throw createHttpError.InternalServerError('قسمت جدید ساخته نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'قسمت جدید با موفقیت حذف شد',
                },
            });
        } catch (error) {
            next(error);
        };
    };

    async updateEpisodeById(req, res, next){
        try {
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'قسمت جدید با موفقیت آپدیت شد',
                },
            });
        } catch (error) {
            next(error);
        };
    };
};

module.exports = {
    EpisodeController: new EpisodeController()
};