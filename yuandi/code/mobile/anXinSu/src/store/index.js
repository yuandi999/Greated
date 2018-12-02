import Vue from 'vue'// vue实例
import Vuex from 'vuex' //vue router

Vue.use(Vuex)

export default new Vuex.Store({
    state:{        //state  状仓库  所有的状态值放在这里管理
        login:window.localStorage.getItem("login") || false, 
        introduce:'http://www.dankegongyu.com/zhuanti/trade?city=bj&amp;trade=hlg', 
        citypos:'', 
        cityid:'1',
        city:"北京",
        code: 'bj',
        detail:[],
        detail2:[],
    },
     mutations:{    //mutations：修改仓库中状态值的方法 ，state的修改只有通过mutations才能修改
    //更改state 里的数据的方法
        changeLogin(state,val1){
            state.login=val1
        },
        changeIntroduce(state,val1){
            state.introduce=val1
        },
        changeCityPos(state,val1){
            state.citypos=val1
        },
        changeCityId(state,val1){
            state.cityid=val1
        },
        changeCity(state,val1){
            state.city=val1
        },
        changeDetail(state,val1){
            state.detail=val1
        },
        changeCode(state,val1){
            state.code=val1
        },
         changeDetail2(state,val1){
            state.detail2=val1
        },
    }
})