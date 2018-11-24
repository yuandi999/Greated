/*
一、连接
二、创建Schema对象，并将Schema对象转为model
三、直接调用model进行增删改差

操作文件在mongoose官网
*/

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/yuandi', { useNewUrlParser: true }); //demo数据库名
let db=mongoose.connection;

db.on('error',()=>{
	console.log("连接失败！");
});
db.on('open',function(){
	console.log('连接成功！');
});
db.on('disconnected',function(){
	console.log("数据库断开连接！");
})

//schema对象 （有多少个表就有schema对象）
  // let Schema = mongoose.Schema;
  // let userSchema=new Schema({
  // 	uname1:{type:String,required:true}, //type字段类型   required必填
  // 	pass1:{type:String,required:true},
  // 	email1:{type:String}
  // })
//抛出，变成数据模型model调用对象
// let usermodel=mongoose.model('user', userSchema);  //user为插入的表（集合）
//参数一：关联表名（若为复数，自动转换为复数）；参数二：schema对象
// var s = usermodel.insertMany({uname1:'zhangsan',password:123});//返回的值为promise对象，可直接使用.then()函数
// usermodel.insertMany({uname:uname1,pass:pass1})
//插入数据库为异步操作，需要回调
// console.log(s);
// console.log(11);
 // .then((data)=>{
 // 	console.log(data)
 // })
 // .catch((err)=>{
 // 	console.log(err)
 // })


 //查询
 // usermodel.find()
 // .then((data)=>{
 // 	console.log(data)
 // })
 // .catch((err)=>{
 // 	console.log(err)
 // })
