const path = require('path');
const omitEmpty = require('omit-empty');
const Controller = require("../../controller");
const createHttpError = require('http-errors');
const { getTime, copyObject, deleteBlockedItems } = require('../../../../utils/functions');
const { StatusCodes } = require('http-status-codes');
const { CourseModel } = require('../../../../models/course.models');
const { addEpisodeSchema } = require("../../../validators/admin/course.schema");
const { ObjectIdValidator } = require('../../../validators/public.validators');
const { getVideoDurationInSeconds } = require("get-video-duration");

class EpisodeController extends Controller {
    async addEpisode(req, res, next){
        try {
            const { title, type, filename, description, chapterId, courseId, fileUploadPath } = await addEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, '/');
            const videoUrl = `${process.env.BASE_URL}:${process.env.PORT}/${videoAddress}`
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
            const { id } = await ObjectIdValidator.validateAsync(req.params);
            const { filename, fileUploadPath } = req.body;
            let blockListValues = ['_id'];
            if(filename && fileUploadPath) {
                req.body.videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, '/');
                const videoUrl = `${process.env.BASE_URL}:${process.env.PORT}/${req.body.videoAddress}`
                const videoSecondsDuration = await getVideoDurationInSeconds(videoUrl);
                const time = getTime(videoSecondsDuration);
                req.body.time = time;
                blockListValues.push('filename');
                blockListValues.push('fileUploadPath');
            } else {
                blockListValues.push('time');
                blockListValues.push('videoAddress');
            };
            const data = omitEmpty(req.body);
            deleteBlockedItems(data, blockListValues)
            const updateEpisodeResult = await CourseModel.updateOne({'chapters.episode._id': id}, {
                $set: {
                    'chapters.$.episode': data,
                },
            });
            console.log(data);
            if(updateEpisodeResult.modifiedCount === 0) throw createHttpError.InternalServerError('به روز رسانی قسمت ها انجام نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'قسمت جدید با موفقیت به روز رسانی شد',
                },
            });
        } catch (error) {
            next(error);
        };
    };

    async getEpisodeById(episodeId){
        const course = await CourseModel.findOne({'chapters.episode._id': episodeId})
        if(!course) throw createHttpError.NotFound('اپیزود یافت نشد');
        const episode = course?.chapters?.[0]?.episode?.[0];
        if(!episode) throw createHttpError.NotFound('اپیزود یافت نشد');
        return copyObject(episode);
    };
};

module.exports = {
    EpisodeController: new EpisodeController()
};