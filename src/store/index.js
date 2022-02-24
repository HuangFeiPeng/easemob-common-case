import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate' //Vuex存储持久化

import Conversation from './modules/conversation';
import UserInfo from './modules/userInfo';
import MsgList from './modules/msgList';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Conversation,
    UserInfo,
    MsgList,
  },
  plugins: [persistedState({
    storage: window.localStorage
  })]
});