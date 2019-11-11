import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入vant
import Vant, { Lazyload } from 'vant'
// 时间插件
import dayjs from 'dayjs'
// 导入中文包
import 'dayjs/locale/zh-cn'
// 导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入vant样式
import 'vant/lib/index.css'
// 导入字体图标样式
import '@/styles/index.css'

// 导入自己封装的axios插件对象
import AxiosPlugs from '@/utils/request.js'
// 导入自己封装的登录判断插件
import loginPlugs from '@/utils/loginPlugs.js'
// 使用插件
dayjs.extend(relativeTime)
// 使用中文包
dayjs.locale('zh-cn')
// 使用插件
Vue.use(AxiosPlugs)
Vue.use(loginPlugs)
// 使用vant
Vue.use(Vant)
// options 为可选参数，无则不传
Vue.use(Lazyload)

Vue.config.productionTip = false

// 时间过滤器
Vue.filter('relativeTime', function (value) {
  return dayjs().from(dayjs(value))
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
