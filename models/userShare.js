/*用户数据模型*/

var query = require('../common/mysql.js');

module.exports = {
    shareDetails : function(options,callback){
        var sql = "select * from user_share where user_id = '" + options.user_id + "' and book_id = '" + options.book_id + "'";

        query(sql,function(err,rows,fields){
            if(rows){
                callback(rows);
            }else{
                console.log(err)
            }
        });
    },
    insertShare : function(options,callback){
        var sql =
            "insert into user_share(" +
            "user_id," +
            "user_name," +
            "book_id," +
            "book_title," +
            "reason," +
            "share_tiem" +
            ")" +
            "values(" +
            "'" + options.user_id + "'," +
            "'" + options.user_name + "'," +
            "'" + options.book_id + "'," +
            "'" + options.book_title + "'," +
            "'" + options.reason + "'," +
            "now()" +
            ")";

        query(sql,function(err,rows,fields){
            callback(rows);
        })
    },
    shareList : function(bookId,callback){
        var sql = "select * from user_share where book_id = '" + bookId + "' order by id desc limit 0,8";

        query(sql,function(err,rows,fields){
            if(rows){
                callback(rows);
            }else{
                console.log(err)
            }
        });
    },
    myShareList : function(userId,callback){
        var sql = "select * from user_share where user_id = '" + userId + "' order by id desc limit 0,10";

        query(sql,function(err,rows,fields){
            if(rows){
                callback(rows);
            }else{
                console.log(err)
            }
        });
    },
    indexShare : function(callback){
        var sql = "select distinct u.book_id,u.book_title,b.image from user_share u ,book b where b.id = u.book_id  GROUP BY u.book_id ORDER BY u.id desc limit 16";

        query(sql,function(err,rows,fields){
            callback(rows);
        })
    },
    indexRecommend : function(callback){
        var sql = "select * from book where book_state = 1 ORDER BY id DESC limit 16";

        query(sql,function(err,rows,fields){
            callback(rows);
        })
    },
    countShare : function(callback){
        var sql = "select * from user_share";

        query(sql,function(err,rows,fields){
            callback(rows.length);
        })
    },
};