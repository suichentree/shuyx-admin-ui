<script setup>
// 引入各个组件和文件
import Header from './Header/HeaderView.vue'
import Aside from './Aside/AsideView.vue'
import TagsView from "./Header/TagsView.vue"
import { useMobileStore } from '@/stores/mobileStore'
import { onMounted, onUnmounted } from 'vue'

// onMounted生命周期：根组件挂载时启动监听
// 调用useMobileStore的handleResize方法监听窗口大小变化，判断是否移动端，
onMounted(() => {
  window.addEventListener('resize', useMobileStore().handleResize)
  useMobileStore().handleResize() // 初始化立即执行一次
})

// onUnmounted生命周期：根组件卸载时停止监听
onUnmounted(() => {
  window.removeEventListener('resize', useMobileStore().handleResize)
})

</script>

<template>
  <!--最外层容器高宽都为100%-->
  <el-container style="width: 100%;height: 100%;">
    <!--左边区域高100%,宽auto自适应,宽度会随着侧边栏的折叠而变化-->
    <el-aside style="padding: 0px;width: auto;height: 100%;">
      <!-- 侧边栏组件 -->
      <Aside></Aside>
    </el-aside>
    <!--右边区域高100%,宽auto自适应-->
    <el-container style="height: 100%;width: auto;">
      <!--头部区域高auto自适应，宽100%-->
      <el-header style="padding: 0px;width: 100%;height:auto;">
        <!--头部导航栏组件-->
        <Header></Header>
        <!--标签栏tagview组件-->
        <TagsView></TagsView>
      </el-header>
      <!--主区域高auto自适应，宽100%，背景色灰白-->
      <el-main style="padding: 10px;width: 100%;height: auto;background-color: #f6f8f9;">
        <!--通过router-view标签来显示嵌套路由对应的页面内容-->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
</style>
