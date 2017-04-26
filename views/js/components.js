/**
 * 基础组件 Components （基于Bootstrap）
 *********************************************
 * alert(params) 提示窗
 * 可选参数 params[object] ：
 * content [string] 提示内容  "您的操作有误！"（默认）
 * type [string]  窗体样式   "alert-danger"（默认） 、 "alert-success"、 "alert-info" 、"alert-warning"
 * time [number]  自动关闭时间  3000（默认）
 *********************************************
 * loading(param,time) 加载提示
 * 必选参数 param[string],
 * opne 打开加载提示
 * close 关闭加载提示
 * 可选参数 time[number],
 * 超时时间，默认为10000毫秒
 * ********************************************
 * confirm(params) 确认框
 * 可选参数 params[object] ：
 * content [string] 提示内容  "您确定要删除吗?"（默认）
 * onCancel [function] 取消触发事件
 * onConfirm [function] 确认触发事件
 * ********************************************
 * */
function Components(){}
Components.prototype = {
    alert : function(params){
        var items = {
            content : "系统提示内容",
            type : "alert-danger", //alert-success || alert-info || alert-warning
            time : 3000
        };
        if(typeof params === "object"){
            for(var item in items){
                if(typeof params[item] !== "undefined"){
                    items[item] = params[item];
                }
            }
        }
        var html =
            '<div class="alert '+items['type']+' alert-dismissible fade in" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '<span class="sr-only">Close</span>' +
            '</button>' +
            items['content'] +
            '</div>';
        if($(".alert").length) return;
        $(html).appendTo("body");
        setTimeout(function(){
            $(".alert").alert('close')
        },items['time']);
    },
    loading : function(param,time){
        var time = time || 10000;
        function opne(){
            var loadingHtml = '<div class="loading"><div class="icon"><i class="iconfont">&#xe600;</i></div><div class="text">正在努力加载</div></div>';
            var layerHtml = '<div class="layer"></div>';

            if($(".loading").length) return;

            $(loadingHtml).appendTo("body").css({
                'left' : ($(document).width() - $(".loading").width()) / 2,
                'top' : ($(document).height() - $(".loading").height()) / 2,
            });
            $(layerHtml).appendTo("body").css({
                'width' : $(document).width(),
                'height' : $(document).height()
            })
        }
        function close(){
            $(".loading").remove();
            $(".layer").remove();
        }
        setTimeout(function(){
            close();
        },time);

        if(param === "opne") return opne();
        if(param === "close") return close();


    },
    confirm : function(params){
        var items = {
            content : "您的操作有误！",
            onCancel : function(){},
            onConfirm : function(){}
        };
        if(typeof params === "object"){
            for(var item in items){
                if(typeof params[item] !== "undefined"){
                    items[item] = params[item];
                }
            }
        }

        var confirmHtml =
            '<div class="modal fade bd-example-modal-sm" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">'+
            '<div class="modal-dialog modal-sm">'+
            '<div class="modal-content">'+
            '<div class="modal-header">'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
            '<span aria-hidden="true">&times;</span>'+
            '<span class="sr-only">Close</span>'+
            '</button>'+
            '<h4 class="modal-title">提示</h4>'+
            '</div>'+
            '<div class="modal-body">'+
            items['content']+
            '</div>'+
            '<div class="modal-footer">'+
            '<button type="button" class="btn btn-secondary" data-dismiss="modal" id="onCancel">否</button>'+
            '<button type="button" class="btn btn-primary" data-dismiss="modal" id="onConfirm">是</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';

        if(!$("#confirmModal").length){
            $(confirmHtml).appendTo("body");
        }
        $("#confirmModal").modal("show");
        $("#onConfirm").unbind("click").on("click",items['onConfirm']);
        $("#onCancel").unbind("click").on("click",items['onCancel']);


    }
};
