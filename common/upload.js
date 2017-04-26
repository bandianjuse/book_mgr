/*
 * 图片上传模块
 */

var express = require('express');
var multipart = require('connect-multiparty');
/*var User  = require('../app/models/user.server.model');*/
var fs = require('fs');
var config = require('../config');
var app = express();

var GetDate = function(){
    var myDate = new Date();
    var year = myDate.getFullYear().toString();
    var month = myDate.getMonth().toString();
    var date = myDate.getDate().toString();
    var hours = myDate.getHours().toString();
    var minutes = myDate.getMinutes().toString();
    var milliseconds = myDate.getMilliseconds().toString();
    return year + month + date + hours + minutes + milliseconds;
};

module.exports  = function(){
    app.post('/upload', multipart(), function (req, res) {
        var id = req.session.user._id;
        var files = req.files.upload;//文件请求
        console.log(files);
        if(files){
            var path = config.uploadPath + id;//存放路径
            var url =  config.uploadUrl + id;//相对路径
            var filename = files.originalFilename;
            
            var suffix = filename.substring(filename.lastIndexOf("."), filename.length);
            var newFilename = GetDate() + suffix;
            var targetPath = path + '/' + newFilename;
            var newPath = url + '/' + newFilename;

            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
            fs.createReadStream(files.path).pipe(fs.createWriteStream(targetPath));//将文件从临时文件已到文件夹
            res.json({core: 0, path: newPath});
        }else{
            res.json({core: 1});
        }
    });
    return app;
};

