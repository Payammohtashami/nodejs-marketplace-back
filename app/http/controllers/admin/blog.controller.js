const path = require('path');
const Controller = require('../controller');
const createHttpError = require('http-errors');
const { BlogsModel } = require('../../../models/blogs.models');
const { addBlogSchema } = require('../../validators/admin/blog.schema');
const { deleteFileInPublic } = require('../../../utils/functions');

class BlogController extends Controller {
    async createBlog(req, res, next){
        try {
            const blogDataBody = await addBlogSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename).replace(/\\/g, '/');
            const {title, subtitle, text, image, tags, category, } = req.body;
            const blog = await BlogsModel.create({title, subtitle, text, image, tags, category, });
            if(!blog) throw createHttpError.InternalServerError('بلاگ ساخته نشد');
            return res.status(201).json({
                error: null,
                data: {
                    blog: req.body,
                    status: 201,
                    message: 'ساخت بلاگ با موفقیت انجام شد',
                },
            });
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error);
        }
    };

    async getOneBlogById(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        }
    };

    async getListOfBlogs(req, res, next){
        try {
            
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
            
        } catch (error) {
            next(error);
        }
    };

    async updateBlogById(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    BlogController: new BlogController()
};