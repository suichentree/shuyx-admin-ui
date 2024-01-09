<script setup>
// 组件注册
import LeftView from './components/LeftView.vue'
import RightView from './components/RightView.vue'
</script>

<template>
  <el-row>
    <el-col :span="8">
      <LeftView/>
    </el-col>
    <el-col :span="16">
      <RightView/>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-row{ width: 100%;height: 100%;}
</style>
