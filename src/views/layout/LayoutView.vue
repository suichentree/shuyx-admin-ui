<script setup>
// 组件注册
import Header from './components/HeaderView.vue'
import Aside from './components/AsideView.vue'
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <!--通过子路由来显示内容-->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-main {
  padding: 0px;
  background-color: #f6f8f9;
}

.el-header {
  padding: 0px;
}

.el-aside {
  padding: 0px;
}
</style>
