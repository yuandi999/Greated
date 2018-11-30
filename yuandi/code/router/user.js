const express=require("express");
const router=express.Router();
const mail=require("../email.js");
const userModel=require("../model/userModel.js");

//构建返回数据
function sendData(err,msg,data){
  return {
  	err:err,
  	msg:msg,
  	data:data
  }
}
// 获取邮箱验证码
 let obj=0;
router.post('/getcode',(req,res)=>{
	// console.log(req.body);
	let {uname,countdown}=req.body;
	// console.log(uname);
	if (!uname||uname=="") {
		// console.log(uname);
		return res.send(sendData(-1,'参数错误',null))
	}
    let num=(parseInt(Math.random(0,1)*10000)).toString()
    if(countdown==""){
    	num==1000000;
    }
    //生成验证码
	mail.sendmail(uname,num)

	.then((resolve)=>{
		obj=num;
		//保存验证码信息
		// console.log(obj)
		res.send(sendData(0,'验证码已发送',null))
	})
	.catch((err)=>{
		console.log(err)
		res.send(sendData(-1,'验证码发送失败',null))
	})
	
})

//注册
router.post('/reg',(req,res)=>{
	// console.log();
	let {uname,pass,code}=req.body;
	console.log(obj,code);
	// console.log({uname,pass,code});
	// console.log(userModel.find({uname}));
	userModel.find({uname})
	// userModel.insertMany({uname,pass,code})
	.then((data)=>{
		// console.log(data);
		if(data.length>0){
			res.send("该用户已存在");
		}else{
			if(obj==code){
				userModel.insertMany({uname,pass})
				.then((data)=>{
					// console.log(data);
					res.send("注册成功");

				})
				.catch((err)=>{
					// console.log(err);
					res.send("注册失败");
				})
			}
			else{
				res.send("验证码错误");
			}
			
		}
		
	})
	.catch((err)=>{
		// console.log(err);
		res.send("注册失败");
	})

})

//管理员房东验证
router.get("/seach", (req,res)=>{
	var adname=req.query.adname;
	userModel.find({'uname':adname})
	.then((data)=>{
		res.send(data)
	})
	.catch((err)=>{
		res.send(err);
	})
})

//用户登录
router.post('/login',(req,res)=>{
	let {Luname,Lpass}=req.body;
	userModel.find({uname:Luname})
	.then((data)=>{
		if(data.length>=1){
			userModel.find({uname:Luname,pass:Lpass})
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
		}else{
			return res.send("该用户不存在");
		}
	})
	.catch((err)=>{
		res.send("登录失败");
	})
	
})




module.exports=router;