/*用户数据模型*/

var query = require('../common/mysql.js');

module.exports = {
    userLogin : function(options,callback){
        var sql = "select * from user where username = '" + options.username + "' and password = '" + options.password + "'";
        query(sql,function(err,rows,fields){
            callback(rows);
        });
    },
    updateUser : function(options,callback){
        var sql = "update user set password = '" + options.password + "' where id = '" + options.userid + "'";
        query(sql,function(err,rows,fields){
            callback(rows);
        });
    }
};