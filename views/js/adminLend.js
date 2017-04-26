$(function(){
    /*组件*/
    var cp = new Components();

    /*获取页数值*/
    //var sPage = sessionStorage.getItem("sPage");

    /*每页显示记录数*/
    var limit = 10;

    /*页数*/
    var page = 1;

    /*session存储的页数值不为空则取其值*/
    //if(sPage != "null" && sPage != null) page = sPage;

    var query = {
        page : page,
        limit : limit
    };
    lendList(query);

    $(document).on("click","#refused",function(){
        var id = $(this).data("id");
        var bookId = $(this).data("bookid");
        lendUpdate(id,bookId,3);
    });

    $(document).on("click","#agreed",function(){
        var id = $(this).data("id");
        var bookId = $(this).data("bookid");
        lendUpdate(id,bookId,1);
    });

    $(document).on("click","#comeBack",function(){
        var id = $(this).data("id");
        var bookId = $(this).data("bookid");
        lendUpdate(id,bookId,2);
    });

    function lendList(query){
        //sPage = sessionStorage.setItem("sPage",query.page);
        $.ajax({
            url : "/admin/lendHistory",
            type : "post",
            dataType : "json",
            data:query,
            beforeSend : function(XMLHttpRequest){
                cp.loading("opne");
            },
            success : function(data){
                cp.loading("close");
                if(data.code === 1){
                    var list = data.data;

                    var listData = {
                        list : list
                    };

                    var html = template('listData', listData);
                    $('#results').html(html);

                    if(list.length){
                        $("#page").show();
                        if($("#page").html() != "") return;

                        var page = new Page({
                            id : "#page", //分页节点id
                            count : data.count, //总记录数
                            limit : limit //每页显示记录数
                        });
                        $("#page").find("li").on("click",function(){
                            var nowPage = page.getNowPage();
                            query.page = nowPage;
                            lendList(query);
                        });
                    }else{
                        $("#page").hide();
                    }

                }else{
                    cp.alert({
                        content : "服务器异常！"
                    });
                }
            }
        })
    }

    function lendUpdate(id,bookId,status){
        //sPage = sessionStorage.setItem("sPage",query.page);
        $.ajax({
            url : "/admin/lendUpdate",
            type : "post",
            dataType : "json",
            data:{
                status : status,
                id : id,
                book_id : bookId
            },
            beforeSend : function(XMLHttpRequest){
                cp.loading("opne");
            },
            success : function(data){
                cp.loading("close");
                if(data.code === 1){
                    cp.alert({
                        type : "alert-success",
                        content : "操作成功！"
                    });
                    lendList(query);
                }else{
                    cp.alert({
                        content : "操作失败！"
                    });
                }
            }
        })
    }

});




