<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'My',
		data(){
			return {
				test: "My",
				
			}
		},
		methods:{
			isLogin(){
				if(this.$store.state.login){
					this.$router.replace("/my/myinfo");
				}
				else{
					this.$router.replace("/my/login");
				}
			}
		},
		created(){
			this.isLogin()
		}
	}
</script>

<style type="text/css" lang="less" scoped>
@import url('../../../styles/main.less');
</style>