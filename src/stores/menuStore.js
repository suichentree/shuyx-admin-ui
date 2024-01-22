
import { ref,computed } from 'vue'
import { defineStore } from 'pinia'
import buildRouter from "@/utils/menuRouter"
import {constantRoutes} from "@/router"

//菜单信息store
export const useMenuStore = defineStore('menuStore', () => {
  //菜单信息
  const menuInfo = ref([])
  //设置菜单信息
  function setMenuInfo(obj){
    menuInfo.value = obj
  }
  //设置菜单信息
  function getMenuInfo(){
    return menuInfo.value
  }
  //动态路由信息
  const dynamicRouteInfo = computed(() => {
    //buildRouter方法,将后台传过来的用户菜单信息转换为vue-router可用的动态路由数组
    let dynamicRoute = []
    dynamicRoute = buildRouter(menuInfo.value)
    return dynamicRoute
  })
  //侧边栏菜单信息,侧边栏菜单就是常规路由+动态路由
  const sideBarMenuInfo = computed(()=>{
    let sideBarMenu = []
    sideBarMenu = constantRoutes.concat(dynamicRouteInfo.value)
    return sideBarMenu
  })
  return {menuInfo,dynamicRouteInfo,sideBarMenuInfo,setMenuInfo,getMenuInfo}
},{persist: true})
