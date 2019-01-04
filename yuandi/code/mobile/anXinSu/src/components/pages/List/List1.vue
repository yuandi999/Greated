<template>
	<div>
		<Header></Header>
		<div class="bg"></div>
		<div class="checked">
			<div @click="changeList" class="box">
				<p :class="div1?'light11':''"><span>位置</span><i class="fa fa-sort-desc" aria-hidden="true"></i></p>
				<div v-show="div1">
					<ul @change="" v-model="val" >
						<li @click="changeli('不限',-1)" :class="index1==-1?'light1':''">不限</li>
						<li v-for="(item,index) in posi" :key="index" :value="item" :class="index1==index?'light1':''" @click="changeli(item,index)">{{item}}</li>
					</ul>
				</div>
			</div>
			<div @click="changeList" class="box">
				<p :class="div1?'light22':''"><span>价格</span><i class="fa fa-sort-desc" aria-hidden="true"></i></p>
				<div v-show="div1">
					<ul @change="" v-model="val" >
						<li @click="changeli('不限',-1)" :class="index1==-1?'light1':''">不限</li>
						<li v-for="(item,index) in posi" :key="index" :value="item" :class="index1==index?'light1':''" @click="changeli(item,index)">{{item}}</li>
					</ul>
				</div>
			</div>
			
			<!-- <select @change="changeList" v-model="val">
				<option v-for="(item,index) in posi" :key="index" :value="item">{{item}}</option>
			</select>
			<select @change="changeCount" v-model="val2">
				<option v-for="(item,index) in count" :key="index" :value="item">{{item}}</option>
			</select> -->
		</div>
		<div class="list">
			<ul
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="5"
			>
				<li v-for="(item,index) of sendData" @click='getRoom(item)'>
					<img :src="item.list_pic">
					<div>
						<p class="main">{{item.name}}</p>
						<p>
							<i class="fa fa-home"></i>
							{{item.block}}
							{{item.area}}
						</p>
						<p>
							<i class="fa fa-map-marker" aria-hidden="true"></i>
							{{item.nearest_subway_title}}
						</p>
						<p>
							<b>{{item.price}}</b>{{item.price_unit}}
						</p>
						<p>
							<span>{{item.list_tags[0]}}</span>
							<span>{{item.list_tags[1]}}</span>
							<span>{{item.list_tags[2]}}</span>
						</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Header from "../../commonts/Header"
	import Vue from "vue";
	import { InfiniteScroll } from 'mint-ui';
	Vue.use(InfiniteScroll);
	export default{
		name: 'List',
		data(){
			return {
				val:"",
				val2:"10",
				obj:"",
				index1: -1,
				div1: false,
				posi:["d朝阳区-b北苑", "d朝阳区-b欢乐谷景区", "d朝阳区-b立水桥", "d海淀区-b上地", "d丰台区-b石榴庄", "d昌平区-b天通苑"],
				city:"bj",
				count:[5,10,20,50],
				page:1,
				per_page:10,
				sendData:[],
			}
		},
		methods:{
			loadMore(){
				this.getData();
			},
			changeli(item,index){
				console.log(item,index,82);
				this.index1 = index;
				if(item ==="不限"){
					this.val = "";
				}
				else{
					this.val = item;
				}
				this.page=1;
				this.per_page=10;
				this.sendData=[];
				this.getData();
			},
			getPosi(){
				this.city=this.$store.state.code;
				this.$axios.get('/api/room/get-room-list/'+this.city,{
             		params:{
             			page:this.page,
             			per_page:20
             		}
             	})
             	.then((res)=>{
             		res.data.data.map((item,index)=>{
             			if(this.posi.indexOf('d'+item.district+'-b'+item.block)==-1){
             				this.posi.push('d'+item.district+'-b'+item.block);
             			}
             		})
             		Vue.nextTick(()=>{
             			if(this.page<50){
							this.page=this.page+2;
	     					this.getPosi();
	     					console.log(this.posi);
	     				}
	     				else{

	     				}
             		});
             		
             	})
             	.catch((err)=>{
             		console.log(err);
             	})
			},
			getData(){
				this.city=this.$store.state.code;
             	this.$axios.get('/api/room/get-room-list/'+this.city,{
             		params:{
             			position:this.val,
             			page:this.page,
             			per_page:this.per_page
             		}
             	})
             	.then((res)=>{
             		console.log(res,91);
             		this.sendData=this.sendData.concat(res.data.data)
             		this.page=this.page+1;
             	})
             	.catch((err)=>{
             		console.log(err);
             	})
			},
			getRoom(item){
				this.$store.commit('changeDetail',item);
				this.$router.push("/detail")
			},
			changeList(){
				this.div1 = !this.div1;

				console.log(this.div1);
				
			},
			changeCount(){
				this.per_page=this.val2;
				this.getData();
			}
		},
		components:{
			Header
		},
		created(){
			this.getPosi()
		}
	}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../../styles/main.less');
.bg{
	.h(90);
	background-color: #eee;
}
.light1,
.light11{
	color: red;
}
.checked{
	position: fixed;
	display: flex;
	align-items: center;
	.h(40);
	.w(375);
	.top(50);
	.left(0);
	right: 0;
	background-color:#fff;
	color: #888;
	justify-content: space-around;
	.box{
		// display: inline-block;
		p{
			.padding(0,10,0,10);
			
		}
		.fs(16);
		div{
			position:fixed;
			.top(90);
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0,0,0,.4);
		}
		ul{
			border-top: 1px solid #eee;
			position: absolute;
			background-color:#fff;
			z-index: 100;
			li{
				.w(375);
				.h(30);
				text-align: center;
			}
		}
	}
	select{
		.w(90);
		.h(30);
		option{
			.w(375);
			.h(30);
			display: block;
			position: absolute;
			z-index:10;
		}
	}
	
}
.list{
	ul{
	border-top:1px solid #ccc;
	color: #686868;
	position: absolute;
	.top(90);
	left: 0;
	li{
		.h(140);
		.w(375);
		.padding(0,10,0,10);
		display: flex;
		border-bottom:1px solid #ccc;
		img{
			.w(140);
			.h(105);
			// .lh(140);
			.margin(15,0,0,0);
		}
		div{
			.margin(0,0,0,15);
			.fs(12);
			.main{
				.fs(14);
			}
		}
		p{
			.margin(3,0,0,0);
			span{
				display: inline-block;
				border:1px solid #ff7966;;
				color:#ff7966;;
				.padding(2,2,2,2)
			}
			span:nth-child(2){
				border:1px solid #0cc6a2;
				color:#0cc6a2;
			}
			span:nth-child(3){
				border:1px solid #ffa000;
				color:#ffa000;
			}
			b{
				color:#ff7966;;
				.fs(16);
			}
		}
	}
}
}
</style>