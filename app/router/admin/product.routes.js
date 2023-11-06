const router = require('express').Router();
const { ProductController } = require('../../http/controllers/admin/product/product.controller');
const { storagePathName } = require('../../http/middlewares/storagePathName');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadFile } = require('../../utils/multer');

router.get('/all', ProductController.getAllProducts);
router.put('/update/:id', storagePathName('products'), uploadFile.array('images', 10), stringToArray('tags'),ProductController.updateProduct);
router.post('/add', storagePathName('products'), uploadFile.array('images', 10), stringToArray('tags'), ProductController.addProduct);
router.delete('/remove/:id', ProductController.removeProduct);
router.get('/:id', ProductController.getOneProduct);

module.exports = { productsRoutes: router };