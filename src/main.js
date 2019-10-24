import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入vant
import Vant from 'vant'
// 导入vant样式
import 'vant/lib/index.css'
// 导入字体图标样式
import '@/styles/index.css'

// 导入自己封装的axios插件对象
import AxiosPlugs from '@/utils/request.js'
// 使用插件
Vue.use(AxiosPlugs)
// 使用vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
