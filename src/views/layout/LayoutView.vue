<script setup>
// 组件注册
import Header from './components/HeaderView.vue'
import Aside from './components/AsideView.vue'
</script>

<template>
  <el-container style="width: 100%;height: 100%;">
    <el-aside style="padding: 0px;width: 15%;height: 100%;">
      <Aside></Aside>
    </el-aside>
    <el-container style="width: 85%;height: 100%;">
      <el-header style="padding: 0px;width: 100%;height: 10%;">
        <Header></Header>
      </el-header>
      <el-main style="padding: 10px;width: 100%;height: 90%;background-color: #f6f8f9;">
          <!--通过子路由来显示内容-->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>

.el-main {
  /* padding: 0px;
  background-color: #f6f8f9;
  height:90%; */
}

.el-header {
  /* padding: 0px;
  height:10%; */
}

.el-aside {
  /* padding: 0px;
  width: 15%;
  height:100%; */
}
</style>
