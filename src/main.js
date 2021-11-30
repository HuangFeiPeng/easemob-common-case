import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

import WebIM from '@/utils/easemob/initEasemob'

console.log('>>>>>>>WebIM', WebIM);

Vue.use(Antd)
Vue.config.productionTip = false

window.Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')