const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories.models");
const Controller = require("../controller");
const { addCategorySchema, updateCategorySchema } = require("../../validators/admin/category.schema");
const { default: mongoose } = require("mongoose");
const { StatusCodes } = require("http-status-codes");

class CategoryController extends Controller {

    async addCategory(req, res, next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const { title, parent } = req.body;
            const category = await CategoryModel.create({title, parent});
            if(!category) throw createHttpError.InternalServerError('خطای سروری');
            return res.status(StatusCodes.CREATED).json({
                error: null,
                data: {
                    status: StatusCodes.CREATED,
                    message: 'دسته بندی با موفقیت افزوده شد',
                },
            });
        } catch (error) {
            next(error);
        }
    };

    async updateCategory(req, res, next){
        try {
            const { id } = req.params;   
            const { title } = req.body;
            const category = await this.findExistCategory(id);
            await updateCategorySchema.validateAsync(req.body);
            if(!category) throw createHttpError.NotFound('دسته بندی مورد نظر یافت نشد');
            const resultOfUpdate = await CategoryModel.updateOne({_id: category._id}, {$set: {title}});
            if(resultOfUpdate.modifiedCount === 0) throw createHttpError.InternalServerError('به روز رسانی دسته بندی انجام نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                data: {
                    status: StatusCodes.OK,
                    message: 'دسته بندی با موفقیت به روز رسانی شد',
                    category: resultOfUpdate,
                }
            });
        } catch (error) {
            next(error);
        }
    };

    async removeCategory(req, res, next){
        try {
            const { id } = req.params;
            const category = await this.findExistCategory(id);
            const deleteResult = await CategoryModel.deleteMany({
                $or: [
                    {_id: category._id},
                    {parent: category._id}
                ]
            });
            if(deleteResult.deletedCount === 0) throw createHttpError.InternalServerError('حذف دسته بندی انجام نشد');
            return res.status(StatusCodes.OK).json({
                error: null,
                data: {
                    status: StatusCodes.OK,
                    message: 'حذف دسته بندی با موفقیت انجام شد',
                },
            })
        } catch (error) {
            next(error);
        }
    };

    async getAllCategory(req, res, next){
        try {
            // const category = await CategoryModel.aggregate([
            //     {
            //         $graphLookup: {
            //             as: 'children',
            //             from: 'categories',
            //             maxDepth: 5,
            //             startWith: '$_id',
            //             depthField: 'depth',
            //             connectToField: 'parent',
            //             connectFromField: '_id',

            //         },
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             'children.__v': 0,
            //             'children.parent': 0,
            //         },
            //     },
            //     {
            //         $match: {
            //             parent: null || undefined,
            //         }
            //     }
            // ]);
            const categories = await CategoryModel.find({parent: undefined}, {__v: 0});
            return res.status(StatusCodes.OK).json({
                error: null,
                data: { status: StatusCodes.OK, categories },
            })
            
        } catch (error) {
            next(error);
        }
    };
    
    async getCategoryById(req, res, next){
        try {
            const { id } = req.params;
            const category = await CategoryModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id),
                    }
                },
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
                },
            ]);
            return res.status(StatusCodes.OK).json({
                error: null,
                data: { 
                    status: StatusCodes.OK, 
                    category,
                },
            })
        } catch (error) {
            next(error);
        }
    };

    async getAllParents(req, res, next){
        try {
            const parents = await CategoryModel.find({parent: null}, {__v: 0, parent: 0});
            return res.status(StatusCodes.OK).json({
                error: null,
                data: {
                    status: StatusCodes.OK,
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
            return res.status(StatusCodes.OK).json({
                error: null,
                data: {
                    status: StatusCodes.OK,
                    children,
                },
            })
        } catch (error) {
            next(error);
        }
    };

    async getAllCategoriesWithoutPopulate(req, res, next){
        try {
            const categories = await CategoryModel.aggregate([
                {
                    $match: {}
                }
            ]);
            if(!categories) throw createHttpError.InternalServerError('مشکل سروری به وجود آمده است'); 
            return res.status(StatusCodes.OK).json({
                error: null,
                data: {
                    status: StatusCodes.OK,
                    categories,
                }
            })
        } catch (error) {
            next(error);
        };
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