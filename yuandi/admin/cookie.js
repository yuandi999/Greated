

// 设置cookie
function setCookie(cookieName,cookieValue, date, path){  //path为有效时间，过期为path=-1；
   // 包装数据
   var data = {
       "val" : cookieValue
   }
   // 编码
   var str =  cookieName+"="+encodeURIComponent(JSON.stringify(data));  // JSON.stringify将对象、数组转换成字符串
   // 过期时间
   if( date ){
       var dt = new Date();
       dt.setDate(dt.getDate()+date);
       str +=  ";expires="+dt.toGMTString(); //toGMTString  把 Date 对象转换为字符串，并返回结果
   }
   // path属性
   if( path ){
       str += ";path="+path;
   }
   // 设置cookie
   document.cookie = str;
}
// 获取cookie
function getCookie(cookieName){
   var str =  decodeURIComponent(document.cookie);//str="b={"val":2}; c=3; a=1"
   var arr = str.split(";  ");//arr=["b=2","c=3","a=1"]
   for( var i=0,len=arr.length; i<len;  i++ ){
       var tmp = arr[i];// 当i=0时，tmp="b={"val":2}"
       var ind = tmp.indexOf("=");
       var _name = tmp.substring(0, ind);
       var _value = tmp.substring(ind+1);
       if( cookieName==_name ){
          return JSON.parse(_value).val;  //JSON.parse 将字符串转成json对象
       }
   }
}
