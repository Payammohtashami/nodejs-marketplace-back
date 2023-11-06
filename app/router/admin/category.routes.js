const router = require('express').Router();
const { CategoryController } = require('../../http/controllers/admin/category.controller');

router.post('/add', CategoryController.addCategory);
router.get('/all', CategoryController.getAllCategory);
router.get('/list-of-all', CategoryController.getAllCategoriesWithoutPopulate);
router.get('/parents', CategoryController.getAllParents);
router.get('/children/:parent', CategoryController.getchildrenOfParents);
router.delete('/remove/:id', CategoryController.removeCategory);
router.patch('/update/:id', CategoryController.updateCategory);
router.get('/:id', CategoryController.getCategoryById);

module.exports = { categoryRoutes: router };