<template>
<el-row justify="center" align="middle">
    <el-col :span="12">
        <div class="login_a">
            <el-image :src="loginimg" fit="fill" style="height:50px;width:50px;padding:10px;" />
            <label>SHUYX ADMIN UI</label>
        </div>
        <div class="login_b">
            <!-- 表单 -->
            <el-form :model="loginform" label-width="0" size="large" :rules="rules" ref="ruleFormRef" style="width:60%">
                <el-form-item prop="userName">   
                    <el-input
                        v-model="loginform.userName"
                        placeholder="用户名 / 手机 / 邮箱"
                        :prefix-icon="User"
                        clearable 
                    />
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input
                        v-model="loginform.passWord"
                        placeholder="请输入密码"
                        :prefix-icon="Lock"
                        type="password"
                        show-password
                    />
                </el-form-item>
                <el-form-item >
                    <el-col :span="12"><el-checkbox v-model="isRemember" label="记住账号" size="large" /></el-col>
                    <el-col :span="12" style="text-align:right;">
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%;" type="primary" @click="onSubmit" round :loading="loginLoading">登录</el-button>
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
import { ElMessage } from 'element-plus'
import router from "@/router";
import LoginAPIResources from '@/api/login.service'
import UserAPIResources from "@/api/user.service"
import MenuAPIResources from "@/api/menu.service"
//menuStore
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
//userStore
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()

//getCurrentInstance方法用于获取当前视图的实例。即proxy相当于this
const { proxy } = getCurrentInstance();

//登录表单
const loginform = ref({
  userName: undefined,
  passWord: undefined
})

const isRemember = ref(false)
const loginLoading = ref(false)

//表单校验规则
const rules = ref({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  passWord:[{ required: true, message: '请输入密码', trigger: 'blur' }]
})
//登录
function onSubmit() {
    
    //先进行表单校验
    proxy.$refs.ruleFormRef.validate((valid) => {
    if (valid) {
        loginLoading.value = true
        //调用登录接口
        LoginAPIResources.login(loginform.value).then(res => {
            if(res.code == 200){
                ElMessage.success("登录成功")
                router.push({ path: '/home' })
                //存token到localStorage中
                localStorage.setItem("shuyxWebsiteToken",res.data)
                //获取用户信息
                getUserInfo()
                //获取用户菜单信息
                getUserMenuInfo()
            }
        }).finally(()=>{
            loginLoading.value = false
        });
    }
  })
}

//获取用户信息
function getUserInfo(){
    UserAPIResources.getUserInfoByToken().then(res => {
        //把获取的用户信息保存到userStore中
        userStore.setUserInfo(res.data)
    });
}

//获取用户菜单信息
function getUserMenuInfo(){
    //调用登录接口
    MenuAPIResources.userMenuInfo().then(res => {
        //将获取的用户菜单信息，保存到menuStore中
        menuStore.setMenuInfo(res.data)
    });
}


</script>

<style scoped>
.login_a{
  display: flex;            /* flex布局 */
  justify-content: center;  /**水平居中 */
  align-items: center;      /**垂直居中 */
  font-size: 30px;          
  padding: 10px;
}

.login_b{
  display: flex;
  justify-content: center;
  padding: 10px;
}

</style>
