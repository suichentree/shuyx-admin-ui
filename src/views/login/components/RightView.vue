<template>
<el-row class="row-bg" justify="center">
    <el-col :span="12" style="margin:130px 50px">
        <div class="login_a">
            <el-image :src="loginimg" fit="fill" />
            <label>SHUYX ADMIN UI</label>
        </div>
        <div class="login_b">
            <!-- 表单 -->
            <el-form :model="loginform" label-width="0" size="large" :rules="rules" ref="ruleFormRef">
                <el-form-item prop="userName">   
                    <el-input
                        v-model="loginform.userName"
                        class="w-50 m-2"
                        placeholder="用户名 / 手机 / 邮箱"
                        :prefix-icon="User"
                        clearable 
                    />
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input
                        v-model="loginform.passWord"
                        class="w-50 m-2"
                        placeholder="请输入密码"
                        :prefix-icon="Lock"
                        type="password"
                        show-password
                    />
                </el-form-item>
                <el-form-item >
                    <el-col :span="12"><el-checkbox v-model="isRemember" label="记住账号" size="large" /></el-col>
                    <el-col :span="12" class="login-forgot">
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%;" type="primary" @click="onSubmit" round>登录</el-button>
                </el-form-item>
                <el-form-item>
                    还没有账号？
                    <el-link type="primary" :underline="false">注册账号</el-link>
                </el-form-item>
            </el-form>
        </div>
    </el-col>
</el-row>
</template>
<script setup>
import { ref , getCurrentInstance} from 'vue'
import loginimg from "@/assets/logo.png"
import { Lock , User } from '@element-plus/icons-vue'
import APIResources from '../LoginView.service'
import { ElMessage } from 'element-plus'
import router from "@/router";


//getCurrentInstance方法用于获取当前视图的实例。即proxy相当于this
const { proxy } = getCurrentInstance();

//登录表单
const loginform = ref({
  userName: '',
  passWord: ''
})

const isRemember = ref(false)

//表单校验规则
const rules = ref({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  passWord:[{ required: true, message: '请输入密码', trigger: 'blur' }]
})
//登录
function onSubmit() {
    //先进行表单校验
    proxy.$refs.ruleFormRef.validate((valid) => {
    //若前端校验成功
    if (valid) {
        //调用登录接口
        APIResources.login(loginform.value).then(res => {
            if(res.code == 200){
                ElMessage.success("登录成功")
                router.push({ path: '/home' })
            }else{
                ElMessage.error("Code: "+res.code+",Message: "+res.message)
            }
        });
    }
  })
}

</script>

<style scoped>
.login_a{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-bottom: 30px;
}

.login_b{
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-forgot{
    text-align: right;
}
.el-image{
  width: 50px; 
  height: 50px;
  margin-right: 10px;
}
.el-form{
    width:70%;
}
</style>
