/*退出登录*/

$(function(){
    $("#logout").on("click",function(){
        logout();
    });

    function logout(){
        $.ajax({
            url : "/logout",
            type : "post",
            dataType : "json",
            success : function(data){
                if(data.code === 1){
                    window.location.href = "/login";
                }
            }
        })
    }
});
