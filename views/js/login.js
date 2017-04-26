/*登录验证*/

$(function(){
    var cp = new Components(); //组件

    $("body").keyup(function (e) {
        if (e.which == 13){
            $("#login").trigger("click");
        }
    });

    $("#login").on("click",function(){
        var username = $("#username");
        var password = $("#password");
        var data = {
            username : username.val(),
            password : password.val()
        };
        if(username.val() === ""){
            username.focus();
            cp.alert({
                content : "用户名不能为空！"
            });
            return false;
        }
        if(password.val() === ""){
            password.focus();
            cp.alert({
                content : "密码不能为空！"
            });
            return false;
        }
        validation(data);

    });

    function validation(data){
        $.ajax({
            url : "/login",
            type : "post",
            dataType : "json",
            data:data,
            beforeSend : function(XMLHttpRequest){
                cp.loading("opne");
            },
            success : function(data){
                cp.loading("close");
                if(data.code === 1){
                    window.location.href = "/admin";
                }else if(data.code === 2){
                    window.location.href = "/";
                }else{
                    cp.alert({
                        content : "用户名或密码错误！"
                    });
                }
            }
        })
    }
});
