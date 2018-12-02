<template>
	<div>
		<Header @cityId="cityId" />
		<Banner />
		<ItemList />
		<WeLive :id="id" @intro = "intro" />
		<Footer />
	</div>
</template>

<script type="text/javascript">
	import Header from '../../commonts/Header';
	import Banner from '../../commonts/Banner';
	import ItemList from '../../commonts/ItemList';
	import WeLive from '../../commonts/WeLive';
	import Footer from '../../commonts/Footer';
	export default{
		name: 'Home',
		data(){
			return {
				test: "home",
				id: 1,
				code: 'bj',
			}
		},
		methods:{
			cityId(id,code){
				this.id=id;
				this.code=code;
			},
			intro(city,trade){
				// console.log(city,trade);
			}
		},
		components:{
			Header,
			Banner,
			ItemList,
			WeLive,
			Footer
		},
		mounted(){
			this.cityId(this.id,this.code);
		}
	}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../../styles/main.less');
</style>