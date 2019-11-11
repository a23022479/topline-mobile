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
    // 未登录状态跳转的登录路由
    {
      path: '/login/nologin',
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
        },
        // 搜索路由
        {
          path: '/search',
          name: 'search',
          component: () => import('../views/search')
        },
        {
          path: '/searchlist/:key',
          name: 'searchlist',
          component: () => import('../views/searchlist')
        },
        // 用户
        {
          path: '/me',
          name: 'me',
          component: () => import('../views/me')
        }
      ]
    },
    // 详情页面路由
    {
      path: '/detail/:artid',
      name: 'detail',
      component: () => import('../views/detail')
    }
  ]
})
export default router
