/*图书借阅控制器*/

var bookLendHistory = require('../models/bookLendHistory');

module.exports = function(req, res) {
    var query = {
        user_id : req.session.user.id,
        book_id : req.body.book_id
    };

    bookLendHistory.lendDetails(query,function(results){
        if(results){
            if(results.length){
                res.json({code : 0});
            }else{
                var query2 = {
                    user_id : req.session.user.id,
                    user_name : req.session.user.username,
                    book_id : req.body.book_id,
                    book_title : req.body.book_title
                };
                bookLendHistory.insertLend(query2,function(results2){
                    if(results2){
                        res.json({code : 1,data : results2}); //查询到结果
                    }

                })
            }

        }

    })


};
