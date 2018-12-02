import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/Home/Home';
import My from '../components/pages/My/My';
import Reg from '../components/pages/My/Reg';
import Login from '../components/pages/My/Login';
import MyInfo from '../components/pages/My/MyInfo';
import Introduce from '../components/pages/Introduce/Introduce';
import List from '../components/pages/List/List';
import Detail from '../components/pages/Detail/Detail';
import Detail2 from '../components/pages/Detail/Detail2';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
        path: '/my',
        name: 'My',
        component: My,
        children:[
            {path: 'reg',name: 'Reg',component: Reg},
            {path: 'login',name: 'Login', component: Login},
            {path: 'myinfo',name: 'MyInfo', component: MyInfo}
        ]
    },
    {
      path: '/introduce',
      name: 'Introduce',
      component: Introduce
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
     {
      path: '/detail2',
      name: 'Detail2',
      component: Detail2
    },
  ]
})
