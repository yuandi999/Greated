<template>
  	<div>
  		<div class="header">
	  		<div class="left">
	  			<router-link to="/home" tag="div">
	  				<img src="../../img/logo.jpg">
	  			</router-link>
  				<span @click="getCity()" >
	  				{{nowCity}}
	  				<i class="fa fa-caret-down"></i>
	  			</span>
	  		</div>
	  		<div class="right">
	  			<router-link to="/my" tag="span">
	  				<i class="fa fa-user"></i>
	  				<u>{{isLogin}}</u>

	  			</router-link>
	  		</div>
 		</div>
		<NavList v-show="isShow2" @toggle2="toggle2"></NavList>
		<!-- 城市列表 -->
 		<CityList v-show="isShow" :city = "city" @toggle="toggle"></CityList>
 		
  	</div>
</template>

<script>
	import CityList from './CityList';
	import NavList from './NavList';
	import Vue from 'vue';
export default {
  	name: 'Header',
  	data(){
  		return {
  			city:[1],
  			id: 1,
  			nowCity:this.$store.state.city,
  			code: 'bj',
  			url: '/api/web-api/base-configure/city-list',
  			isLogin: "立即登录",
	        data:{
	             params:{
	               
	            }
	        },
	        isShow: false,
	        isShow2: false,
  		}
  	},
  	components:{
  		CityList,
  		NavList
  	},
  	methods:{
  		toggle(id,city,code){
  			this.isShow = false;
  			this.id=id;
  			this.nowCity = city;
  			this.code = code;
  			this.$store.commit('changeCode',code);
  			this.$emit("cityId",id,code);
  		},
  		toggle2(){
  			this.isShow2 = false;
  		},
  		getCity(){
  			this.$axios.get(this.url,this.data)
	        .then((res)=>{
	            this.city = res.data;
	            Vue.nextTick(()=>{
	            	this.isShow2 = false;
	            	this.isShow = !this.isShow;
	            });
	        })
	        .catch((err)=>{
	        	console.log(err);
	        })
  		},
  		getNav(){
  			this.isShow = false;
  			this.isShow2 = !this.isShow2;
  		},
  		isLog(){
  			if(this.$store.state.login){
  				this.isLogin=this.$store.state.login.split("@")[0].substring(0,2)+"***"+this.$store.state.login.split("@")[0].substring(5);
  			}
  			else{
  				this.isLogin="立即登录"
  			}
  		}
  	},
  	created(){
  		this.isLog();
  	}
}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../styles/main.less');
u{
	text-decoration: none;
}
	.header{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		display: flex;
		z-index:1000;
		background-color: rgba(255,255,255,.3);
		justify-content: space-between;
		align-items: center;
		.padding(0,20,0,20);
		.w(375);
		.h(50);
		.left{
			div{
				float: left;
				img{
					.h(30)
				}
			}
			span{
				display: inline-block;
				vertical-align: middle;
				.w(50);
				.h(20);
				.fs(12);
				background-color: @bg-color;
				color: @color;
				.lh(20);
				text-align: center;
				.margin(0,0,0,20);
				border-radius: 20px;
			}
			
		}
		.right{
			color: #fff;
			.fs(16);
			i{
				color:#fff;
			}
		}
	}

</style>
