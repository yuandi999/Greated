//会员操作

const express=require("express");
const router=express.Router();
const userModel=require("../model/userModel.js");
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
	userModel.find({$or:[{"name":{$regex:content}},{"sex":{$regex:content}},{"uname":{$regex:content}},{"phone":{$regex:content}},{"Cart":{$regex:content}},{"date":{$regex:content}},{$and:[{"power":1}]}]}).sort({'_id':style})
	.then((data)=>{
		// console.log(11)
		sum=data.length
		return userModel.find({$or:[{"name":{$regex:content}},{"sex":{$regex:content}},{"uname":{$regex:content}},{"phone":{$regex:content}},{"Cart":{$regex:content}},{"date":{$regex:content}},{$and:[{"power":1}]}]}).sort({'_id':style}).limit(yu).skip((target-1)*yu)
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
	let id=req.body.id;
	if (!id) {res.send(sendData(-111,'参数错误',null))}
	userModel.deleteOne({_id:id})
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
	userModel.deleteMany({ _id:{ $in:ss}})
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
	userModel.find({_id:gid})
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

router.post('/update2',(req,res)=>{
	console.log(req.body,105);
	let {_id,name,sex,phone,uname,pass,Cart}=req.body
		userModel.update({_id:_id},{name,sex,phone,uname,pass,Cart})
			
		// }else{
		// 	res.send("更新失败");
		// }
	// })
	.then((data)=>{
		res.send("更新成功")
	})
	.catch((err)=>{
		res.send("更新失败")
	})
})

//权限编辑数据
router.post('/editData',(req,res)=>{
	let pid=req.body.pid;
	console.log(pid,133);
	userModel.find({_id:pid})
	.then((data)=>{
		// console.log(data,135);
	 res.send(sendData(0,'更新成功',data))
	})
	.catch((err)=>{
		res.send(sendData(-11,'更新失败',null))
	})
})

//权限编辑数据更新
router.post('/editUpdate',(req,res)=>{
	let pid=req.body.pid;
	// console.log(pid,133);
	userModel.updateOne({_id:pid},{power:"2"})
	.then((data)=>{
		// console.log(data,135);
	 res.send(sendData(0,'删除成功',data))
	})
	.catch((err)=>{
		res.send(sendData(-11,'删除失败',null))
	})
})


module.exports=router;