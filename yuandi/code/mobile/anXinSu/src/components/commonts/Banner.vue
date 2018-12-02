<template>
	<div class="Banner">
		<div class="bg"></div>
		<mt-swipe :auto="3000" >	
		<!-- 要加上边框才能使用 -->
	  		<mt-swipe-item><img src="../../img/banner1.gif"></mt-swipe-item>
	 		<mt-swipe-item><img src="../../img/banner2.gif"></mt-swipe-item>
	  		<mt-swipe-item><img src="../../img/banner3.gif"></mt-swipe-item>
		</mt-swipe>
		<div class="bu">
			<i class="fa fa-search"></i>
			<input type="" name="" placeholder="请输入您想找的区域或梦想的楼房">
			
		</div>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import { Swipe, SwipeItem } from 'mint-ui';
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	export default{
		name: 'Banner',
		data(){
			return {
				test: "Banner"
			}
		},
		methods:{
		},
	}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../styles/main.less');
.bg{
	.h(50);
	width: 100%;
	position: fixed;
	// z-index: 2;
	.top(0);
	.left(0);
	background-color: #3dbcc6;
}
.Banner{
	position: relative;
	z-index:5;
	.w(375);
	.h(248);
	img{
		.w(375);
		.h(248);
	}
	.bu{
		position: absolute;
		.bottom(40);
		.left(27.5);
		input{
			.w(320);
			.h(35);
			background-color: rgba(255,255,255,0.8);
			.padding(0,0,0,10);
		}
		i{
			position: absolute;
			.right(0);
			.bottom(0);
			color: #666;
			.fs(16);
			display: inline-block;
			.w(35);
			.h(35);
			.lh(35);
			text-align: center;
		}
	}
}
</style>