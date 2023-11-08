const router = require('express').Router();
const { uploadFile } = require('../../utils/multer');
const { UserController } = require('../../http/controllers/admin/user/user.controller');
const { storagePathName } = require('../../http/middlewares/storagePathName');

router.get('/all', UserController.getAllUser);
router.get('/update/:id', storagePathName('users'), uploadFile.single('profile_image'), UserController.updateUserProfile);

module.exports = { usersRoutes: router };