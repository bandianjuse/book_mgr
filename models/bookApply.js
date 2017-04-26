/*图书采购申请数据模型*/

var query = require('../common/mysql.js');

module.exports = {
    insertApply : function(options,callback){
        var sql =
            "insert into book_apply(" +
            "user_id," +
            "user_name," +
            "user_dept," +
            "book_id," +
            "book_title," +
            "book_count," +
            "apply_time," +
            "apply_status"+
            ")" +
            "values(" +
            "'" + options.user_id + "'," +
            "'" + options.user_name + "'," +
            "'" + options.user_dept + "'," +
            "'" + options.book_id + "'," +
            "'" + options.book_title + "'," +
            "'" + options.book_count + "'," +
            "now()," +
            "'0'" +
            ")";
        query(sql,function(err,rows,fields){
            callback(rows);
        })

    },
    applyDetails : function(options,callback){
        var sql = "select * from book_apply where user_id = '" + options.user_id + "' and book_id = '" + options.book_id + "'";

        query(sql,function(err,rows,fields){
            if(rows){
                callback(rows);
            }else{
                console.log(err)
            }
        });
    },
    applyList : function(userId,callback){
        var sql = "select * from book_apply where user_id = '" + userId + "' order by id desc limit 0,10";

        query(sql,function(err,rows,fields){
            if(rows){
                callback(rows);
            }else{
                console.log(err)
            }
        });
    },
    adminBookApply : function(options,callback){
        var page = options.page;
        var limit = options.limit;
        var sql = "select * from book_apply order by id desc ";

        query(sql,function(err,rows,fields){
            if(rows){
                var count = rows.length; //总记录数
                var total = count % limit ? parseInt(count / limit) + 1 : parseInt(count / limit); //总页数
                var sql2 = "select * from book_apply order by id desc  limit " + limit * (page - 1) + "," + limit ;
                query(sql2,function(err,rows,fields){
                    callback(rows,count);
                })
            }else{
                console.log(err)
            }

        });
    },
    adminUpdateBookApply  : function(options,callback){
        var sql = "update book_apply set apply_status = '" + options.status + "'  where id = '" + options.id + "';";

        if(options.status == 1){
            var sql2 = "update book_stock set book_count = book_count + " + options.num + ",book_stock = book_stock + " + options.num + " where book_id = '"+ options.book_id +"';";
            query(sql,function(err,rows,fields){
                if(rows){
                    query(sql2,function(err,rows,fields){
                        callback(rows);
                    });
                }
            });
        }else{
            query(sql,function(err,rows,fields){
                callback(rows);
            });
        }


    }
};
