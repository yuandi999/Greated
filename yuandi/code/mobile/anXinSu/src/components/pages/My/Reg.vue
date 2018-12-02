<template>
	<div>
		<div class="imgs">
			<img src="../../../img/reg.gif" />
			<router-link to="/" tag="i" class="fa fa-home"></router-link>
		</div>
		<div>
			<form onsubmit="return false" method="post">
				<div class="email">
					<input id="email" v-model="emailVal" name="email"  type="email" placeholder="请输入您的邮箱" autocomplete="off" required="required">
					<input type="button" id="clickTest" v-show="!djsCheck" value="获取验证码" @click="clickTest" />
					<span id="djs" v-show="djsCheck">倒计时：<b>60</b>秒</span>
					<i class="fa fa-check emailcheck" v-show="emailCheck"></i>
					<p id="emailVerify"></p>
				</div>
				<div class="pass">
					<input id="pass" type="password" v-model="passVal" placeholder="密码" required="required">
					<i class="fa fa-check passcheck" v-show="passCheck"></i>
					<p id="passVerify"></p>
				</div>
				<div class="testNum">
					<input id="testNum" type="text" placeholder="验证码" v-model="yzmVal" required="required" autocomplete="off">
					
				</div>
				<div  class="login">
					<router-link to="/my/login">已有账号？立即登录</router-link>
				</div>
				<div class="reg">
					<input type="submit" name="" value="注册" @click="reg">
				</div>
			</form>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Header from '../../commonts/Header';
	export default{
		name: 'Reg',
		data(){
			return {
				test: "Reg",
				url: '',
				emailVal: '',
				passVal: '',
				yzmVal:'',
				isOk: false,
				isOk2: false,
				emailCheck: false,
				passCheck: false,
				djsCheck: false,
				num: '0',
			}
		},
		components:{
			Header
		},
		methods:{
			
			//失焦验证邮箱是否可用
			emailIsOk(){	
				this.url = '/emaitest/admin/emailTest';
				var emailTest = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.emailVal);
				if(emailTest){
					 this.$axios.post(this.url,{
						params:{
							mail: this.emailVal
					}})
					.then((res)=>{
						if(!res.data.code){
							$("#emailVerify").html("")
							this.emailCheck = true;
							this.isOk = true;
						}
						else{
							$("#emailVerify").html(res.data.msg);
							$("#emailVerify").css("color","red");
							this.emailCheck = false;
							this.isOk = false;
						}
					})
					.catch((err)=>{
						console.log(err);
						this.emailCheck = false;
						this.isOk = false;
					})
				}
				else{
					this.isOk = false;
					this.emailCheck = false;
					$("#emailVerify").html("请输入正确的邮箱");
					$("#emailVerify").css("color","red");
				}
			},

			//点击获取验证码
			clickTest(){
				if(this.isOk){
					this.djsCheck=!this.djsCheck;
					this.url = "/emaitest/admin/dataTest";
					var numTest = parseInt(Math.random()*9999+1);
					this.$axios.post(this.url,{
						params:{
							"mail":this.emailVal,"msg":numTest
					}})
					.then((res)=>{
						this.num = $("#djs b").html()*1;
						var timer = setInterval(()=>{
							$("#clickTest").next().html("倒计时：<b>"+(this.num--)+"</b>秒");
							if(this.num<=0){
								clearInterval(timer);
								this.djsCheck=!this.djsCheck;
								$("#djs").html("倒计时：<b>60</b>秒")
							}
						},1000);
						
					})
					.catch((err)=>{
						console.log(err);
					})
				}
				else{
					alert("请输入正确的邮箱")
				}
			},

			//失去焦点验证密码
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

			//点击注册
			reg(){
				// var mail = $("#email").val();
				// var pass = $("#pass").val();
				// var code = $("#testNum").val();
				
				this.url = "/emaitest/admin/reg";
				if(this.emailVal && this.passVal && this.yzmVal){
					if(this.isOk){
						if(this.isOk2){
							console.log(this.yzmVal,this.emailVal,this.passVal);
							this.$axios.post(this.url,{
								params:{"mail":this.emailVal,"pass":this.passVal,"code":this.yzmVal}})
							.then((res)=>{
								console.log(res);
								if(res.data == '注册成功'){
									var login = confirm("注册成功,是否登陆");
									if(login){
										this.$router.replace("/my/login")
									}
									else{
										this.$router.replace("/")
									}
								}
								else{
									alert(res.data);
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
						alert("请输入正确的邮箱")
					}
				}
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
	}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../../styles/main.less');
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

#clickTest,#djs{
	position:absolute;
	.w(90);
	.h(30);
	.lh(30);
	display: inline-block;
	.fs(12);
	color: #fff;
	right: 0;
	.top(10);
	background-color: #e44204;
}
#djs{
	border: 1px solid #e44204;
	background-color: #fff;
	color: #e44204;
}
.login{
	text-align: center;
	a{
		.fs(14);
		color:@color2;
		text-decoration: underline;
	}
}
.reg{
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
	.right(100);
	border-radius: 50%;
}
.passcheck{
	.top(14);
	.right(0);
}
</style>