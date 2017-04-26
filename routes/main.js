var express = require('express');
var router = express.Router();
var views = require('../controllers/views');
var login = require('../controllers/login');
var booksList = require('../controllers/booksList');
var bookApply = require('../controllers/bookApply');
var bookLend = require('../controllers/bookLend');
var userShare = require('../controllers/userShare');

/*模板视图路由*/
router.get('/', views.index);
router.get('/login', views.login);
router.get('/share', views.share);
router.get('/procurement', views.procurement);
router.get('/user', views.user);
router.get('/details/:item/:id', views.details);


/*登录校验接口*/
router.post('/login', login.loginCheck);

/*退出登录*/
router.post('/logout', login.logout);

/*修改用户信息*/
router.post('/updateUser', login.updateUser);

/*申请采购接口*/
router.post('/bookApply', bookApply);

/*申请借阅接口*/
router.post('/bookLend', bookLend);

/*搜索图书列表接口*/
router.post('/booksList', booksList);

/*分享图书接口*/
router.post('/insertShare', userShare);


module.exports = router;