<template>
	<div>
		<div class="h-return">
			<i class="fa fa-chevron-left" aria-hidden="true" @click="returnUp"></i>
		</div>
		<div class="h-img">
			<img :onerror="erronimg" :src="img">
		</div>
		<div class="messge">
			<div>
				<h1>{{name}}</h1>
				<p>交通便利</p>
			</div>
			<p class="promi">
				<span v-for='(item,index) of promite'>{{item}}</span>
			</p>
			<p class="price">
				<span>每月租金</span>
				<b>{{price}}</b>
				<u>{{price_unit}}</u>
			</p>
			<p class="introduce">
				<span>活动说明</span>
				<u> 首月租金立减1000元！额外最高返现1000元！</u>
			</p>
			<p class="call">
				<span>咨询电话：</span>
				<b>10086-11</b>
			</p>
			<p class="room_introduce">
				<span>建筑面积：</span>
				约{{area}}(以实际测量为准)
			</p>
			<p class="room_introduce">
				<span>朝向：</span>{{direction}}
			</p>
			<p class="room_introduce">
				<span>区域：</span>
				<u>{{district}}</u>
				<u>{{block}}</u>
				<u>{{map_address}}</u>
			</p>
			<p class="room_introduce">
				<span>地铁：</span>{{nearest_subway_title}}
			</p>

			<p class="room_introduce">
				<span>付款：</span><u>可支持分期月付</u>[不收中介费]
			</p>
			<div>
				<img src="../../../img/biao.png">
			</div>
		</div>
		<div class="like">
			<p>|猜你喜欢</p>
			<ul>
				<li v-for="(item,index) of list">
					<div>
						<img :src="item.pic">
					</div>
					<div>
						<p>{{item.address}}</p>
						<b class="pri">{{item.price}}</b>
						<p>{{item.subhead}}</p>
					</div>
				</li>
			</ul>
		</div>
		<Footer />
		<div class="bg"></div>
		<div class="shouchan">
			<div>
				<span @click="order()">在线预约</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Footer from '../../commonts/Footer';
	import Img from '../../../img/tem.jpg';
	export default{
		name: 'Detail',
		data(){
			return {
				test: "home",
				id: 1,
				img:'',
				name:'',
				promite:[],
				erronimg: 'this.src="'+Img+'"',
				price_unit: '',
				price: 0,
				area: '',
				direction: '',
				district: '',
				block: '',
				map_address: '',
				nearest_subway_title: '',
				list: [],
			}
		},
		methods:{
			cityId(id){
				this.id=id
			},
			getData(){
				let msg = this.$store.state.detail;
				console.log(this.$store.state.detail,23);
				this.img = msg.list_pic;
				this.name = msg.name;
				this.promite = msg.list_tags
				this.price = msg.price;
				this.price_unit = msg.price_unit;
				this.area = msg.area;
				this.direction = msg.direction;
				this.district =msg.district;
				this.block =msg.block;
				this.map_address = msg.map_address;
				this.nearest_subway_title = msg.nearest_subway_title
				this.$axios.get('/api/room/guessroom/'+msg.id)
				.then((res)=>{
					// console.log(res);
					this.list = res.data;
				})
			},
			order(){
				var date = new Date();
				console.log(jsonStringify(date).split(" "));
				let data={price:this.price,area:this.area}
				alert("预订成功，商家会在24小时内确认并返回信息给您，请耐心等待")
			},
			returnUp(){
				// console.log(this);
				// window.history.back(）
				this.$router.go(-1)
			},
		},
		mounted(){
			this.getData()
		},
		components:{
			Footer
		},
	}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../../styles/main.less');
.h-return{
	.h(50);
	.w(375);
	position: fixed;
	left: 0;
	top: 0;
	z-index: 2;
	background-color: #3dbcc6;
	.fs(24);
	.padding(0,0,0,20);
	color: #fff;
	.lh(50);
	font-weight:400;
}
.h-img{
	.margin(50,0,0,0);
	img{
		width:100%;
	}
}

.messge{
	.padding(10,10,10,20);
	color: #666;
	div{
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		.padding(0,0,10,0);
		h1{
			.fs(20);
			// .h(60);
			.w(260);
			
		}
		p{
			.fs(12);
			.h(24);
			.lh(24);
			color: #3dbcc6;
    		background: #f2fefe;
    		.padding(0,15,0,15);
		}
	}
	img{
		// .w(375);
		position: relative;
		.left(-10);
		.top(0);
	}
}

.promi{
	.margin(10,0,0,0);
	.fs(12);
	span{
		border: 1px solid #efefef;
	    color: #959d9f;
		display: inline-block;
		.margin(0,10,0,0);
		.padding(3,10,3,10);
		border-radius:5px;
	}
}
.price{
	.fs(12);
	.margin(10,0,0,10);
	span{
		color: #898989;
		vertical-align: middle;
	}
	b{
		.fs(24);
		color: #ff7966;
		.margin(0,10,0,10);
		vertical-align: middle;
	}
	u{
		text-decoration: none;
		vertical-align: middle;
		color: #ff7966;
	}
}
.introduce{
	.fs(12);
	.margin(10,0,0,10);
	color: #898989;
	span{
		.margin(0,10,0,0);
		
	}
	u{
		text-decoration: none;
	}
}
.call{
	width:100%;
	.margin(10,0,0,0);
	border: 1px solid #3dbcc6;
	color: #3dbcc6;
	text-align: center;
	.padding(8,0,8,0);
	.fs(12);
	b{
		.fs(20);
	}
}
.room_introduce{
	.fs(12);
	.margin(8,0,0,0);
	span{
		.margin(0,10,0,0)
	}
	u{
		.margin(0,10,0,0);
	}
}

.like{
	.fs(16);
	.padding(0,0,0,20);
	ul{
		li{
			display: flex;
			align-items:center;
			justify-content: space-around;
			.h(150);
			img{
				.w(150);
			}
			.pri{
				color: #ff7966;
				.fs(20);
			}
			div:nth-child(2){
				// .margin(0,0,0,10);
				.w(180);
				box-sizing: border-box;
				p:nth-child(3){
					.fs(14);
					color: #888;
				}
			}
		}
	}
}
.bg{
	.h(50);
	width: 100%;
}
.shouchan{
	position:fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	.h(50);
	right: 0;
	display: flex;
	text-align: center;
	align-items: center;
	.fs(18);
	color: #fff;
	div{
		text-align: center;
		width:100%;
		.h(50);
		.lh(50);
		background-color: #eec02f
	}
}
</style>