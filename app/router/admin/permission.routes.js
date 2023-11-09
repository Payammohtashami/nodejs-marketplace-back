const { PermissionController } = require('../../http/controllers/admin/RBAC/permission.controller');

const router = require('express').Router();


router.get('/list', PermissionController.getAllPermossions)
router.post('/add', PermissionController.createPermission)
router.delete('/remove/:id', PermissionController.removePermission);
router.patch('/update/:id', PermissionController.updatePermissionById);

module.exports = { permissionRoutes: router };