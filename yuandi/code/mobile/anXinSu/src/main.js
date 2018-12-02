// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import Axios from 'axios'
import $ from 'jquery'
import '../static/yzm-cj/js/verify.js'
Vue.prototype.$axios = Axios
Vue.config.productionTip = false
import store from './store/index.js'
import '../node_modules/animate.css/animate.css'
// Axios.interceptors.require.use(function (require) {
//     return require;
//   }, function (error) {
//     return Promise.reject(error);
// });
Axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
