<script setup>
import avatarImg from '@/assets/avatar.jpg'
import { ref } from 'vue';

const isExpand = ref(true)

const changeExpand = () => {
    isExpand.value = !isExpand.value
}

//退出登录操作
function logout(){

}

</script>

<template>
    <el-row class="navbar" align="middle">
        <el-col :span="2"  @click="changeExpand()">
            <el-icon :size="20" style="margin: 0px 20px;" v-if="isExpand"><Fold/></el-icon>
            <el-icon :size="20" style="margin: 0px 20px;" v-else ><Expand/></el-icon>
        </el-col>
        <el-col :span="8">
            <el-breadcrumb separator="/" style="height:60px;line-height:60px;">
                <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                <el-breadcrumb-item
                ><a href="/">promotion</a></el-breadcrumb-item
                >
                <el-breadcrumb-item>list</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="14" style="display: flex;justify-content: right;align-items: center;">
            <el-avatar :src="avatarImg"/>
            <span style="margin: 0px 10px;">管理员123</span>
            <el-dropdown trigger="click" >
                <el-icon :size="20"><Setting/></el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>View</el-dropdown-item>
                        <el-dropdown-item>Add</el-dropdown-item>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<style scoped>
.navbar{
    height: 60px;
}
</style>
