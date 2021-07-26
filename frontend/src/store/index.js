import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
// 유저 정보
import user from '@/store/modules/user';

export const store = new Vuex.Store({
  modules: {
    user
  }
})

export default store;