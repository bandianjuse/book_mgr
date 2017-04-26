$(function(){
    var cp = new Components(); //组件
    $("#editUserSubmit").on("click",function(){
        if($("#initPassword").val() === ""){
            $("#initPassword").focus();
            cp.alert({
                content : "原始密码不能为空！"
            });
            return false;
        }
        if($("#editPassword").val() === ""){
            $("#editPassword").focus();
            cp.alert({
                content : "新密码不能为空！"
            });
            return false;
        }
        if($("#editPassword2").val() === ""){
            $("#editPassword2").focus();
            cp.alert({
                content : "确认密码不能为空！"
            });
            return false;
        }
        if($("#editPassword").val() !== $("#editPassword2").val()){
            $("#editPassword2").focus();
            cp.alert({
                content : "新密码与确认密码不一致！"
            });
            return false;
        }
        updateUser();
    });

    function updateUser(){
        $.ajax({
            url : "/updateUser",
            type : "post",
            dataType : "json",
            data:{
                initPassword : $("#initPassword").val(),
                newPassword : $("#editPassword").val()
            },
            beforeSend : function(XMLHttpRequest){
                cp.loading("opne");
            },
            success : function(data){
                cp.loading("close");
                if(data.code === 1){
                    $("#editUserModal").modal("hide");
                    cp.alert({
                        type: "alert-success",
                        content : "修改成功！"
                    });
                }else{
                    cp.alert({
                        content : "原始密码错误！"
                    });
                }
            }
        })
    }
});