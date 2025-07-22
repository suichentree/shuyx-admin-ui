<template>
<div class="login_bg">
    <!-- 左上角logo+文字 -->
    <div class="top-left-container">
      <el-image 
        :src="logoImg" 
        fit="contain" 
        class="top-left-logo"
        style="width: 60px; height: 60px;"
      />
      <span class="top-left-text">SHUYX ADMIN UI</span>
    </div>

    <!-- 中间logo+文字 -->
    <div class="middle-logo-container">
      <el-image 
        :src="loginBoxBg" 
        fit="contain" 
        class="middle-logo"
        style="width: 300px; height: 300px;"
      />
      <p class="middle-text">SHUYX ADMIN UI</p>
      <p class="middle-text">高性能 · 精致 · 优雅</p>
      <p class="middle-text">基于 Vue3 + Element-Plus + JS 的个人网站前端</p>
    </div>
</div>  
</template>

<script setup>
import logoImg from '@/assets/logo.png' //logo图片 
import loginBoxBg from '@/assets/login-box-bg.svg' //背景图片
</script>

<style scoped>
.login_bg{ 
  background-color: rgba(49,57,78);
  background-size: cover; 
  height: 100%;
  position: relative; 
}

/* 左上角容器（logo+文字） */
.top-left-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
  display: flex; /* 水平排列 */
  align-items: center; /* 垂直居中对齐 */
  gap: 12px; /* logo与文字间距 */
}

.top-left-text {
  color: #fff; /* 深色文字适配背景 */
  font-size: 20px;
  font-weight: 600; /* 加粗 */
}

/* 中间容器（logo+文字） */
.middle-logo-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center; /* 文字居中 */
}

.middle-text {
  color: #fff;
  font-size: 18px;
  margin-top: 16px; /* 与logo的间距 */
  letter-spacing: 2px; /* 文字字间距 */
}
</style>
