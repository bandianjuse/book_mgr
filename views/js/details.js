$(function(){
    /*组件*/
    var cp = new Components();

    /*申请采购*/
    $("#applySubmit").on("click",function(){
        if(validCount("#bookCount")){
            return false
        }
        bookApply();


    });

    /*图书入库*/
    $("#iventorySubmit").on("click",function(){
        if(validCount("#iCount")){
            return false
        }
        iventory();

    });

    /*借阅*/
    $("#bookLend").on("click",function(){
        bookLend();
    });

    /*分享*/
    $("#shareSubmit").on("click",function(){
        if($("#shareCont").val() == ""){
            cp.alert({
                content : "分享理由不能为空！"
            });
            return false;
        }

        insertShare();
    });

    function validCount(obj){
        var valid = false;
        if($(obj).val() == ""){
            cp.alert({
                content : "采购数量不能为空！"
            });
            valid =  true;
        }else{
            var re = /^[0-9]*[1-9][0-9]*$/;
            if(!re.test($(obj).val())){
                cp.alert({
                    content : "只能输入正整数！"
                });
                valid = true;
            }
        }
        return valid
    }

    /*申请采购*/
    function bookApply(){
        $.ajax({
            url : "/bookApply",
            type : "post",
            dataType : "json",
            data:{
                book_id : $("#bookId").val(),
                book_title : $("#bookTitle").text(),
                book_count : $("#bookCount").val()
            },
            beforeSend : function(XMLHttpRequest){
                cp.loading("opne");
            },
            success : function(data){
                cp.loading("close");
                if(data.code === 1){
                    $("#procurementModal").modal("hide");
                    cp.alert({
                        type: "alert-success",
                        content : "申请成功！"
                    });
                }else{
                    cp.alert({
                        content : "您已提交过申请！"
                    });
                }
            }
        })
    }

    /*图书入库*/
    function iventory(){
        $.ajax({
            url : "/admin/bookIventory",
            type : "post",
            dataType : "json",
            data:{
                book_id : $("#bookId").val(),
                book_title : $("#bookTitle").text(),
                book_count : $("#iCount").val()
            },
            beforeSend : function(XMLHttpRequest){
                cp.loading("opne");
            },
            success : function(data){
                cp.loading("close");
                if(data.code === 1){
                    $("#iventoryModal").modal("hide");
                    cp.alert({
                        type: "alert-success",
                        content : "入库成功！"
                    });
                }else{
                    cp.alert({
                        content : "入库失败！"
                    });
                }
            }
        })
    }

    /*借阅*/
    function bookLend(){
        $.ajax({
            url : "/bookLend",
            type : "post",
            dataType : "json",
            data:{
                book_id : $("#bookId").val(),
                book_title : $("#bookTitle").text(),
            },
            beforeSend : function(XMLHttpRequest){
                cp.loading("opne");
            },
            success : function(data){
                cp.loading("close");
                if(data.code === 1){
                    $("#procurementModal").modal("hide");
                    cp.alert({
                        type: "alert-success",
                        content : "借阅申请成功，请等待图书管理员审批！"
                    });
                }else{
                    cp.alert({
                        content : "您已提交过借阅申请！"
                    });
                }
            }
        })
    }

    /*分享*/
    function insertShare(){
        $.ajax({
            url : "/insertShare",
            type : "post",
            dataType : "json",
            data:{
                book_id : $("#bookId").val(),
                reason : $("#shareCont").val(),
                book_title : $("#bookTitle").text()
            },
            beforeSend : function(XMLHttpRequest){
                cp.loading("opne");
            },
            success : function(data){
                cp.loading("close");
                if(data.code === 1){
                    $("#shareModal").modal("hide");
                    cp.alert({
                        type: "alert-success",
                        content : "感谢您的分享！"
                    });
                }else{
                    cp.alert({
                        content : "您已提交过分享！"
                    });
                }
            }
        })
    }
});