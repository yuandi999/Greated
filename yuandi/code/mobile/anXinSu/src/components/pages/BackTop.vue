<template>
	<div class='back-top' 
	v-scroll-hide='isShow'  
    scroll-hide-distance="300"
	
    v-go-top:click
	>
	<!-- v-go-top:click='12313'   -->
<!-- 
v-backtop-hide 通过一个自定义指令来监听页面滚动事件

 -->     
 		<transition
		   enter-active-class='fadeIn animated'
		    leave-active-class='fadeOut animated'
 		>
	 	 <div class='contain-box' v-show='isShow'>
	 	 	<i class="fa fa-arrow-up"></i>
	 	 </div>
	 	</transition>
	</div>
</template>
<script>
export default{
	name:'back-top',
	data(){
		return {
			isShow:false
		}
	}
}
</script>
<style lang='less' scoped>
@import url('../../styles/animate.css');
.back-top{
	   position: fixed;
       right: 10px;
       bottom: 20px;
	.contain-box{
		width: 60px;
		height: 60px;
		font-size:30px;
        color:#000;
        display: flex;
        justify-content: center;
        align-items:center;
	}
}	
</style>