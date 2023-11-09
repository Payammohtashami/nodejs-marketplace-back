const { RoleController } = require('../../http/controllers/admin/RBAC/role.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');

const router = require('express').Router();

router.get('/list', RoleController.getAllRoles);
router.post('/add', RoleController.createRole);
router.patch('/update/:id', RoleController.updateRoleById);
router.delete('/remove/:field', stringToArray('permissions'), RoleController.removeRole);

module.exports = { roleRoutes: router };