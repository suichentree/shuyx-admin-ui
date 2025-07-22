<template>
<el-row justify="center" align="middle">
    <el-col :span="24">
        <div class="login_a">
            <el-image :src="loginimg" fit="fill" style="height: 50px; width: 50px; padding: 10px" />
            <label>注册</label>
        </div>
        <div class="login_b">
            <!-- 表单 -->
            <el-form :model="registerForm" label-width="0px" style="width: 70%" size="large" :rules="rules" ref="ruleFormRef">
                <el-form-item prop="userName">   
                    <el-input
                        v-model="registerForm.userName"
                        class="w-50 m-2"
                        placeholder="用户名"
                        :prefix-icon="User"
                        clearable 
                    />
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input
                        v-model="registerForm.passWord"
                        class="w-50 m-2"
                        placeholder="密码"
                        :prefix-icon="Lock"
                        type="password"
                        show-password
                    />
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input
                        v-model="registerForm.confirmPassword"
                        class="w-50 m-2"
                        placeholder="确认密码"
                        :prefix-icon="Lock"
                        type="password"
                        show-password
                    />
                </el-form-item>
                <el-form-item prop="gender">
                    <el-radio-group  v-model="registerForm.gender">
                        <el-radio label="0">男</el-radio>
                        <el-radio label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="birthday">
                    <el-date-picker
                        v-model="registerForm.birthday"
                        type="date"
                        placeholder="出生日期"
                        value-format="YYYY-MM-DD"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%;" type="primary" @click="onSubmit" round>注册账号</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%;" type="default" @click="tologin" round>已有账号？去登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-col>
</el-row>
</template>
<script setup>
import { ref} from 'vue'
import loginimg from '@/assets/logo.png'
import { Lock , User } from '@element-plus/icons-vue'
import APIResources from '@/api/register.service'
import { ElMessage } from 'element-plus'
import router from "@/router";

//登录表单
let registerForm = ref({
  userName:'',
  passWord:'',
  confirmPassword:'',
  gender:'',
  birthday:''
})

let equalToPassword = (rule, value, callback) => {
  if (registerForm.value.passWord !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

//表单校验规则
let rules = ref({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  passWord:[{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword:[{ required: true, message: '请输入确认密码', trigger: 'blur' },{ required: true, validator: equalToPassword, trigger: "blur" }],
  gender:[{ required: true, message: '请选择性别', trigger: 'blur' }],
  birthday:[{ required: true, message: '请选择出生日期', trigger: 'blur' }]
})
//登录
let ruleFormRef =ref()
function onSubmit() {
    //先进行表单校验
    ruleFormRef.value.validate((valid) => {
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

//去登录
function tologin(){
    router.push({ path: '/login' })
}

</script>
<style scoped>

.login_a {
  display: flex; /* flex布局 */
  justify-content: center; /**水平居中 */
  align-items: center; /**垂直居中 */
  font-size: 30px;
  padding: 10px;
}

.login_b {
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>
