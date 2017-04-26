/*管理员借阅历史控制器*/

var bookLendHistory = require('../models/bookLendHistory');

module.exports = {
  list : function(req, res) {

      var query = {
          page : req.body.page,
          limit : parseInt(req.body.limit)
      };

      bookLendHistory.adminLendHistory(query,function(results,count){
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
          book_id : req.body.book_id
      };

      bookLendHistory.adminUpdateLend(query,function(results,count){
          if(results){
              res.json({code : 1});
          }else{
              res.json({code : 0});
          }
      })

  }
};
