const express=require("express");
const router=express.Router();
const memberModel=require("../model/memberModel.js");
const multer=require("multer");

//构建返回数据
function sendData(err,msg,data){
  return {
  	err:err,
  	msg:msg,
  	data:data
  }
}
//管理页面数据请求
let yu=5
let sum=0
let targetPage=1
let content=''
let style=1
router.get('/getData',(req,res)=>{
	// console.log(req,85);
	yu=req.query.yu * 1;
	// console.log(yu,87);
	target=req.query.targetPage
	content=req.query.content
	style=req.query.style
	let se={}
	// console.log(yu,84);
	memberModel.find({$or:[{"name":{$regex:content}},{"sex":{$regex:content}},{"uname":{$regex:content}},{"phone":{$regex:content}},{"Cart":{$regex:content}},{"date":{$regex:content}}]}).sort({'_id':style})
	.then((data)=>{
		// console.log(11)
		sum=data.length
		// let num = Math.ceil(sum/yu)*1;
		// console.log(sum,97)
		return memberModel.find({$or:[{"name":{$regex:content}},{"sex":{$regex:content}},{"uname":{$regex:content}},{"phone":{$regex:content}},{"Cart":{$regex:content}},{"date":{$regex:content}}]}).sort({'_id':style}).limit(yu).skip((target-1)*yu)
	})
	.then((data2)=>{
		// console.log(22)
		se={sum,data2}
		res.send(se)
	})
	.catch((err)=>{
		res.send(err)
	})
})
//删除数据
function sendData(err,msg,data){
  return {
  	err:err,
  	msg:msg,
  	data:data
  }
}
router.post('/delData',(req,res)=>{
	// console.log(req,102);
	// let id=	JSON.stringify(req.body)
	// let ss=id.split(':')[0].split('{')[1]
	let id=req.body.id;
	if (!id) {res.send(sendData(-111,'参数错误',null))}
	memberModel.deleteOne({_id:id})
	.then((data)=>{
		// console.log(data);
	 res.send(sendData(0,'删除成功',data))
	})
	.catch((err)=>{
		res.send(sendData(-11,'删除失败',null))
	})
})

//多行删除
router.post('/delMore',(req,res)=>{
	// console.log(111)
	var arr = new Array()
	arr=JSON.stringify(req.body)
	var ss=JSON.parse(arr.split(":")[1].split("}")[0])
	// console.log(typeof(ss),ss.length)
	let id=0
	memberModel.deleteMany({ _id:{ $in:ss}})
	.then((data)=>{
		if(data.length>0){
			res.send(sendData(0,'删除成功',data))
		}
	 	res.send(sendData(-111,'删除失败',null))
	})
	.catch((err)=>{
		res.send(sendData(-11,'删除失败',null))
	}) 
})

//修改数据
let gid=null
router.post('/update',(req,res)=>{
	gid=req.body.id
	memberModel.find({_id:gid})
	.then((data)=>{
		if(data.length>0){
			res.send(data)
		}else{
			res.send("");
		}
	})
	.catch((err)=>{
		res.send("")
	})
})


module.exports=router;