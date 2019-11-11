import Vue from 'vue'
import router from '@/router'
import { Toast } from 'vant'
import store from '@/store'
Vue.use(Toast)

const loginPlugs = {}
loginPlugs.install = function (Vue) {
  Vue.prototype.$login = function () {
    // 判断用是否登录
    let user = store.state.user
    if (!user) {
      Toast.fail('请先登录')
      setTimeout(() => {
        router.push('/login/nologin')
      }, 1000)
      // 结束代码执行
      return false
    }
    // 如果登录了,就继续往下执行
    return true
  }
}
export default loginPlugs
