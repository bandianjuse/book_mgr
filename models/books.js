/*图书采详情数据模型*/

var query = require('../common/mysql.js');

module.exports = {
    booksList : function(options,callback){
        var param = options.param;
        var page = options.page;
        var limit = options.limit;
        var sql = "select * from book where isbn10 = '" + param + "' or isbn13 = '" + param + "' or author like '%" + param + "%'  or title like  '%" + param + "%'";

        query(sql,function(err,rows,fields){
            if(rows){
                var count = rows.length; //总记录数
                var total = count % limit ? parseInt(count / limit) + 1 : parseInt(count / limit); //总页数
                var sql2 = "select * from book where isbn10 = '" + param + "' or isbn13 = '" + param + "' or author like '%" + param + "%'  or title like '%" + param + "%' limit " + limit * (page - 1) + "," + limit ;
                query(sql2,function(err,rows,fields){
                    callback(rows,count);
                })
            }else{
                console.log(err)
            }

        });
    },
    insertBook : function(options,callback){
        var sql =
            "insert into book(" +
            "isbn10," +
            "title," +
            "alt_title," +
            "subtitle," +
            "url," +
            "alt," +
            "image," +
            "author," +
            "translator," +
            "publisher," +
            "pubdate," +
            "binding," +
            "price," +
            "pages," +
            "author_intro," +
            "summary," +
            "catalog," +
            "isbn13," +
            "images," +
            "series," +
            "tags" +
            ")" +
            "values(" +
            "'" + options.isbn10 + "'," +
            "'" + options.title + "'," +
            "'" + options.alt_title + "'," +
            "'" + options.subtitle + "'," +
            "'" + options.url + "'," +
            "'" + options.alt + "'," +
            "'" + options.image + "'," +
            "'" + options.author + "'," +
            "'" + options.translator + "'," +
            "'" + options.publisher + "'," +
            "'" + options.pubdate + "'," +
            "'" + options.binding + "'," +
            "'" + options.price + "'," +
            "'" + options.pages + "'," +
            "'" + options.author_intro + "'," +
            "'" + options.summary + "'," +
            "'" + options.catalog + "'," +
            "'" + options.isbn13 + "'," +
            "'" + options.images + "'," +
            "'" + options.series + "'," +
            "'" + options.tags + "'" +
            ")";

        query(sql,function(err,rows,fields){
            callback(rows);
        })

    },
    bookDetails : function(id,callback){
        var sql = "select * from book where id = '" + id + "'";

        query(sql,function(err,rows,fields){
            if(rows){
                callback(rows[0]);
            }else{
                console.log(err)
            }
        });
    }
};
