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

    $("body").on("keyup",function (e) {
        if (e.which == 13){
            search();
        }
    });
    $("#searchSubmit").on("click",function(){
        search();
    });

    function search(){
        if($("#search").val() == ""){
            $("#search").focus();
            cp.alert({
                content : "请输入搜索内容！"
            });
        }else{
            var param = $("#search").val();

            var query = {
                page : page,
                param :param,
                limit : limit
            };
            booksList(query);
        }
    }

    function booksList(query){
        //sPage = sessionStorage.setItem("sPage",query.page);
        $.ajax({
            url : "/booksList",
            type : "post",
            dataType : "json",
            data:query,
            beforeSend : function(XMLHttpRequest){
                cp.loading("opne");
            },
            success : function(data){
                cp.loading("close");
                if(data.code === 1){
                    $(".js_hide").hide();
                    $(".js_show").show();
                    $(".num").html(data.count);

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
                            booksList(query);
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

});




