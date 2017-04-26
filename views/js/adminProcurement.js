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
    procurementList(query);

    $(document).on("click","#refused",function(){
        var id = $(this).data("id");
        var bookid = $(this).data("bookid");
        var num = $(this).data("num");
        procurementUpdate(id,bookid,num,2)
    });

    $(document).on("click","#agreed",function(){
        var id = $(this).data("id");
        var bookid = $(this).data("bookid");
        var num = $(this).data("num");
        procurementUpdate(id,bookid,num,1)
    });


    function procurementList(query){
        //sPage = sessionStorage.setItem("sPage",query.page);
        $.ajax({
            url : "/admin/procurementList",
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
                            procurementList(query);
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

    function procurementUpdate(id,bookid,num,status){
        //sPage = sessionStorage.setItem("sPage",query.page);
        $.ajax({
            url : "/admin/procurementUpdate",
            type : "post",
            dataType : "json",
            data:{
                status : status,
                id : id,
                book_id : bookid,
                num : num
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
                    procurementList(query);
                }else{
                    cp.alert({
                        content : "操作失败！"
                    });
                }
            }
        })
    }

});




