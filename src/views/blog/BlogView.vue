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
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">Home</el-menu-item>
        <el-sub-menu index="2">
          <template #title>分类</template>
          <el-menu-item index="2-1">item one</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">标签</el-menu-item>
        <el-menu-item index="31">时间线</el-menu-item>
        <el-sub-menu index="4">
          <template #title>文档</template>
          <el-menu-item index="2-1">item one</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="41">
          <template #title>联系</template>
          <el-menu-item index="2-1">item one</el-menu-item>
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
    <el-row>
      <el-col :span="16" style="padding: 0px 20px;">
        <el-space direction="vertical" style="padding: auto">
          <el-card v-for="i in 10" :key="i" class="box-card" style="width: 60vw">
            <el-link href="https://element-plus.org" target="_blank"><h2>default</h2></el-link>
            <div></div>
            <el-text>
              <el-icon><UserFilled /></el-icon>
              suichentree
              <el-icon><Timer /></el-icon>
              2024/03/18
              <el-icon><PriceTag /></el-icon>
              java
            </el-text>
          </el-card>
          <el-pagination background layout="prev, pager, next, jumper" :total="1000" />
        </el-space>
      </el-col>
      <el-col :span="8">
        <el-space direction="vertical">
          <el-card style="width: 30vw; display: flex; justify-content: center; text-align: center">
            <img :src="avatarImg" style="width: 100px" />
            <h3>suichentree</h3>
            <span>文章 251</span>
            <el-divider direction="vertical" />
            <span>标签 63</span>
          </el-card>
          <el-card style="width: 30vw">
            <template #header>
              <el-text>
                <el-icon>
                  <ElementPlus />
                </el-icon>
                分类
              </el-text>
            </template>
            <ul style="list-style: none; padding-left: 0px">
              <li
                v-for="i in 10"
                :key="i"
                style="
                  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
                  padding: 10px;
                  margin-bottom: 10px;
                "
              >
                <a
                  href="https://element-plus.org"
                  target="_blank"
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    text-decoration: none;
                  "
                >
                  <span style="color: black">前端</span>
                  <el-tag type="primary" effect="dark">16</el-tag>
                </a>
              </li>
            </ul>
          </el-card>
          <el-card style="width: 30vw">
            <template #header>
              <el-text>
                <el-icon>
                  <ElementPlus />
                </el-icon>
                标签
              </el-text>
            </template>
            <el-space wrap>
              <el-tag v-for="i in 10" :key="i" effect="dark"> 111 </el-tag>
            </el-space>
          </el-card>
        </el-space>
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
import avatarImg from '@/assets/user2.png'
import headimg from '@/assets/user.jpg'

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
