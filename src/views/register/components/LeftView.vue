<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item index="0">
      <el-image :src="loginimg" fit="fill" style="height: auto; width: 50px; padding: 10px" />
      <label style="font-weight: bold">SHUYX ADMIN UI</label>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" @click="tologin">返回登录</el-menu-item>
  </el-menu>
</template>

<script setup>
import loginimg from '@/assets/logo.png'
import router from '@/router'
function tologin(){
    router.push({ path: '/login' })
}
</script>
<style>
.flex-grow {
  flex-grow: 1;
}
</style>
