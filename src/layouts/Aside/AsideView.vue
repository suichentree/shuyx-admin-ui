<template>
  <!-- 移动端使用抽屉作为侧边栏 -->
  <template v-if="isMobile">
    <!-- 此处的div标签必须存在，否则更改.el-drawer__body样式无法生效 -->
     <div>
       <!-- v-model属性控制抽屉是否展开，用sideIsExpand变量控制。size="auto" 表示抽屉宽度自适应 -->
        <el-drawer
          v-model="sideIsExpand"
          direction="ltr"
          :with-header="false"
          size="auto"
          :before-close="handleDrawerClose"
          style="background-color: #304156;"
        > 
          <el-scrollbar style="background-color: #304156;height:100%;">
            <!-- collapse属性用于控制侧边栏菜单是否展开。在移动端的情况下默认为false -->
            <el-menu
              style="border: none;"
              mode="vertical"
              :collapse="false"
              :router="true"
              background-color="#304156"
              active-text-color="#ffd04b"
              text-color="#bfcbd9"
            > 
              <!-- 侧边栏logo -->
              <LogoTitle />
              <!-- 侧边栏菜单-->
              <SidebarItem v-for="route in sideMenuList" :key="route.path" :item="route" />
            </el-menu>
          </el-scrollbar>
          
        </el-drawer>
      </div>
  </template>
  <!-- PC端使用侧边菜单作为侧边栏 -->
  <template v-else>
    <el-scrollbar style="background-color: #304156;height:100%">
      <!-- collapse属性用于控制侧边栏菜单是否展开。桌面端的情况下通过sideIsExpand变量控制-->
      <el-menu
        style="border: none;"
        mode="vertical"
        :collapse="sideIsExpand"
        :router="true"
        background-color="#304156"
        active-text-color="#ffd04b"
        text-color="#bfcbd9"
      > 
        <!-- 侧边栏logo -->
        <LogoTitle />
        <!-- 侧边栏菜单-->
        <SidebarItem v-for="route in sideMenuList" :key="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
  </template>
</template>
<script setup>
import { computed } from 'vue'
//导入headerStore
import { useHeaderStore } from '@/stores/headerStore'
//导入MenuStore
import { useMenuStore } from '@/stores/menuStore'
//导入移动端store
import { useMobileStore } from '@/stores/mobileStore'
import LogoTitle from './LogoTitle.vue'
import SidebarItem from './SidebarItem.vue'

// 获取移动端变量，判断是否是移动端
const isMobile = computed(() => {
  return useMobileStore().isMobile
})

// 获取HeaderStore中的sideIsExpand状态。赋值给sideIsExpand。计算属性，才会实时更新
const sideIsExpand = computed(() => {
  return useHeaderStore().sideIsExpand
})

// 抽屉关闭时更新折叠状态
const handleDrawerClose = () => {
  useHeaderStore().changeSideExpand()
}

//获取侧边栏菜单信息
let sideMenuList = useMenuStore().sideBarMenuInfo

</script>
<style scoped>
/* 使用深度选择器穿透作用域，移除抽屉内容区域默认内边距 */
::v-deep(.el-drawer__body) {
  padding: 0px;
}
</style>
