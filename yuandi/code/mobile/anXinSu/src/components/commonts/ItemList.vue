<!-- 新闻列表 -->
<template>
  	<div class="ItemList">
  		<ul>
  			<router-link to="/list" tag="li" v-for='(item,index) of list' :key='index'>
  				<i :class='item.icon'></i>
  				<p>{{item.name}}</p>
  			</router-link>
  		</ul>
  		<div class="NewList">
  			<div>
  				<span>今日头条</span>
  				<div class="swiper-container">
				    <div class="swiper-wrapper">
				        <div class="swiper-slide" v-for='(item,index) of msg' :key="index">
				        	{{item}}
				        	<i class="fa fa-angle-right"></i>
				        </div>
				    </div>
				</div>
  			</div>
  		</div>
 	</div>
</template>

<script>
	import Swiper from '../../../static/swiper.min.js';
	import Vue from 'vue';
export default {
  	name: 'ItemList',
  	data(){
  		return{
  			msg:['真正的跳楼大甩卖啦',],
  			list:[{icon: 'iconfont icon-loufang',name: '热门楼盘'},{icon: 'iconfont icon-fang',name: '住宅出租'},{icon: 'iconfont icon-tousu',name: '最新楼盘'},{icon: 'iconfont icon-zixun',name: '写字楼出租'}]
  		}
  	},
  	methods: {
  		getMsg(){
  			setTimeout(()=>{
				this.msg = ['真正的跳楼大甩卖啦','今天的房子白菜价啦','9块钱你买不了吃亏','9块钱你买不了上当',"走过路过不要错过"]
				Vue.nextTick(()=>{
					var mySwiper = new Swiper ('.swiper-container', {
					    loop: true, // 循环模式选项
					    direction: 'vertical',
					    autoplay:true,
				    })
				})
			},1000);
  		}
  	},
  	created(){
  		this.getMsg();
  	}
}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../styles/main.less');
@import url('../../../static/swiper.min.css');
	.ItemList{
		ul{
			display: flex;
			justify-content: space-around;
			.padding(20,0,15,0);
			li{
				.fs(14);
				width:25%;
				text-align: center;
				i{
					display: inline-block;
					.w(50);
					.h(50);
					border-radius: 50%;
					background-color: orange;
					.fs(24);
					text-align: center;
					.lh(50);
					color: #eee;
					.margin(0,0,10,0);
				}
				.icon-fang{
					background-color: #82c8e8;
				}
				.icon-tousu{
					background-color: #44c288;
				}
				.icon-zixun{
					background-color: #f47e4b;
				}
			}
		}
		.NewList{
			background-color: #eee;
			.padding(10,0,10,0);
			div{
				background-color: @bg-color;
				.h(30);
				.lh(10);
				position: relative;
				span{
					.fs(14);
					color: orange;
					border-right: 1px solid #ddd;
					font-style: italic;
					display: inline-block;
					.padding(0,10,0,10);
				}
				.swiper-container{
					.fs(14);
					position: absolute;
					.top(0);
					.left(90);
					.right(0);
					.h(30);
					.swiper-slide{
						.lh(30);
						i{
							.fs(20);
							position: absolute;
							.right(20);
							.top(5);
						}
					}
				}
			}
		}
	}
</style>
