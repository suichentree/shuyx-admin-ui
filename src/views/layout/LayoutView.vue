<script setup>
// 组件注册
import Header from './Header/HeaderView.vue'
import Aside from './Aside/AsideView.vue'
import TagsView from "./Header/TagsView.vue"
</script>

<template>
  <!--最外层容器高宽都为100%-->
  <el-container style="width: 100%;height: 100%;">
    <!--左边区域高100%,宽auto自适应,宽度会随着侧边栏的折叠而变化-->
    <el-aside style="padding: 0px;width: auto;height: 100%;">
      <Aside></Aside>
    </el-aside>
    <!--右边区域高100%,宽auto自适应-->
    <el-container style="height: 100%;width: auto;">
      <!--头部区域高auto自适应，宽100%-->
      <el-header style="padding: 0px;width: 100%;height:auto;">
        <Header></Header>
        <TagsView></TagsView>
      </el-header>
      <!--主区域高90%，宽100%，背景色灰白-->
      <el-main style="padding: 10px;width: 100%;height: 90%;background-color: #f6f8f9;">
        <!--通过router-view标签来显示嵌套路由的内容-->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
</style>
