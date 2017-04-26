/*图书搜索列表控制器*/

var request = require('request');
var books = require('../models/books');
var booksStock = require('../models/booksStock');

module.exports = function(req, res) {
    var query = {
        param : req.body.param,
        page : req.body.page,
        limit : parseInt(req.body.limit)
    };

    /*豆瓣isbn 接口*/
    var doubanApi = "https://api.douban.com/v2/book/isbn/:"+ req.body.param;

    books.booksList(query,function(results,count){
        if(count){
            if(results){
                res.json({code : 1,data : results,count : count}); //查询到结果
            }else{
                res.json({code : 0}); //出错
            }
        }else{
            request(doubanApi, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var body = JSON.parse(body);
                    var params = {
                        isbn10 : body.isbn10,
                        title : body.title,
                        alt_title :body.alt_title,
                        subtitle : body.subtitle,
                        url : body.url,
                        alt : body.alt,
                        image : body.image,
                        author : body.author,
                        translator : body.translator,
                        publisher : body.publisher,
                        pubdate : body.pubdate,
                        binding : body.binding,
                        price : body.price,
                        pages : body.pages,
                        author_intro : body.author_intro,
                        summary : body.summary,
                        catalog : body.catalog,
                        isbn13 : body.isbn13,
                        images : JSON.stringify(body.images),
                        series :JSON.stringify(body.series),
                        tags : JSON.stringify(body.tags)
                    };


                    books.insertBook(params,function(results){
                        if(results){
                            books.booksList(query,function(bookslist,count){
                                var stockParams = {
                                    book_id : bookslist[0].id,
                                    book_title : bookslist[0].title,
                                    book_count : 0
                                };
                                booksStock.insertStock(stockParams,function(stock){
                                    if(stock){
                                        res.json({code : 1,data : bookslist,count : count}); //查询到结果
                                    }
                                });
                            })
                        }
                    });
                }else{
                    res.json({code : 1,data : [],count : 0})
                }
            })
        }


    })

};
