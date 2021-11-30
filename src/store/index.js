import Vue from 'vue'
import Vuex from 'vuex'

import Conversation from './modules/conversation'
import UserInfo from './modules/userInfo'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Conversation,
    UserInfo
  }
})