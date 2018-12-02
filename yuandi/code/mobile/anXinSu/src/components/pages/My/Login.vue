<template>
	<div>
		<div class="imgs">
			<img src="../../../img/reg.gif">
			<router-link to="/" tag="i" class="fa fa-home">
			</router-link>
		</div>
		<div>
			<form onsubmit="return false" method="post">
				<div class="email">
					<input id="email" v-model="emailVal" name="email"  type="email" placeholder="请输入您的邮箱" autocomplete="off" required="required" />
					<i class="fa fa-check emailcheck" v-show="emailCheck"></i>
					<p id="emailVerify"></p>
				</div>
				<div class="pass">
					<input id="pass" type="password" v-model="passVal" placeholder="密码" required="required" />
					<i class="fa fa-check passcheck" v-show="passCheck"></i>
					<p id="passVerify"></p>
				</div>
				
				<div  class="reg">
					<router-link to="/my/reg">还没账号？立即注册</router-link>
				</div>
				<div class="login">
					<input type="submit" name="" value="登录" @click="login" />
				</div>
			</form>



			<!-- <form method="post" onsubmit="return false">
				<div class="email">
					<input id="email" name="" type="email" placeholder="请输入您的邮箱" autocomplete="off" required="required" @>
					<p id="emailVerify"></p>
				</div>
				<div class="pass">
					<input id="pass" type="password" placeholder="密码" required="required">
					<p id="passVerify"></p>
				</div>
				<div  class="reg">
					<router-link to="/reg">还没账号？立即注册</router-link>
				</div>
				<div class="login">
					<input type="submit" name="" value="登录" >
				</div> -->
				<!-- <div id="mpanel4" ></div> -->

			<!-- </form> -->
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'Login',
		data(){
			return {
				test: "Login",
				url: '',
				emailVal: '',
				passVal: '',
				yzmVal:'',
				isOk: false,
				isOk2: false,
				emailCheck: false,
				passCheck: false,
				djsCheck: false,
			}
		},
		components:{
		},
		methods:{
			emailIsOk(){
				// this.url = '/LL/user/login';
				var emailTest = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.emailVal);
				if(emailTest){
				// 	 this.$axios.post(this.url,{
				// 		params:{
				// 			Luname: this.emailVal
				// 	}})
				// 	.then((res)=>{
						// if(!res.data.code){
						// 	$("#emailVerify").html("该邮箱尚未注册");
						// 	$("#emailVerify").css("color","red");
						// 	this.emailCheck = false;
						// 	this.isOk = false;
						// }
						// else{
							$("#emailVerify").html("");
							this.emailCheck = true;
							this.isOk = true;
						// }
					// })
					// .catch((err)=>{
					// 	console.log(err);
					// 	this.emailCheck = false;
					// 	this.isOk = false;
					// })
				}
				else{
					this.isOk = false;
					this.emailCheck = false;
					$("#emailVerify").html("请输入正确的邮箱");
					$("#emailVerify").css("color","red");
				}
			},
			passIsOk(){
				var passTest = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/.test(this.passVal);
				if(passTest){
					$("#passVerify").html("");
					this.passCheck = true
					this.isOk2 = true;
				}
				else{
					this.passCheck = false;
					$("#passVerify").html("请输入正确的密码,密码必须包含英文数字，且为6-16位");
					$("#passVerify").css("color","red");
					this.isOk2 = false;
				}
			},
			login(){

				this.url = "/LL/user/login2";
				if(this.emailVal&&this.passVal){
					if(this.isOk){
						if(this.isOk2){
							this.$axios.post(this.url,{params:{"Luname": this.emailVal,"pass":this.passVal}})
							.then((res)=>{
								console.log( this.emailVal,this.passVal,122);
								console.log(res,128)
								if(res.data=="登录成功"){
									window.localStorage.setItem("login",this.emailVal);  
									this.$store.commit('changeLogin',this.emailVal)
									this.$router.replace("/");
									
								}
								else{
									this.emailVal="";
									this.passVal="";
									this.emailCheck=false;
									this.passCheck=false;
									alert("邮箱/密码错误");
								}
							})
							.catch((err)=>{
								console.log(err);
							})
						}
						else{
							alert("请输入正确的密码")
						}
					}
					else{
						alert("请输入正确的邮箱");
					}
				}
				
				return false;
			}
		},
		watch:{
	        emailVal(val, oldVal){//普通的watch监听
	           this.emailIsOk();
	        },
	        passVal(val, oldVal){//普通的watch监听
	           this.passIsOk();
	        },
        },
		// mounted(){
		// 	$('#mpanel4').slideVerify({
		// 	type : 2,		//类型
		// 	vOffset : 5,	//误差量，根据需求自行调整
		// 	vSpace : 5,	//间隔
		// 	imgName : ['http://p4.so.qhmsg.com/bdr/200_200_/t01985baef35df3ee39.jpg', 'http://p4.so.qhmsg.com/bdr/200_200_/t01985baef35df3ee39.jpg'],
		// 	imgSize : {
		// 		width: '400px',
		// 		height: '200px',
		// 	},
		// 	blockSize : {
		// 		width: '40px',
		// 		height: '40px',
		// 	},
		// 	barSize : {
		// 		width : '400px',
		// 		height : '40px',
		// 	},
		// 	ready : function() {
		// 		console.log(11);
		// 	},
		// 	success : function() {
		// 		alert('ok');
		// 	},
		// 	error : function() {
		// 		console.log(22);
		// //		        	alert('验证失败！');
		// 	}
			
		// });
		// }
	}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../../styles/main.less');
@import url('../../../../static/yzm-cj/css/verify.css');
#mpanel4{
	.fs(14);
}
.imgs{
	.margin(0,0,40,0);
	img{
		.w(375);
	}
	i{
		position: absolute;
		.top(10);
		.left(10);
		display: inline-block;
		.w(30);
		.h(30);
		.fs(24);
		.lh(30);
		text-align: center;
		border-radius:50%;
		background-color: #fff;
	}
}

.email
,.pass
,.testNum{
	text-align: center;
	position: relative;
	.w(300);
	.h(50);
	// .lh(50);
	margin: 0 auto;
	overflow: visible;
	input{
		.w(300);
		.h(30);
		.lh(30);
		border-bottom:1px solid #eee;
	}
	#emailVerify,#passVerify{
		.fs(12);
		width: 100%;
		.h(20);
		text-align: left;
	}
}


#clickTest{
	position:absolute;
	.w(90);
	color: #fff;
	right: 0;
	.top(10);
	background-color: #e44204;
}
.reg{
	text-align: center;
	a{
		.fs(14);
		color:@color2;
		text-decoration: underline;
	}
}
.login{
	text-align: center;
	.margin(20,0,0,0);
	input{
		background-color: #e44204;
		.w(320);
		.h(40);
		.fs(20);
		color:#fff;
	}
}
.emailcheck,
.passcheck{
	display: inline-block;
	background-color: green;
	color: #fff;
	.w(20);
	.h(20);
	.fs(14);
	.lh(20);
	position: absolute;
	.top(14);
	.right(0);
	border-radius: 50%;
}
// .passcheck{
// 	.top(14);
// 	.right(0);
// }

</style>