import BackTop from './components/pages/BackTop';
let  scrollEvent=function(distance,vnode){
  // return function(){


	let bodyDistance=document.documentElement.scrollTop// 获取当前位置
	   //根据距离修改显示隐藏
  	if (bodyDistance>=distance) {
  		if (vnode.context.isShow==false) {
  			vnode.context.isShow=true
  		}
  		
  	}else{
  		if (vnode.context.isShow) {
  			vnode.context.isShow=false
  		}
  		
  	}
   // }
}

export default{
	install(Vue){
		Vue.component('back-top',BackTop)
		Vue.directive('scroll-hide',{
        bind(el,binding,vnode){
           // 
           let distance=el.getAttribute('scroll-hide-distance');//设定的fa值

          window.addEventListener('scroll',function(){
            scrollEvent(distance,vnode)
          })
         
        },
        unbind(el,binding,vnode){
        	 console.log('解绑')
          let distance=el.getAttribute('scroll-hide-distance');//设定的fa值
        	   window.removeEventListener('scroll',function(){scrollEvent(distance,vnode)})
              // window.removeEventListener('scroll',fun) 

        }
		})
		//创建自定义指令
    // 实现回到顶部
    Vue.directive('go-top',{
      bind(el,binding,vnode){
          //监听元素是否被点击
          console.log(binding,52)
          let eventType=binding.arg
          el.addEventListener(eventType,()=>{  //点击
            console.log('点击')
            document.documentElement.scrollTop=0;  
          })
         // 
      }
    })

	}
}