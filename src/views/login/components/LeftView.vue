<script setup>


</script>

<template>
<div class="login_bg">
    <div class="login_title">
        <h2>SHUYX ADMIN UI</h2>
        <h4>高性能 / 精致 / 优雅</h4>
        <p>基于Vue3 + Element-Plus 的个人网站前端。</p>
        <span><el-icon :size="40"><UserFilled /></el-icon></span>
        <span><el-icon :size="30"><Plus /></el-icon></span>
        <span><el-icon :size="40"><ElementPlus /></el-icon></span>
    </div>
    
</div>  
</template>


<style scoped>
.login_bg{ 
    background-image: url('@/assets/auth_banner.jpg'); 
    background-size: cover; /**图片填充方式 */
    height: 100%;   
}

.login_title{
    color: #fff;
    padding: 100px 40px;
}

</style>
