<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="0">
          <img style="height: 55px; width: auto" :src="avatarImg" alt="Element logo" />
          <el-text tag="b" size="large" style="padding: 5px;">suichentree's blog</el-text>
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">首页</el-menu-item>
        <el-sub-menu index="2">
          <template #title>分类</template>
          <el-menu-item index="2-1">item one</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">标签</el-menu-item>
        <el-menu-item index="4">时间线</el-menu-item>
        <el-sub-menu index="5">
          <template #title>文档</template>
          <el-menu-item index="5-1">item one</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="6">
          <template #title>联系</template>
          <el-menu-item index="6-1">item one</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-main>
      <div>
        <img :src="headimg" style="width: 200px; border-radius: 50%" />
        <h1>suichentree's blog</h1>
        <p>历史是不断螺旋上升或螺旋下降的--- xxx</p>
      </div>
    </el-main>
    <el-row class="row-bg" justify="center">
      <el-col :span="20">
        <el-row class="row-bg">
          <el-col :span="16" style="padding: 0px 10px;">
            <!--文章列表-->
            <ArticleList/>
          </el-col>
          <el-col :span="8" style="padding: 0px 10px;">
            <AuthorInfo/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-footer>
      <el-text>
        <el-icon><UserFilled /></el-icon>
        suichentree
        <el-icon><Timer /></el-icon>
        2024/03/18
        <el-icon><PriceTag /></el-icon>
        java
      </el-text>
    </el-footer>
  </el-container>
</template>
<script setup>
import { ref } from 'vue'
import headimg from '@/assets/user.jpg'
import ArticleList from './components/ArticleList.vue';
import AuthorInfo from './components/AuthorInfo.vue';

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.el-header {
  height: 10vh;
}
.el-main {
  height: 90vh;
  padding: 0px;
  background: url('@/assets/bg.2cfdbb33.svg') center/cover no-repeat;
  text-align: center;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-card__body {
  padding: 10px;
}
.el-card__header {
  padding: 10px;
}
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
