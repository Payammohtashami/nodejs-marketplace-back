const path = require('path');
const omitEmpty = require('omit-empty');
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { StatusCodes } =require('http-status-codes');
const { ProductsModel } = require("../../../../models/products.models");
const { addProductsSchema } = require("../../../validators/admin/products.schema");
const { ObjectIdValidator } = require('../../../validators/public.validators');
const { listOfImagesFromRequest, copyObject, deleteFileInPublic, deleteBlockedItems } = require('../../../../utils/functions');

class ProductController extends Controller {
    async addProduct(req, res, next){
        try {
            const images = listOfImagesFromRequest(req.files ?? [], req.body.fileUploadPath);
            const {title, subtitle, description, tags, category, price, discount = 0, avaliable_counts, height, width, weight, length } = req.body;
            const auther = req.user._id;
            let features = {
                height: +height ?? 0,
                width: +width ?? 0,
                weight: +weight ?? 0,
                length: +length ?? 0,
            };
            let type = 'phisical';
            if(!!height || !!width || !!length || !!weight) type = 'virtual';
            req.body.type = type;
            await addProductsSchema.validateAsync(req.body);
            const products = await ProductsModel.create({auther, title, subtitle, description, images, tags, category, features, type, discount, price, avaliable_counts});
            if(!products) throw createHttpError.InternalServerError('ثبت محصول انجام نشد');
            return res.status(StatusCodes.CREATED).json({
                error: null,
                status: StatusCodes.CREATED,
                data: {
                    message: 'محصول مورد نظر با موفقیت ایجاد شد',
                    product: products,
                },
            })
        } catch (error) {
            deleteFileInPublic(path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/g, '/'))
            next(error);
        }
    };
    
    async updateProduct(req, res, next){
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            const data = copyObject(omitEmpty(req.body));
            data.images = listOfImagesFromRequest(req.files ?? [], req.body.fileUploadPath);
            const blockListValues = ['width', 'height', 'length', 'weight', 'bookmark', 'like'];
            deleteBlockedItems(data, blockListValues);
            const updateProductResult = await ProductsModel.updateOne({_id: product._id}, {$set: data})
            if(updateProductResult.modifiedCount === 0) throw createHttpError.InternalServerError('به روز رسانی انجام نشد');
            res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    product: updateProductResult,
                    message: 'محصول با موفقیت ویرایش شد',
                },
            })
        } catch (error) {
            next(error);
        };
    };

    async removeProduct(req, res, next){
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            const removedProduct = await ProductsModel.deleteOne({_id: product.id});
            if(removedProduct.deletedCount === 0) throw createHttpError.InternalServerError('محصول مورد نظر حذف نشد');

            res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    message: 'حذف محصول با موفقیت انجام شد',
                },
            });
        } catch (error) {
            next(error);
        }
    };

    async getAllProducts(req, res, next){
        try {
            const { search } = copyObject(req.query);
            const databaseQuery = {};
            if(!!search) databaseQuery['$text'] = {$search: search};
            const products = await ProductsModel.find(databaseQuery);
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data:{
                    products,
                },
            })
        } catch (error) {
            next(error);
        }
    };

    async getOneProduct(req, res, next){
        try {
            const { id } = req.params;
            const product = await this.findProductById(id);
            return res.status(StatusCodes.OK).json({
                error: null,
                status: StatusCodes.OK,
                data: {
                    product,
                }
            });
        } catch (error) {
            next(error);
        }
    };

    async findProductById(productId){
        const { id } = await ObjectIdValidator.validateAsync({id: productId});
        const product = await ProductsModel.findById(id);
        if(!product) throw createHttpError.NotFound('محصول مورد نظر یافت نشد');
        return product;
    };
};

module.exports = {
    ProductController: new ProductController(),
};