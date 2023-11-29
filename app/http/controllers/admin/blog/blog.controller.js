const path = require('path');
const omitEmpty = require('omit-empty');
const Controller = require('../../controller');
const createHttpError = require('http-errors');
const { BlogsModel } = require('../../../../models/blogs.models');
const { addBlogSchema } = require('../../../validators/admin/blog.schema');
const { deleteFileInPublic, deleteBlockedItems } = require('../../../../utils/functions');
const { StatusCodes } = require('http-status-codes');

class BlogController extends Controller {
    async createBlog(req, res, next){
        try {
            const blogDataBody = await addBlogSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename).replace(/\\/g, '/');
            const {title, subtitle, text, image, tags, category, } = req.body;
            const auther = req.user._id
            const blog = await BlogsModel.create({auther, title, subtitle, text, image, tags, category, });
            if(!blog) throw createHttpError.InternalServerError('بلاگ ساخته نشد');
            return res.status(StatusCodes.CREATED).json({
                error: null,
                status: StatusCodes.CREATED,
                data: {
                    blog: req.body,
                    message: 'ساخت بلاگ با موفقیت انجام شد',
                },
            });
        } catch (error) {
            deleteFileInPublic(path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/g, '/'))
            next(error);
        };
    };

    async getOneBlogById(req, res, next){
        try {
            const { id } = req.params;
            const blog = await this.findBlog({_id: id});
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    blog,
                },
            })
        } catch (error) {
            next(error);
        }
    };

    async getListOfBlogs(req, res, next){
        try {
            const blogs = await BlogsModel.aggregate([
                {$match: {}},
                {
                    $lookup: {
                        as: 'auther',
                        from: 'users',
                        localField: 'auther',
                        foreignField: '_id',
                    }
                },
                {
                    $unwind: '$auther',
                },
                {
                    $lookup: {
                        as: 'category',
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                    }
                },
                {
                    $unwind: '$auther',
                },
                {
                    $project: {
                        'auther.roles': 0,
                        'auther.basket': 0,
                        'auther.discount': 0,
                        'auther.__v': 0,
                        'category.__v': 0,
                        'auther.otp': 0,
                    },
                }
            ]);
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    blogs,
                },
            })
        } catch (error) {
            next(error);
        }
    };

    async getCommentsOfBlogs(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        }
    };

    async removeBlogById(req, res, next){
        try {
            const { id } = req.params;
            await this.findBlog({_id: id})
            const result = await BlogsModel.deleteOne({_id: id});
            if(result.deletedCount === 0) throw createHttpError.InternalServerError('حذف انجام نشد');
            return  res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'حذف مقاله با موفقیت انجام شد',
                }
            })
        } catch (error) {
            next(error);
        }
    };

    async updateBlogById(req, res, next){
        try {
            const { id } = req.params;
            await this.findBlog({_id: id});
            if(req.body?.fileUploadPath && req.body?.filename){
                req.body.image = path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/g, '/');
            };
            const blockListValue = ['bookmark', 'like', 'dislike', 'like', 'auther'];
            const data = omitEmpty(req.body);
            deleteBlockedItems(data, blockListValue);
            const blog = await BlogsModel.updateOne({_id: id},{$set: data});
            if(blog.modifiedCount === 0) throw createHttpError.InternalServerError('به روز رسانی انجام نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    blog: req.body,
                    message: 'به روز رسانی بلاگ با موفقیت انجام شد',
                },
            });
        } catch (error) {
            deleteFileInPublic(path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/g, '/'))
            next(error);
        };
    };

    async findBlog(query = {}){
        const blog = await BlogsModel.findOne({...query}).populate([{path: 'category', select: {children: 0}}, {path: 'auther'}]);
        if(!blog) throw createHttpError.NotFound('بلاگ مورد نظر یافت نشد');
        return blog;
    } 
};

module.exports = {
    BlogController: new BlogController()
};