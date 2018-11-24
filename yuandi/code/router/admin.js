const express=require("express");
const router=express.Router();
const userModel=require("../model/userModel.js");
const adminModel=require("../model/adminModel.js");
const multer=require("multer");
const fs=require("fs"); //内置文件
const path=require("path")//引用路径


let upload = multer({ dest: 'uploads/' });//设置图片的临时保存路径

//管理员登录
router.post('/login',(req,res)=>{
	let {Luname,Lpass}=req.body;
	userModel.find({uname:Luname})
	.then((data)=>{
		if(data.length>=1){
			return userModel.find({uname:Luname,pass:Lpass})
			}else{
				 res.send("该用户不存在");
			}
	})
	.then((data1)=>{
		if(data1.length>=1){
			return res.send("登录成功");
		}else{
			return res.send("密码错误");
		}
	})
	.catch((err)=>{
		res.send("登录失败");
	})
	
})

//资讯上传
router.post("/img", upload.single('test'), (req,res)=>{ //test为前端图片保存路径
	// console.log(111);
	// console.log(req.file);

	//尺寸限制
	//读取文件
	fs.readFile(req.file.path,(error, data)=>{
		// console.log(data);
		let filename=new Date().getTime()+parseInt(Math.random(0,1)*1000)+"."+req.file.mimetype.split('/')[1];
		// console.log(filename);
		if(error){return res.send("上传错误1")}
			fs.writeFile(path.join(__dirname,'../../img',filename), data,(err)=>{
				if(err){return res.send('上传错误2')}
					let array ={
						err:0,
						msg:'ok',
						path:filename
					}
				res.send(array);
			});
	});
})


router.post('/submit',(req,res)=>{
	let date = new Date();
	let d = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
	// console.log(d);
	let{title,Ltitle,style,main,img}=req.body;
	adminModel.insertMany({title,Ltitle,style,main,img,data:d})
	.then((data2)=>{
		if(data2.length>0){
			return res.send("上传成功");
		}
		res.send("上传失败");
	})
	.catch((err)=>{
		res.send("上传失败");
	})
})

//管理页面数据请求
let yu=5
let sum=0
let targetPage=1
let content=''
let style=1
router.get('/getData',(req,res)=>{
	yu=req.query.yu * 1;
	target=req.query.targetPage
	content=req.query.content
	style=req.query.style
	let se={}
	// console.log(yu,84);
	adminModel.find({$or:[{"title":{$regex:content}},{"Ltitle":{$regex:content}},{"main":{$regex:content}},{"style":{$regex:content}}]}).sort({'_id':style})
	.then((data)=>{
		// console.log(11)
		sum=data.length
		// let num = Math.ceil(sum/yu)*1;
		// console.log(sum,97)
		return adminModel.find({$or:[{"title":{$regex:content}},{"Ltitle":{$regex:content}},{"main":{$regex:content}},{"style":{$regex:content}}]}).sort({'_id':style}).limit(yu).skip((target-1)*yu)
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
	adminModel.deleteOne({_id:id})
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
	adminModel.deleteMany({ _id:{ $in:ss}})
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
	adminModel.find({_id:gid})
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
	
	let {_id,title,Ltitle,style,main,img}=req.body
	// console.log(good.title);
	// adminModel.find()
	// .then((data)=>{
		// if(data.length>0){
		adminModel.updateOne({_id:gid},{title,Ltitle,style,main,img})
			
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
module.exports=router;