<template>
<div class="login_bg">
    <div class="login_title" style="color: #fff; padding: 100px 40px;">
        <h1>SHUYX ADMIN UI</h1>
        <h3>高性能 / 精致 / 优雅</h3>
        <p>基于Vue3 + Element-Plus 的个人网站前端。</p>
        <span><el-icon :size="40"><UserFilled /></el-icon></span>
        <span><el-icon :size="30"><Plus /></el-icon></span>
        <span><el-icon :size="40"><ElementPlus /></el-icon></span>
    </div>
</div>  
</template>

<script setup>

</script>
<style scoped>
.login_bg{ 
    background-image: url('@/assets/auth_banner.jpg'); 
    background-size: cover; 
    height: 100%;   
}
</style>
