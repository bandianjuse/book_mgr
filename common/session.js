/*
 * session配置模块
 */


var session = require('express-session');

module.exports = function(){
    return session({
        secret: 'wtoip_book',
        cookie: {maxAge: 3600000 },  //一小时失效
        resave: false,
        saveUninitialized: true
    })
};

