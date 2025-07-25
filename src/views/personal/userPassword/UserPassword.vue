<template>
  <!-- 主容器卡片 -->
  <el-card 
    shadow="always" 
    :body-style="{ padding: '24px 32px' }" 
    style="max-width: 100%; border-radius: 8px;"
  >
    <el-alert 
      title="注意：重置密码后，将会自动退出系统。用户需要重新登录。" 
      type="warning" 
      :closable="false" 
      show-icon
      style="margin-bottom: 20px; border-radius: 6px; padding: 12px 16px;"
    />

    <el-form 
      :model="form" 
      label-width="auto" 
      :rules="rules" 
      ref="FormRef" 
      label-position="left"
      style="max-width: 480px;"
    >
      <!-- 用户编号（禁用） -->
      <el-form-item label="用户编号" prop="userId">
        <el-input 
          v-model="form.userId" 
          placeholder="请输入" 
          disabled 
          style="background: #f8f9fa; border-radius: 6px;"
        />
      </el-form-item>

      <!-- 用户名称（禁用） -->
      <el-form-item label="用户名称" prop="userName">
        <el-input 
          v-model="form.userName" 
          placeholder="请输入" 
          disabled 
          style="background: #f8f9fa; border-radius: 6px;"
        />
      </el-form-item>

      <!-- 旧密码输入 -->
      <el-form-item label="输入旧密码" prop="oldPassword">
        <el-input
          v-model="form.oldPassword"
          placeholder="请输入旧密码"
          :prefix-icon="Lock"
          type="password"
          show-password
          style="border-radius: 6px;"
        />
      </el-form-item>

      <!-- 新密码输入 -->
      <el-form-item label="输入新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          placeholder="请输入新密码"
          :prefix-icon="Lock"
          type="password"
          show-password
          style="border-radius: 6px;"
        />
      </el-form-item>

      <!-- 确认新密码 -->
      <el-form-item label="确认新密码" prop="confirmNewPassword">
        <el-input
          v-model="form.confirmNewPassword"
          placeholder="请确认新密码"
          :prefix-icon="Lock"
          type="password"
          show-password
          style="border-radius: 6px;"
        />
      </el-form-item>
    </el-form>

    <!-- 保存按钮 -->
    <div style="margin-top: 24px; text-align: left;">
      <el-button 
        type="primary" 
        @click="submit"
        style="padding: 8px 24px; border-radius: 6px;"
      >
        保存
      </el-button>
    </div>
  </el-card>
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
<style scoped>
/* 输入框聚焦效果 */
.el-input:focus, .el-input:hover {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64,158,255,0.1);
}

/* 禁用输入框样式优化 */
.el-input[disabled] {
  background-color: #f8f9fa;
  border-color: #e4e7ed;
  color: #606266;
}

/* 按钮悬停动画 */
.el-button:not(.is-disabled):hover {
  transform: translateY(-1px);
  transition: transform 0.1s ease;
}

/* 表单标签样式 */
.el-form-item__label {
  font-size: 14px;
  color: #303133;
}

/* 校验错误提示样式 */
.el-form-item__error {
  padding-top: 4px;
  font-size: 12px;
}
</style>