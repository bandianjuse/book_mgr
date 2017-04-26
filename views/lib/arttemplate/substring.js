template.helper('substring', function (string, char) {
    var strLen = string.length;
    var newStr = "";
    if(strLen > char){
        newStr = string.substring(0,char) + "...";
    }else{
        newStr = string;
    }

    return newStr;
});