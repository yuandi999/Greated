<template>
	<div class="NavList" @click="onNav">
		<transition 
		  enter-active-class='animated slideInLeft'
		  leave-active-class='animated slideOutLeft'
        >
			<div>
				<div class="bg"></div>
			<div>
				<ul>
					<router-link v-for="(item,index) of list" :to="item.path" tag="li" :key="index">{{item.name}}</router-link>
				</ul>
			</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'NavList',
		data(){
			return {
				test: "NavList",
				list:[{"path":"/","name":"首页"},{"path":"/","name":"房屋出租"},{"path":"/my","name":"我的"},]
			}
		},
		methods:{
			onNav(){
				this.$emit('toggle2')
			}
		},
	}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../styles/main.less');
.NavList{
	
	.bg{
		position: fixed;
		.top(50);
		.w(375);
		left: 0;
		right: 0;
		bottom: 0;
		z-index:100;
		background:rgba(0,0,0,.5);
	}
	ul{
		position: fixed;
		.w(250);
		height:100%;
		.top(50);
		left: 0;
		z-index:101;
		background-color: #282828;
		.fs(16);

		li{
			color:#9a9a9a;
			.h(50);
			.lh(50);
			.padding(0,0,0,20);
			border-bottom:1px dashed #888;
		}
	}
}
</style>