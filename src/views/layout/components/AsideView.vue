<script setup>
import logoImg from '@/assets/logo.png'
import { ref } from 'vue';

const isCollapse = ref(false);

</script>

<template>
  <el-scrollbar style="background-color:#304156;">
    <!-- logo和标题 -->
    <div style="height: 60px;line-height: 60px;text-align:center;">
      <el-image style="width: 40px; height: 40px;vertical-align: middle;margin-right: 10px;" :src="logoImg" fit="fill" />
      <span style="font-weight:bold;font-size: 14px;color:#fff;vertical-align: middle;">SHUYX ADMIN UI</span>
    </div>
    <!-- 侧边菜单 -->
    <el-menu
        :collapse="isCollapse"
        mode="vertical"
        :router="true" 
        background-color="#304156" 
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#bfcbd9">
      <el-sub-menu index="/home">
        <template #title>
          <el-icon><HomeFilled /></el-icon><span>首页</span>
        </template>
        <el-menu-item index="/home/dashboard">
          <template #title>
            <el-icon><Odometer /></el-icon><span>仪表板</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/home/demo">
          <template #title>
            <el-icon><StarFilled /></el-icon><span>demo</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/home/about">
          <template #title>
            <el-icon><StarFilled /></el-icon><span>关于</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><Tools /></el-icon><span>系统管理</span>
        </template>
        <el-menu-item index="/system/org">
          <el-icon><UserFilled /></el-icon>组织机构管理
        </el-menu-item>
        <el-menu-item index="/system/position">
          <el-icon><UserFilled /></el-icon>职位管理
        </el-menu-item>
        <el-menu-item index="/system/user">
          <el-icon><UserFilled /></el-icon>用户管理
        </el-menu-item>
        <el-menu-item index="/system/role">
          <el-icon><UserFilled /></el-icon>角色管理
        </el-menu-item>
        <el-menu-item index="/system/menu">
          <el-icon><UserFilled /></el-icon>菜单管理
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>


<style scoped>
.el-menu {
  border: none;
  height: 100%;
}

</style>
