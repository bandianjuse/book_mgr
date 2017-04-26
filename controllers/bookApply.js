/*图书采购申请控制器*/

var request = require('request');

var bookApply = require('../models/bookApply');

module.exports = function(req, res) {
    var query = {
        user_id : req.session.user.id,
        book_id : req.body.book_id
    };

    bookApply.applyDetails(query,function(results){
        if(results){
            if(results.length){
                res.json({code : 0});
            }else{
                var query2 = {
                    user_id : req.session.user.id,
                    user_name : req.session.user.username,
                    user_dept : req.session.user.dept,
                    book_id : req.body.book_id,
                    book_title : req.body.book_title,
                    book_count : req.body.book_count
                };
                bookApply.insertApply(query2,function(results2){
                    if(results2){
                        res.json({code : 1,data : results2}); //查询到结果
                    }

                })
            }

        }

    })


};
