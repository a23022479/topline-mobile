import Vue from 'vue'
import Router from 'vue-router'

// 使用路由
Vue.use(Router)

let router = new Router({
  routes: [
    // 路由重定向
    {
      path: '/',
      redirect: '/login'
    },
    // 登录路由
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login')
    },
    // 布局路由
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/layout'),
      children: [
        // 首页路由
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/home')
        }
      ]
    }
  ]
})
export default router
