<template>
  <!--作者信息-->
  <el-space fill wrap>
    <el-card style="width: auto; display: flex; justify-content: center; text-align: center">
      <img :src="avatarImg" style="width: 100px" />
      <h3>suichentree</h3>
      <span>文章 251</span>
      <el-divider direction="vertical" />
      <span>标签 63</span>
    </el-card>
    <el-card>
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
          style="box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1); padding: 10px; margin-bottom: 10px"
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
    <el-card style="width: auto">
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
</template>
<script setup>
import avatarImg from '@/assets/avatar.jpg'
</script>
<style></style>
