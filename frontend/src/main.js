import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
// vue 라우터
import VueRouter from 'vue-router';
import { routes } from './router';
import axios from "axios";

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

// ::: 전역 함수 선언
Vue.prototype.$axios = axios;

Vue.use(VueRouter);

// ::: vue-router 선언
export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    // 페이지 이동시 화면 맨 위로
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }
});

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
