<template>
    <!-- 外层容器：增加背景色、阴影和内边距 -->
    <div style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      background: #ffffff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      border-bottom: 1px solid #f0f2f5;
    ">
        <!-- 左侧区域：优化间距和图标样式 -->
        <div style="
          display: flex;
          align-items: center;
          gap: 16px; 
        ">
            <!-- 折叠按钮：调整图标大小和颜色 -->
            <div>
                <el-icon 
                  @click="changeExpand()" 
                  :size="24" 
                  style="color: #606266; cursor: pointer; transition: color 0.2s;"
                  v-if="sideIsExpand"
                >
                  <Expand/>
                </el-icon>
                <el-icon 
                  @click="changeExpand()" 
                  :size="24" 
                  style="color: #606266; cursor: pointer; transition: color 0.2s;"
                  v-else
                >
                  <Fold/>
                </el-icon>
            </div>
            <!-- 面包屑：优化文字颜色和分隔符 -->
            <el-breadcrumb 
              separator="/" 
              style="padding: 0; color: #606266;"
            >
                <el-breadcrumb-item 
                  v-for="(item, index) in breadCrumbList" 
                  :key="item.path"
                  :style="{ fontWeight: index === breadCrumbList.length - 1 ? '500' : 'normal' }" 
                >
                    <span>{{ item.name }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 右侧区域：优化头像和操作区间距 -->
        <div style="
          display: flex;
          align-items: center;
          gap: 16px;  
        ">
            <!-- 头像：圆形+阴影 -->
            <el-avatar 
              :src="avatarImg" 
              style="
                width: 32px;
                height: 32px;
                border-radius: 50%;
                box-shadow: 0 0 4px rgba(0,0,0,0.1);
              "
            />
            <!-- 用户名：调整颜色和字体 -->
            <span style="color: #606266; font-size: 14px;">{{userStore.userInfo.userName}}</span>
            <!-- 设置下拉：优化图标样式 -->
            <el-dropdown 
              trigger="click" 
              style="color: #606266; transition: color 0.2s;"
            >
                <el-icon :size="20" style="cursor: pointer;">
                  <Setting/>
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout" style="font-size: 14px;">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { ref,watch } from 'vue';
import defalutAvatarImg from '@/assets/avatar.jpg'
import APIResources from '@/api/login.service'
//route
import { useRoute } from "vue-router"
let route = useRoute()
//router
import router from "@/router"
//UserStore
import { useUserStore } from '@/stores/userStore'
let userStore = useUserStore()
//HeaderStore
import { useHeaderStore } from '@/stores/headerStore'

//用户头像
let avatarImg = ref(undefined)
if(userStore.userInfo.avatar != null){
    // 远程的用户头像
    // avatarImg.value = 'http://localhost:39000/user-avatar-bucket/'+userStore.userInfo.avatar

    // 本地的用户头像
    avatarImg.value = defalutAvatarImg
}else{
    avatarImg.value = defalutAvatarImg
}

//侧边栏扩展
let sideIsExpand = ref(false)
let changeExpand = () => {
    sideIsExpand.value = !sideIsExpand.value
    useHeaderStore().changeSideExpand()  //控制侧边栏伸展
}

//监控当前路由，组成面包屑导航列表
let breadCrumbList = ref([])
watch(() => route.matched, (to) => {
    breadCrumbList.value = to
},{immediate:true,deep:true})

//退出登录操作
function logout(){
    //调用登出接口
    APIResources.logout().then(() => {
        //清除所有本地缓存数据,包括token
        window.localStorage.clear()
        router.push({ path: '/login' })
    });
}

</script>

<style scoped>
/* 折叠图标悬停效果 */
.el-icon:hover {
  color: #409eff !important;
}

/* 下拉菜单样式优化 */
.el-dropdown-menu__item {
  padding: 8px 16px;
}
</style>
