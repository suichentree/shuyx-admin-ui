<template>
  <div style="padding:10px">
    此处图标都是element-plus中的内置图标。一共 {{ iconList.length }} 个
  </div>
  <el-row :gutter="20">
    <el-col :span="6" v-for="item in iconList" :key="item.value" :label="item.label" :value="item.value">
      <el-icon ><component :is="item.value"></component></el-icon>
       <span>{{ item.label }}</span>
    </el-col>
  </el-row>
</template>

<script setup>
//引入element-plus icon，获取element-plus内置的所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//icon数组
let iconList = []
//把图标的名称都添加到icon数组中
for (const [key] of Object.entries(ElementPlusIconsVue)) {
    let p = {
        value: key,
        label: key
    }
    iconList.push(p);
}









</script>

<style scoped>
.el-col{
  padding:5px;
}

</style>
