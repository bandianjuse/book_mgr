/**
 * 分页组件 Page （基于Bootstrap）
 * */

function Page(parem){
    this.id = parem.id;
    this.count = parem.count || 0;
    this.limit = parem.limit || 0;
    this.total = this.count % this.limit ? parseInt(this.count / this.limit) + 1 : parseInt(this.count / this.limit);
    this.nowPage = 1;
    this.init();
}
Page.prototype.init = function(){
    var that = this;
    var total = that.total;
    var pageArr = [];
    for(var i=0;i<total;i++){
        var pageHtml = '<li  class="js-page '+(i == 0 ? "active" : "")+'"><a href="javascript:void(0)">'+ (i+1) +'</a></li>';
        pageArr.push(pageHtml);
    }
    var html =
        '<nav>' +
        '<ul class="pagination pagination-sm">'+
        '<li class="js-first">'+
        '<a href="javascript:void(0)" >'+
        '<span>首页</span>'+
        '</a>'+
        '</li>'+
        '<li class="js-prev">'+
        '<a href="javascript:void(0)" >'+
        '<span>上一页</span>'+
        '</a>'+
        '</li>'+ pageArr.join("")+
        '<li class="js-next">'+
        '<a href="javascript:void(0)">'+
        '<span>下一页</span>'+
        '</a>'+
        '</li>'+
        '<li class="js-last">'+
        '<a href="javascript:void(0)">'+
        '<span aria-hidden="true">尾页</span>'+
        '</a>'+
        '</li>'+
        '</ul>' +
        '</nav>';
    $(that.id).append(html);
    $(that.id).find("li").on("click",function(){
        var nowPage = 1;

        $.each($(".js-page"),function(i,n){
            if($(this).hasClass("active")){
                nowPage = parseInt($(this).text());
            }
        });

        if($(this).hasClass("js-first")){
            nowPage = 1;
        }else if($(this).hasClass("js-prev")){
            if(nowPage > 1){
                nowPage--;
            }
        }else if($(this).hasClass("js-next")){
            if(nowPage < total){
                nowPage++;
            }
        }else if($(this).hasClass("js-last")){
            nowPage = total;
        }else{
            nowPage = parseInt($(this).text());
        }

        $(".js-page").removeClass("active").eq(nowPage-1).addClass("active");
        that.nowPage = nowPage;

    })
};
Page.prototype.getNowPage = function(){
    return  this.nowPage;
};
