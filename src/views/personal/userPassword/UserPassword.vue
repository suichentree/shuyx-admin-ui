<template>
  <el-alert title="注意：重置密码后，将会自动退出系统。用户需要重新登录。" type="warning" :closable="false" show-icon style="margin-bottom: 10px"/>
  <el-form :model="form" label-width="auto" :rules="rules" ref="FormRef" label-position="right">
    <el-form-item label="用户编号" prop="userId">
      <el-input v-model="form.userId" placeholder="请输入" disabled />
    </el-form-item>
    <el-form-item label="用户名称" prop="userName">
      <el-input v-model="form.userName" placeholder="请输入" disabled />
    </el-form-item>
    <el-form-item label="输入旧密码" prop="oldPassword">
        <el-input
            v-model="form.oldPassword"
            class="w-50 m-2"
            placeholder="请输入旧密码"
            :prefix-icon="Lock"
            type="password"
            show-password
        />
    </el-form-item>
    <el-form-item label="输入新密码" prop="newPassword">
        <el-input
            v-model="form.newPassword"
            class="w-50 m-2"
            placeholder="请输入新密码"
            :prefix-icon="Lock"
            type="password"
            show-password
        />
    </el-form-item>
    <el-form-item label="确认新密码" prop="confirmNewPassword">
        <el-input
            v-model="form.confirmNewPassword"
            class="w-50 m-2"
            placeholder="请确认新密码"
            :prefix-icon="Lock"
            type="password"
            show-password
        />
    </el-form-item>
  </el-form>
  <span>
    <el-button type="primary" @click="submit">保存</el-button>
  </span>
</template>
<script setup>
import { ref,onMounted } from 'vue'
import UserAPIResources from '@/api/user.service.js'
import loginAPIResources from '@/api/login.service'
import { useUserStore } from '@/stores/userStore'
import { Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from "@/router"

// onMounted生命周期
onMounted(() => {
  search()
})

let equalToPassword = (rule, value, callback) => {
  if (form.value.newPassword !== value) {
    callback(new Error("两次输入的新密码不一致"));
  } else {
    callback();
  }
};

//表单校验规则
let rules = ref({
  userId:[{ required: true, message: '请输入账号ID', trigger: 'blur' }],
  userName: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
  oldPassword:[{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword:[{ required: true, message: '请输入新密码', trigger: 'blur' }],
  confirmNewPassword:[{ required: true, message: '请确认新密码', trigger: 'blur' },{ required: true, validator: equalToPassword, trigger: "blur" }]
})

//查询当前用户详细信息
let form = ref({
  userId:undefined,
  userName:undefined,
  oldPassword:undefined,
  newPassword:undefined,
  confirmNewPassword:undefined
})
function search(){
  let a = {
    userId:useUserStore().userInfo.userId
  }
  UserAPIResources.selectById(a).then((res) => {
    form.value.userId = res.data[0].userId
    form.value.userName = res.data[0].userName
  })
}

let FormRef = ref()
function submit(){
  FormRef.value.validate((valid) => {
    if (valid) {
      UserAPIResources.updateUserPassword(form.value).then((res)=>{
        if(res.code == 200){
          ElMessage.success("修改密码成功")
          logout()
        }
      })
    }
  })
}

//退出登录操作
function logout(){
    //调用登出接口
    loginAPIResources.logout().then(() => {
        //清除所有本地缓存数据,包括token
        window.localStorage.clear()
        router.push({ path: '/login' })
    });
}


</script>
<style scoped></style>