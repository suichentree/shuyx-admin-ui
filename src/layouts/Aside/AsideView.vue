<template>
  <el-scrollbar style="background-color: #304156;height:100%">
    <!-- 侧边栏 -->
    <el-menu
      style="border: none;"
      :collapse="isCollapse"
      mode="vertical"
      :router="true"
      background-color="#304156"
      active-text-color="#ffd04b"
      text-color="#bfcbd9"
    >
      <!--LogoTitle-->
      <LogoTitle />
      <!--菜单-->
      <SidebarItem v-for="route in sideMenuList" :key="route.path" :item="route" />
    </el-menu>
  </el-scrollbar>
</template>
<script setup>
import LogoTitle from './LogoTitle.vue'
import SidebarItem from './SidebarItem.vue'
import { computed } from 'vue'
//导入headerStore，从headerStore中获取侧边栏伸展变量
import { useHeaderStore } from '@/stores/headerStore'
// isCollapse需要设置为计算属性，计算属性才会实时更新
const isCollapse = computed(() => {
  return useHeaderStore().sideIsExpand
})

//导入MenuStore，获取侧边栏菜单信息
import { useMenuStore } from '@/stores/menuStore'
let sideMenuList = useMenuStore().sideBarMenuInfo



</script>
<style scoped>
</style>
