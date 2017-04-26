/*图书借阅数据模型*/

var query = require('../common/mysql.js');

module.exports = {
    insertLend : function(options,callback){
        var sql =
            "insert into book_lend_history(" +
            "user_id," +
            "user_name," +
            "book_id," +
            "book_title," +
            "lend_time," +
            "book_status" +
            ")" +
            "values(" +
            "'" + options.user_id + "'," +
            "'" + options.user_name + "'," +
            "'" + options.book_id + "'," +
            "'" + options.book_title + "'," +
            "now()," +
            "'0'" +
            ")";


        query(sql,function(err,rows,fields){
            callback(rows);
        })

    },
    lendHistory : function(bookId,callback){
        var sql = "select * from book_lend_history where book_id = '" + bookId + "' and book_status != '0'";
        query(sql,function(err,rows,fields){
            callback(rows);
        });
    },
    lendDetails : function(options,callback){
        var sql = "select * from book_lend_history where book_id = '" + options.book_id + "' and user_id = '" + options.user_id + "'";
        query(sql,function(err,rows,fields){
            callback(rows);
        });
    },
    lendList : function(userId,callback){
        var sql = "select * from book_lend_history where user_id = '" + userId + "'  order by id desc  limit 0,10";
        query(sql,function(err,rows,fields){
            callback(rows);
        });
    },
    adminLendHistory : function(options,callback){
        var page = options.page;
        var limit = options.limit;
        var sql = "select * from book_lend_history order by id desc ";

        query(sql,function(err,rows,fields){
            if(rows){
                var count = rows.length; //总记录数
                var total = count % limit ? parseInt(count / limit) + 1 : parseInt(count / limit); //总页数
                var sql2 = "select * from book_lend_history order by id desc  limit " + limit * (page - 1) + "," + limit ;
                query(sql2,function(err,rows,fields){
                    callback(rows,count);
                })
            }else{
                console.log(err)
            }

        });
    },
    adminUpdateLend  : function(options,callback){
        var sql = "update book_lend_history set book_status = '" + options.status + "'  where id = '" + options.id + "'";
        var sql2 = "update book_stock set book_lend_count = book_lend_count + 1,book_stock = book_stock -1  where book_id = '" + options.book_id + "'";
        if(options.status == 2){
            sql = "update book_lend_history set book_status = '" + options.status + "' , revert_time = now() where id = '" + options.id + "'";
            sql2 = "update book_stock set book_lend_count = book_lend_count - 1,book_stock = book_stock + 1  where book_id = '" + options.book_id + "'";
        }

        if(options.status == 3 ){
            query(sql,function(err,rows,fields){
                callback(rows);
            });
        }else{
            query(sql,function(err,rows,fields){
                if(rows){
                    query(sql2,function(err,rows,fields){
                        callback(rows);
                    });
                }
            });
        }
    }
};
