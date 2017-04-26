/*管理员申请采购控制器*/

var bookApply = require('../models/bookApply');

module.exports = {
    list : function(req, res) {
        var query = {
            page : req.body.page,
            limit : parseInt(req.body.limit)
        };

        bookApply.adminBookApply(query,function(results,count){
            if(results){
                res.json({code : 1,data : results,count : count}); //查询到结果
            }else{
                res.json({code : 0}); //出错
            }
        })

    },
    update : function(req, res) {
        var query = {
            status : req.body.status,
            id : req.body.id,
            book_id : req.body.book_id,
            num : req.body.num
        };

        bookApply.adminUpdateBookApply(query,function(results,count){
            if(results){
                res.json({code : 1});
            }else{
                res.json({code : 0});
            }
        })

    }
};
