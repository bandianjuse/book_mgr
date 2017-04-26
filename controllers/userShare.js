/*图书分享控制器*/

var userShare = require('../models/userShare');

module.exports = function(req, res) {
    var query = {
        user_id : req.session.user.id,
        user_name : req.session.user.username,
        book_id : req.body.book_id,
        book_title : req.body.book_title,
        reason : req.body.reason
    };
    userShare.shareDetails(query,function(details){
        if(details){
            if(details.length){
                res.json({code : 0});
            }else{
                userShare.insertShare(query,function(results){
                    if(results){
                        res.json({code : 1});
                    }
                })
            }
        }

    });


};
