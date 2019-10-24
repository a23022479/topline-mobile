import Vue from 'vue'
import Vuex from 'vuex'
import { getUserLocal, setUserLocal } from '@/utils/userLocal.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getUserLocal()
  },
  mutations: {
    getUser (state, obj) {
      state.user = obj
      // 存到localstorage
      setUserLocal(obj)
    }
  },
  actions: {
  },
  modules: {
  }
})
