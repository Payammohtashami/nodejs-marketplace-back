const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories.models");
const Controller = require("../controller");
const { addCategorySchema } = require("../../validators/admin/category.schema");

class CategoryController extends Controller {
    async addCategory(req, res, next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const { title, parent } = req.body;
            const category = await CategoryModel.create({title, parent});
            if(!category) throw createHttpError.InternalServerError('خطای سروری');
            return res.status(200).json({
                error: null,
                data: {
                    category,
                    status: 200,
                    message: 'دسته بندی با موفقیت افزوده شد',
                },
            });
        } catch (error) {
            next(error);
        }
    };

    editCategory(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        }
    };

    async removeCategory(req, res, next){
        try {
            const { id } = req.params;
            const category = await this.findExistCategory(id);
            const deleteResult = await CategoryModel.deleteOne({_id: category.id});
            if(deleteResult.deletedCount === 0) throw createHttpError.InternalServerError('حذف دسته بندی انجام نشد');
            return res.status(202).json({
                error: null,
                data: {
                    status: 202,
                    message: 'حذف دسته بندی با موفقیت انجام شد',
                },
            })
        } catch (error) {
            next(error);
        }
    };

    async getAllCategory(req, res, next){
        try {
            const category = await CategoryModel.aggregate([
                {
                    $lookup: {
                        as: 'children',
                        from: 'categories',
                        localField: '_id',
                        foreignField: 'parent',
                    },
                },
                {
                    $project: {
                        __v: 0,
                        'children.__v': 0,
                        'children.parent': 0,
                    },
                }
            ]);
            return res.status(200).json({
                error: null,
                data: { status: 200, category },
            })
            
        } catch (error) {
            next(error);
        }
    };
    
    getCategoryById(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        }
    };

    async getAllParents(req, res, next){
        try {
            const parents = await CategoryModel.find({parent: null}, {__v: 0, parent: 0});
            return res.status(200).json({
                error: null,
                data: {
                    status: 200,
                    parents,
                },
            })
        } catch (error) {
            next(error);
        }
    };

    async getchildrenOfParents(req, res, next){
        try {
            const { parent } = req.params;
            const children = await CategoryModel.find({parent}, {__v: 0});
            return res.status(200).json({
                error: null,
                data: {
                    status: 200,
                    children,
                },
            })
        } catch (error) {
            next(error);
        }
    };

    async findExistCategory(id){
        const result = await CategoryModel.findById(id);
        if(!result) throw createHttpError.NotFound('دسته بندی یافت نشد');
        return result
    };

};

module.exports ={
    CategoryController: new CategoryController()
};