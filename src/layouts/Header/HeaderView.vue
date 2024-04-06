<template>
    <!--最外层容器 flex布局，space-between水平排列-->
    <div style="display:flex;justify-content:space-between;align-items:center;padding: 5px;">
        <!--左边区域 flex布局，flex-start水平排列，center垂直居中-->
        <div style="display: flex;justify-content:flex-start;align-items:center;">
            <div>
                <el-icon @click="changeExpand()" :size="20" v-if="sideIsExpand"><Expand/></el-icon>
                <el-icon @click="changeExpand()" :size="20" v-else><Fold/></el-icon>
            </div>
            <el-breadcrumb separator="/" style="padding: 10px;">
                <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="item.path">
                    <span v-if="index == breadCrumbList.length - 1">{{ item.name }}</span>
                    <span v-else>{{ item.name }}</span>
                </el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <!--右边区域 flex布局，flex-end水平排列，垂直居中-->
        <div style="display:flex;justify-content:flex-end;align-items:center;">
            <el-avatar :src="avatarImg"/>
            <span style="padding: 10px;">{{userStore.userInfo.userName}}</span>
            <el-dropdown trigger="click" style="padding: 10px;">
                <el-icon :size="20"><Setting/></el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
import { ref,watch } from 'vue';
import avatarImg from '@/assets/avatar.jpg'
import APIResources from '@/api/login.service'
//route
import { useRoute } from "vue-router"
const route = useRoute()
//router
import router from "@/router"
//UserStore
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
//HeaderStore
import { useHeaderStore } from '@/stores/headerStore'
const headerStore = useHeaderStore()
//侧边栏扩展
const sideIsExpand = ref(false)
const changeExpand = () => {
    sideIsExpand.value = !sideIsExpand.value
    headerStore.changeSideExpand()  //控制侧边栏伸展
}

//监控当前路由，组成面包屑导航列表
let breadCrumbList = ref([])
watch(() => route.matched, (to) => {
    breadCrumbList.value = to
},{immediate:true,deep:true})

//退出登录操作
function logout(){
    //调用登录接口
    APIResources.logout().then(() => {
        //清除所有本地缓存数据,包括token
        window.localStorage.clear()
        router.push({ path: '/login' })
    });
}

</script>
<style scoped>
</style>
