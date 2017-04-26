var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var logger = require('./common/logger');
var interceptor = require('./common/interceptor');
var session = require('./common/session');
var upload = require('./common/upload');
var main = require('./routes/main');
var admin = require('./routes/admin');
var app = express();

// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));

//设置使用ejs模板引擎
app.set('view engine', 'ejs');

//设置成生产环境
/*app.set('env', 'production');*/

//加载处理json数据中间件
app.use(bodyParser.json());

//加载日志处理中间件
app.use(logger());

//设置 Session
app.use(session());

//设置 图片上传
app.use(upload());

//加载UTF-8的编码的数据中间件
app.use(bodyParser.urlencoded({extended: false }));

//设置 Cookie
app.use(cookieParser());

//设置静态资源路径
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'uploads')));

//加载路由拦截器中间件
app.use('^/',interceptor());

//加载api
/*app.use('/api', api);*/

//加载pc端路由
app.use('/', main);

// 加载后台路由
app.use('/admin', admin);


//统一处理出错的情况404
app.use(function(req, res, next) {
  var err = new Error('没有找到文件');
  err.status = 404;
  next(err);
});

//开发环境错误处理
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//生产环境错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//运行服务
app.listen(config.port, function(){
  console.log('服务正常运行中，端口号：', config.port);
});
