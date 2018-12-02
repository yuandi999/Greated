<template>
	<div>
		<div class="WeLive" v-show="isShow">
			<p>我们住在这</p>
			<p>纷纷扰扰这个世界&nbsp;所有的了解&nbsp;只要&nbsp;让我留在你身边</p>
			<div class="WeLiveIn">
				<a  v-for="(item,index) of LivePhoto" :key="index" @click="changeIntro(item.url)">
					<router-link to="/introduce">
						<img  :src="item.image" />
						<div class="titleCity">
							{{item.title}}
							<span id="fontsize">{{item.sub_title}}</span>
						</div>
					</router-link>
				</a>
			</div>
		</div>
		<div class="anXinZhu">
			<p class="titleAn">安心合租</p>
			<ul>
				<li v-for="(item,index) of anXinLive" :key="index" @click='getId(item)'>
					<router-link to="/detail2">
						<div>
							<img :src="item.image">
						</div>
						<div>
							<p>{{item.title}}</p>
							<p>{{item.sub_title}}</p>
							<p><b>{{item.image_title}}</b>&nbsp;元/每月</p>
						</div>
					</router-link>	
				</li>
			</ul>
		</div>
		<div class="anXinZiJu" v-show="isShow3">
			<p class="titleAn">安心自居</p>
			<ul>
				<li v-for="(item,index) of anXinAlone" :key="index" @click='getId(item)'>
					<router-link to="/detail2">
						<div>
							<img :src="item.image">
						</div>
						<div>
							<p>{{item.title}}</p>
							<p>{{item.sub_title}}</p>
							<p><b>{{item.image_title}}</b>&nbsp;元/每月</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'WeLive',
		props:["id"],
		data(){
			return {
				test: "WeLive",
				a:"",
				url: '/api/web-api/home-page/home-data',
				isShow:true,
				isShow2:true,
				isShow3:true,
				LivePhoto:[],
				anXinLive:[],
				city:'',
				trade:'',
				anXinAlone:[]
			}
		},
		components:{
			// Introduce
		},
		methods:{
			getId(item){
				console.log(item);
				this.$store.commit('changeDetail2',item);  //vuex用来管理vue的所有组件状态
			},
			getWeLive(){
		        this.$axios.get(this.url,{
					params:{
						city_id:this.$store.state.cityid
					}
				})
		        .then((res)=>{
		        	if(!res.data[1].data.length){
		        		this.isShow=false;
		        	}
		        	else{
		        		this.isShow=true;
		        		this.LivePhoto = res.data[1].data;
		        	}
		            this.anXinLive = res.data[2].data;
		            // this.anXinAlone = res.data[3].data;
		            if(!res.data[3].data.length){
		        		this.isShow3=false;
		        	}
		        	else{
		        		this.isShow3=true;
		        		this.anXinAlone = res.data[3].data;
		        	}
		        })
		        .catch((err)=>{
		        	console.log(err);
		        })
		    },
		    changeId(id){
		    	this.id=id;
		    },
		    changeIntro(url){
		    	this.$store.commit('changeIntroduce',url)
		    	this.city = url.split("?")[1].split("=")[1].split("&")[0];
		    	this.trade = url.split("?")[1].split("=")[2];
		    	this.$emit('intro',this.city,this.trade)
		    },

		},
		watch:{
	        id(val, oldVal){//普通的watch监听
	           this.getWeLive();
	        }
        },
		created(){
			this.getWeLive();
		},
	}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../styles/main.less');
.WeLiveIn::-webkit-scrollbar {display:none}
#fontsize{font-size:6px;-webkit-transform:scale(0.8);}
	.WeLive{
		border-bottom:1px solid #ccc;
		.padding(10,0,0,20);
		p:nth-child(1){
			color:@color;
			.fs(20);
			font-weight: 700;
		}
		p:nth-child(2){
			.fs(12);
			.margin(0,0,0,10);
			color: @color2;
		}
		.WeLiveIn{
			.margin(20,0,30,0);
			.h(88);
			overflow-x: auto;
			display: flex;
			overflow-y: hidden;

			img{
				.w(160);
				.h(88);
				display: inline;
				
			}
			a{
				.margin(0,10,0,0);
				position: relative;
				display: inline-block;
				.w(160);
				.h(88);
				.titleCity{
					position: absolute;
					.bottom(0);
					left: 0;
					width:100%;
					.h(30);
					.lh(30);
					background-color: rgba(0,0,0,.8);
					color: #fefefe;
					.fs(16);
					overflow: hidden;
					span{
						.fs(6);
						vertical-align: bottom;
					}
				}
			}
			
		}
	}
	.anXinZhu,.anXinZiJu{
		.padding(10,20,0,20);
		.titleAn{
			color:@color;
			.fs(20);
			font-weight: 700;
			.margin(0,0,10,0);
		}
		img{
			width: 100%;
			// .w(375);
		}

		ul{
			width: 100%;
			li{
				width: 96%;
				border: 1px solid #ddd;
				// .margin(0,0,20,0);
				.fs(16);
				margin: 0 auto 20px;
				background-color: @bg-color;
				.padding(0,0,20,0);
				p:nth-child(1){
					.fs(16);
					color:@color;
					.h(30);
					.lh(30);
					.padding(0,0,0,10);
				}
				p:nth-child(2){
					.fs(12);
					color:@color2;
					.h(30);
					.lh(30);
					.padding(0,0,0,10);
				}
				b{
					color: #ff7966;
					.padding(0,0,0,10);
				}
			}
		}
	}
</style>