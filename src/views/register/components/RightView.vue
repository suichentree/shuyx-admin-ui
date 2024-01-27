<template>
<el-row class="row-bg" justify="center">
    <el-col :span="12" style="margin:60px 40px">
        <div class="login_a">
            <el-image :src="loginimg" fit="fill" />
            <label>SHUYX ADMIN UI</label>
        </div>
        <div style="text-align:center;font-size:20px;margin-bottom:10px">用户注册</div>
        <div class="login_b">
            <!-- 表单 -->
            <el-form :model="registerForm" label-width="100px" size="large" :rules="rules" ref="ruleFormRef">
                <el-form-item label="用户名称" prop="userName">   
                    <el-input
                        v-model="registerForm.userName"
                        class="w-50 m-2"
                        placeholder="请输入用户名"
                        :prefix-icon="User"
                        clearable 
                    />
                </el-form-item>
                <el-form-item label="登录密码" prop="passWord">
                    <el-input
                        v-model="registerForm.passWord"
                        class="w-50 m-2"
                        placeholder="请输入密码"
                        :prefix-icon="Lock"
                        type="password"
                        show-password
                    />
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input
                        v-model="registerForm.confirmPassword"
                        class="w-50 m-2"
                        placeholder="请再次输入密码"
                        :prefix-icon="Lock"
                        type="password"
                        show-password
                    />
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio-group  v-model="registerForm.gender">
                        <el-radio label="0">男</el-radio>
                        <el-radio label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker
                        v-model="registerForm.birthday"
                        type="date"
                        placeholder="选择出生日期"
                        value-format="YYYY-MM-DD"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%;" type="primary" @click="onSubmit" round>注册账号</el-button>
                </el-form-item>
                <el-form-item>
                    已有账号？
                    <el-link type="primary" :underline="false">登录账号</el-link>
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
import APIResources from '@/api/register.service'
import { ElMessage } from 'element-plus'
import router from "@/router";


//getCurrentInstance方法用于获取当前视图的实例。即proxy相当于this
const { proxy } = getCurrentInstance();

//登录表单
const registerForm = ref({
  userName:'',
  passWord:'',
  confirmPassword:'',
  gender:'',
  birthday:''
})

const equalToPassword = (rule, value, callback) => {
  if (registerForm.value.passWord !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

//表单校验规则
const rules = ref({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  passWord:[{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword:[{ required: true, message: '请输入确认密码', trigger: 'blur' },{ required: true, validator: equalToPassword, trigger: "blur" }],
  gender:[{ required: true, message: '请选择性别', trigger: 'blur' }],
  birthday:[{ required: true, message: '请选择出生日期', trigger: 'blur' }]
})
//登录
function onSubmit() {
    //先进行表单校验
    proxy.$refs.ruleFormRef.validate((valid) => {
        //若前端校验成功
        if (valid) {
            //调用登录接口
            APIResources.register(registerForm.value).then(res => {
                if(res.code == 200){
                    ElMessage.success("注册成功")
                    router.push({ path: '/login' })
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
  margin-bottom: 20px;
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
    width:90%;
}
</style>
