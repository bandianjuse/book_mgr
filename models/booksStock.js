/*图书库存数据模型*/

var query = require('../common/mysql.js');

module.exports = {
    insertStock : function(options,callback){
        var sql =
            "insert into book_stock(" +
            "book_id," +
            "book_title," +
            "book_count," +
            "book_lend_count," +
            "book_stock" +
            ")" +
            "values(" +
            "'" + options.book_id + "'," +
            "'" + options.book_title + "'," +
            "'" + options.book_count + "'," +
            "'0'," +
            "'0'" +
            ")";

        query(sql,function(err,rows,fields){
            callback(rows);
        })

    },
    stockDetails : function(bookId,callback){
        var sql = "select * from book_stock where book_id = '" + bookId + "'";

        query(sql,function(err,rows,fields){
            if(rows.length){
                callback(rows[0]);
            }else{
                console.log(err)
            }
        });
    },
    updateStock : function(options,callback){
        var sql = "update book_stock set book_count = book_count + " + options.book_count + ",book_stock = book_stock + " + options.book_count + "  where book_id = '" + options.book_id + "'";

        query(sql,function(err,rows,fields){
            callback(rows);
        })

    },
    countStock : function(callback){
        var sql = "select sum(book_count) book_count , sum(book_lend_count) book_lend_count,sum(book_stock) book_stock from book_stock;";

        query(sql,function(err,rows,fields){
            callback(rows[0]);
        })

    }
};
