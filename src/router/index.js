import { createRouter, createWebHistory } from 'vue-router'
/**
 * 布局页面（包含侧边栏，头部导航栏）
 * 除了注册登录等页面，其他页面都会嵌套在布局页面中展示。
 */
import LayoutView from '@/views/layout/LayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',              // 根路由默认重定向到/home路由
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/RegisterView.vue')
    },
    {
      path: '/home',                
      component: LayoutView,
      redirect: '/home/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/home/DashBoardView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/home/AboutView.vue')
        },
        { 
          path: 'demo', 
          name: 'demo',
          component: () => import('@/views/demo/DemoView.vue') //测试demo页面，一般用于写测试页面。
        }
      ]
    },
    {
      path: '/system',                
      component: LayoutView,
      redirect: '/system/user',
      children: [
        {
          path: 'org',
          name: 'org',
          component: () => import('@/views/org/OrgView.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('@/views/user/UserView.vue')
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('@/views/role/RoleView.vue')
        },
        {
          path: 'menu',
          name: 'menu',
          component: () => import('@/views/menu/MenuView.vue')
        },
        {
          path: 'position',
          name: 'position',
          component: () => import('@/views/position/PositionView.vue')
        }
      ]
    },
    {
      path: '/:catchAll(.*)',  //无法识别的路由，就会自动匹配到404页面
      name: '404',
      component: () => import('@/views/other/404View.vue')
    }
  ]
})

export default router
