/*管理员借阅历史控制器*/

var booksStock = require('../models/booksStock');

module.exports = {
  update : function(req, res) {
      var query = {
          book_id : req.body.book_id,
          book_title : req.body.book_title,
          book_count : req.body.book_count
      };
      var bookid = req.body.book_id;

      booksStock.stockDetails(bookid,function(results){
          if(results){
              booksStock.updateStock(query,function(results){
                  if(results){
                      res.json({code : 1})
                  }
              })
          }else{
              booksStock.insertStock(query,function(results){
                  if(results){
                      res.json({code : 1})
                  }
              })
          }
      })

  }
};
