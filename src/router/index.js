import { createRouter, createWebHistory } from 'vue-router'
import { useMenuStore } from '@/stores/menuStore'

// 布局页面（包含侧边栏，头部导航栏）。 除了注册登录等少数页面，其他页面都会嵌套在布局页面的main区域中展示。
import LayoutView from '@/views/layout/LayoutView.vue'
//常规路由,任何用户都可访问的路由
export const constantRoutes = [
  {
    path: '/',
    name: "/",
    redirect: '/login', //根路由默认重定向到/login路由
    hidden: true
  },
  {
    path: '/login',
    name: "登录",
    component: () => import('@/views/login/LoginView.vue'),
    hidden: true
  },
  {
    path: '/register',
    name: "注册",
    component: () => import('@/views/register/RegisterView.vue'),
    hidden: true
  },
  {
    path: '/home',
    name: "首页",
    icon:"HomeFilled",
    component: LayoutView,
    hidden: false,
    children: [
      {
        path: '/home/index',
        name: '控制台',
        icon:"UserFilled",
        component: () => import('@/views/home/HomeView.vue')
      }
    ]
  },
  {
    path: '/demo',
    name: "模板",
    icon:"HomeFilled",
    component: LayoutView,
    hidden: false,
    children: [
      {
        path: '/demo/test',
        name: '测试',
        icon:"UserFilled",
        component: () => import('@/views/demo/DemoView.vue')
      }
    ]
  },
  {
    path: '/other',
    name: "其他",
    icon:"Tools",
    component: LayoutView,
    hidden: false,
    children: [
      {
        path: '/other/about',
        name: 'about',
        icon:"UserFilled",
        component: () => import('@/views/other/AboutView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

//是否已加载过动态路由
let isAddDynamicRouter = false

//
/**
 * router路由前置守卫，刷新页面后会重新执行一次beforeEach方法
 * 1. 如果访问login,则直接放行
 * 2. 获取token，如果token获取不到，则表示尚未登录，重新访问login
 * 3. 如果访问的是其他页面，则判断是否已经添加动态路由。若没有添加，则添加动态路由。
 */
router.beforeEach(async (to,from,next) => {
  // 如果访问的是登录界面则直接放行
  if (to.path === '/login') {
    return next()
  }
  // 如果本地存储中的token无法获取，表示用户尚未登录了。直接跳转到login页面，重新登录
  let token = window.localStorage.getItem("shuyxWebsiteToken")
  if(!token){
    return next("/login")
  }
  //判断是否添加了动态路由
  if(!isAddDynamicRouter){
    //获取menuStore中存储的动态路由信息
    let dynamicRoute = useMenuStore().dynamicRouteInfo
    if (dynamicRoute.length !== 0) {
        await dynamicRoute.forEach(obj =>{
            router.addRoute(obj)
        })
        //手动添加，若路由路径无法匹配，就会自动匹配到404页面
        router.addRoute({
            path: '/:catchAll(.*)',
            name: '404',
            component: () => import('@/views/other/404View.vue')
        })   
    }
    isAddDynamicRouter = true
    //中断此次的路由，重新进行下一次路由。即重新执行beforeEach
    next({ ...to, replace: true })
  }else{
    //放行当前路由
    next()
  }
})

export default router
