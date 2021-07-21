import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
// 유저 정보
import user from '@/store/modules/user';
import programManage from '@/store/modules/programManage'; // 프로그램 데이터

export const store = new Vuex.Store({
  modules: {
    user,
    programManage
  }
})

export default store;