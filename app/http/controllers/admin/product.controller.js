const path = require('path');
const Controller = require("../controller");
const createHttpError = require("http-errors");
const { ProductsModel } = require("../../../models/products.models");
const { addProductsSchema } = require("../../validators/admin/products.schema");
const { listOfImagesFromRequest } = require('../../../utils/functions');
const { ObjectIdValidator } = require('../../validators/public.validators');

class ProductController extends Controller {
    async addProduct(req, res, next){
        try {
            const images = listOfImagesFromRequest(req.files ?? [], req.body.fileUploadPath);
            await addProductsSchema.validateAsync(req.body);
            const {title, subtitle, description, tags, category, price, discount, avaliable_counts, height, width, weight, length } = req.body;
            const auther = req.user._id;
            let feture = {
                height: height ?? 0,
                width: width ?? 0,
                weight: weight ?? 0,
                length: length ?? 0,
            };
            let type = 'phisical';
            if(!!height || !!width || !!length || !!weight) type = 'virtual'
            const products = await ProductsModel.create({auther, title, subtitle, description, images, tags, category, feture, type, discount, price, avaliable_counts});
            if(!products) throw createHttpError.InternalServerError('ثبت محصول انجام نشد');
            return res.status(201).json({
                error: null,
                data: {
                    status: 201,
                    message: 'محصول مورد نظر با موفقیت ایجاد شد',
                    product: products,
                },
            })
        } catch (error) {
            deleteFileInPublic(path.join(req.body.fileUploadPath, req.body.filename).replace(/\\/g, '/'))
            next(error);
        }
    };
    
    async editProduct(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        }
    };
    async removeProduct(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        }
    };
    async updateProduct(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        }
    };
    async getAllProducts(req, res, next){
        try {
            const products = await ProductsModel.aggregate([
                {
                    $match: {}
                },
                {
                    $project: {
                        __v: 0,
                    }
                },
            ]);
            return res.status(200).json({
                error: null,
                data:{
                    status: 200,
                    products,
                },
            })
        } catch (error) {
            next(error);
        }
    };
    async getOneProduct(req, res, next){
        try {
            
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