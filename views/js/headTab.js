/*顶部菜单高亮效果*/

$(function(){
    var num = $("html").attr("tab");
    $("#headMenu").find("a").removeClass("active").eq(num).addClass("active");
});
