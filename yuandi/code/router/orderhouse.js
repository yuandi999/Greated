//房屋管理操作

const express=require("express");
const router=express.Router();
const orderhouseModel=require("../model/orderhouseModel.js");
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
let land=''
router.get('/getData',(req,res)=>{
	yu=req.query.yu * 1;

	land=req.query.land;
	// console.log(land,28);
	target=req.query.targetPage
	content=req.query.content
	style=req.query.style
	let se={}
	orderhouseModel.find({
			$or:[
				{"housename":{$regex:content}},
				{"addr":{$regex:content}},
				{"area":{$regex:content}},
				{"property":{$regex:content}},
				{"lander":{$regex:content}},
				{"price":{$regex:content}},
				{"status":{$regex:content}},
			],
			"status":land

		}).sort({'_id':style})
	
	.then((data)=>{
		sum=data.length
		// console.log(sum,49);
		return orderhouseModel.find({$or:[
			{"housename":{$regex:content}},
			{"addr":{$regex:content}},
			{"area":{$regex:content}},
			{"property":{$regex:content}},
			{"lander":{$regex:content}},
			{"price":{$regex:content}},
			{$and:[{"status":land}]}
			],
			"status":land
		}).sort({'_id':style}).limit(yu).skip((target-1)*yu)
	})
	.then((data2)=>{
		// console.log(sum,40)
		se={sum,data2}
		res.send(se)
	})
	.catch((err)=>{
		res.send(err)
	})
})

router.get('/getUserData',(req,res)=>{
	yu=req.query.yu * 1;
	land=req.query.land;
	target=req.query.targetPage
	content=req.query.content
	style=req.query.style
	let se={}
	let adname=req.query.name
	orderhouseModel.find({
			$or:[
				{"housename":{$regex:content}},
				{"addr":{$regex:content}},
				{"area":{$regex:content}},
				{"property":{$regex:content}},
				{"lander":{$regex:content}},
				{"price":{$regex:content}},
				{"status":{$regex:content}},
			],
			"status":land

		}).sort({'_id':style})
	
	.then((data)=>{		sum=data.length
		return orderhouseModel.find({$or:[
			{"housename":{$regex:content}},
			{"addr":{$regex:content}},
			{"area":{$regex:content}},
			{"property":{$regex:content}},
			{"lander":{$regex:content}},
			{"price":{$regex:content}},
			{$and:[{"status":land}]}
			],
			"status":land,
			"lander":adname
		}).sort({'_id':style}).limit(yu).skip((target-1)*yu)
	})
	.then((data2)=>{
		// console.log(sum,40)
		se={sum,data2}
		res.send(se)
	})
	.catch((err)=>{
		res.send(err)
	})
})

router.get('/getUserData2',(req,res)=>{
	yu=req.query.yu * 1;
	target=req.query.targetPage
	content=req.query.content
	style=req.query.style
	let se={}
	let adname=req.query.name
	orderhouseModel.find({
			$or:[
				{"housename":{$regex:content}},
				{"addr":{$regex:content}},
				{"area":{$regex:content}},
				{"property":{$regex:content}},
				{"lander":{$regex:content}},
				{"price":{$regex:content}},
				{"status":{$regex:content}},
			],
			"lander":adname
		}).sort({'_id':style})
	.then((data)=>{
		console.log(data,138);
		sum=data.length
		// console.log(sum,49);
		return orderhouseModel.find({$or:[
			{"housename":{$regex:content}},
			{"addr":{$regex:content}},
			{"area":{$regex:content}},
			{"property":{$regex:content}},
			{"lander":{$regex:content}},
			{"price":{$regex:content}},
			{$and:[{"status":land}]}
			],
			"lander":adname
		}).sort({'_id':style}).limit(yu).skip((target-1)*yu)
	})
	.then((data2)=>{
		// console.log(sum,40)
		se={sum,data2}
		res.send(se)
	})
	.catch((err)=>{
		res.send(err)
	})
})

router.get('/getData2',(req,res)=>{
	// console.log(req.body,169);
	yu=req.query.yu * 1;
	land=req.query.land;
	target=req.query.targetPage;
	content=req.query.content;
	style=req.query.style;
	let se={}
	orderhouseModel.find({
			$or:[
				{"housename":{$regex:content}},
				{"addr":{$regex:content}},
				{"area":{$regex:content}},
				{"property":{$regex:content}},
				{"lander":{$regex:content}},
				{"price":{$regex:content}},
				{"status":{$regex:content}},
			]
		}).sort({'_id':style})
	
	.then((data)=>{
		sum=data.length
		// console.log(sum,49);
		return orderhouseModel.find({$or:[
			{"housename":{$regex:content}},
			{"addr":{$regex:content}},
			{"area":{$regex:content}},
			{"property":{$regex:content}},
			{"lander":{$regex:content}},
			{"price":{$regex:content}},
			{$and:[{"status":land}]}
			]
		}).sort({'_id':style}).limit(yu).skip((target-1)*yu)
	})
	.then((data2)=>{		
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
	orderhouseModel.deleteOne({_id:id})
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
	orderhouseModel.deleteMany({ _id:{ $in:ss}})
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
	orderhouseModel.find({_id:gid})
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
	// console.log(req.body,272);
	let {_id,housename,area,price,addr,property}=req.body
		orderhouseModel.updateOne({_id},{housename,area,price,addr,property})
	.then((data)=>{
		res.send("更新成功")
	})
	.catch((err)=>{
		res.send("更新失败")
	})
})

//房屋编辑数据
router.post('/editData',(req,res)=>{
	let id=req.body.pid
	orderhouseModel.find({_id:id})
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
//插入房屋
router.get('/insertorder',(req,res)=>{
	console.log(req,291);
})

module.exports=router;