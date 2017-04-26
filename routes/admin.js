var express = require('express');
var router = express.Router();
var views = require('../controllers/views');
var adminLendHistory = require('../controllers/adminLendHistory');
var adminProcurement = require('../controllers/adminProcurement');
var adminIventory = require('../controllers/adminIventory');

/*模板视图路由*/
router.get('/', views.admin);
router.get('/procurement', views.adminProcurement);
router.get('/addInventory', views.adminAddInventory);

/*管理员借阅历史接口*/
router.post('/lendHistory', adminLendHistory.list);

/*管理员借阅历史状态更改*/
router.post('/lendUpdate', adminLendHistory.update);

/*管理员申请采购接口*/
router.post('/procurementList', adminProcurement.list);
router.post('/procurementUpdate', adminProcurement.update);

router.post('/bookIventory', adminIventory.update);

module.exports = router;
