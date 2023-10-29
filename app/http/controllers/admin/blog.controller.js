const Controller = require('../controller')

class BlogController extends Controller {
    async createBlog(req, res, next){
        try {
            
        } catch (error) {
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