<script setup>
// 组件注册
import LeftView from './components/LeftView.vue'
import RightView from './components/RightView.vue'
</script>

<template>
  <el-row>
    <!-- 响应式栅格：移动端占24列（上下排列），平板/PC占12列（左右排列）
      xs超小屏幕（<768px）占满24列
      sm小屏幕（≥768px）占12列
      md中屏幕（≥992px）占12列
      lg大屏幕（≥1200px）占12列
    -->
    <el-col :xs="0" :sm="0" :md="12" :lg="12">
      <LeftView/>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12">
      <RightView/>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-row{ 
  width: 100%;
  height: 100%;
}
</style>
