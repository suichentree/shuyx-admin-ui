<template>
  <!-- PC端：显示传统侧边栏（由LayoutView控制是否渲染） -->
  <!-- 移动端：显示抽屉 -->
  <template v-if="isMobile">
    <el-drawer
      :open="!isCollapse"
      placement="left"
      size="200px"
      :before-close="handleDrawerClose"
      style="background-color: #304156;"
    >
      <el-menu
        mode="vertical"
        :router="true"
        background-color="#304156"
        active-text-color="#ffd04b"
        text-color="#bfcbd9"
      >
        <LogoTitle />
        <SidebarItem v-for="route in sideMenuList" :key="route.path" :item="route" />
      </el-menu>
    </el-drawer>
  </template>
</template>

<script setup>
import LogoTitle from './LogoTitle.vue'
import SidebarItem from './SidebarItem.vue'
import { computed } from 'vue'
import { useHeaderStore } from '@/stores/headerStore'
import { useMenuStore } from '@/stores/menuStore'

// 获取Store状态
const headerStore = useHeaderStore()
const menuStore = useMenuStore()

// 侧边栏折叠状态（PC端使用）
const isCollapse = computed(() => headerStore.sideIsExpand)
// 移动端检测（窗口宽度<768px）
const isMobile = computed(() => window.innerWidth < 768)

// 抽屉关闭时更新折叠状态
const handleDrawerClose = () => {
  headerStore.changeSideExpand()
}
</script>