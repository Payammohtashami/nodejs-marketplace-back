const path = require('path');
const Controller = require("../controller");
const createHttpError = require("http-errors");
const { ProductsModel } = require("../../../models/products.models");
const { addProductsSchema } = require("../../validators/admin/products.schema");

class ProductController extends Controller {
    async addProduct(req, res, next){
        try {
            const productsBody = await addProductsSchema.validateAsync(req.body);
            req.body.image = path.join(productsBody.fileUploadPath, productsBody.filename).replace(/\\/g, '/');
            const {title, subtitle, text, image, tags, category, price, discount, avaliable_counts, height, width, weight, length } = req.body;
            const auther = req.user._id;
            let feture = {
                height: height ?? 0,
                width: width ?? 0,
                weight: weight ?? 0,
                length: length ?? 0,
            };
            let type = 'phisical';
            if(!!height || !!width || !!length || !!weight) type = 'virtual'
            const products = await ProductsModel.create({auther, title, subtitle, text, image, tags, category, feture, type, discount, price, avaliable_counts});
            if(!products) throw createHttpError.InternalServerError('ثبت محصول انجام نشد')
            return res.status(201).json({
                error: null,
                data: {
                    status: 201,
                    message: 'محصول مورد نظر با موفقیت ایجاد شد',
                    product: req.body,
                },
            })
        } catch (error) {
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
};

module.exports = {
    ProductController: new ProductController(),
};