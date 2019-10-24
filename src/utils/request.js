// 封装与axios有关的逻辑为一个插件

// 导入axios
import axios from 'axios'
// 导入状态管理
import store from '@/store'
// 创建一个axios实例
const instance = axios.create({
  // 设置基准地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0'
})

// 再创建一个axios实例,改变基准地址
const instance2 = axios.create({
  // 设置基准地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_1'
})

// 设置请求拦截器
instance.interceptors.request.use(
  function (config) {
    // config的所有请求信息
    // 判断是否是登录状态
    // 如果是登录状态,就给请求头添加token,每次axios请求会携带token
    let user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // 错误处理
    return Promise.reject(error)
  }
)

// 设置响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 服务器响应回来的数据
    return response
  },
  function (error) {
    // 错误处理
    return Promise.reject(error)
  }
)

// 设置请求拦截器2
instance2.interceptors.request.use(
  function (config) {
    // config的所有请求信息
    // 判断是否是登录状态
    // 如果是登录状态,就给请求头添加token,每次axios请求会携带token
    let user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // 错误处理
    return Promise.reject(error)
  }
)

// 设置响应拦截器2
instance2.interceptors.response.use(
  function (response) {
    // 服务器响应回来的数据
    return response
  },
  function (error) {
    // 错误处理
    return Promise.reject(error)
  }
)

// 创建一个插件对象
const Myplugs = {
  // 添加一个install方法
  install: function (Vue) {
    // 挂载到vue实例
    Vue.prototype.$http = instance
    Vue.prototype.$http2 = instance2
  }
}

// 暴露插件对象
export default Myplugs
