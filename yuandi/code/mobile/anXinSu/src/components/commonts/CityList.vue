<template>
  	<div>
  		<transition
  		enter-active-class = 'animated fadeIn'
  		leave-active-class = 'animated fadeOut'
  		>
	  		<div>
	  			<div class="bg"></div>
				<div class='cityList'>
					<ul>
						<router-link 
						tag="li" to="/" 
						v-for="(item,index) of city" 
						:key="index"
						>
						<div @click="change(item.id,item.shortName,item.code)">
							{{item.shortName}}
						</div>
						</router-link>
					</ul>
					<p >x</p>
				</div>
	  		</div>
		</transition>
  	</div>
</template>

<script>
export default {
  	name: 'CityList',
  	data(){
  		return {

  		}
  	},
  	methods:{
  		change(id,city,code){
  			this.$store.commit("changeCityId",id);
  			this.$store.commit("changeCity",city);
  			this.$emit('toggle',id,city,code)
  		}
  	},
  	created(){
  		
  	},
  	props:['city']
}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../styles/main.less');
	.bg{
		background-color: #333;
		position: fixed;
		.top(0);
		left: 0;
		bottom: 0;
		right: 0;
		opacity: 0.7;
		z-index:10;
		
	}
	.cityList{
		.w(375);
		position: fixed;
		.top(250);
		.left(0);
		opacity: 1; 
		color: @color;
		background-color: @bg-color;
		z-index:11;
		.fs(14);
		ul{
			
			.padding(10,0,0,0);
			width: 100%;
			li{
				float: left;
				width: 24%;
				.margin(0,0,10,0);
				text-align: center;
			}
			
		}
		p{
			.w(20);
			.h(20);
			.lh(20);
			text-align: center;
			position: absolute;
			.right(2);
			.top(3);
			border:1px solid @color;
			border-radius:50%;
		}
	}
</style>
