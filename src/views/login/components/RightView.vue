<template>
  <el-row justify="center" align="middle">
    <el-col :span="12">
      <div class="login_a">
        <el-image :src="loginimg" fit="fill" style="height: 50px; width: 50px; padding: 10px" />
        <label>SHUYX ADMIN UI</label>
      </div>
      <div class="login_b">
        <!-- 表单 -->
        <el-form
          :model="loginform"
          label-width="0"
          size="large"
          :rules="rules"
          ref="ruleFormRef"
          style="width: 60%"
        >
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
          <el-form-item prop="verifyCode">
            <el-input v-model="loginform.verifyCode" placeholder="请输入验证码" :prefix-icon="Lock">
            </el-input>
          </el-form-item>
          <el-form-item>
            <div style="display: flex">
              <el-button type="primary" @click="getCodeIMG" :loading="btnLoad"
                >获取验证码</el-button
              >
              <img :src="codeURL" />
            </div>
          </el-form-item>
          <el-form-item>
            <el-col :span="12"
              ><el-checkbox v-model="isRemember" label="记住账号" size="large"
            /></el-col>
            <el-col :span="12" style="text-align: right">
              <el-link type="primary" :underline="false">忘记密码？</el-link>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              @click="onSubmit"
              round
              :loading="loginLoading"
              >登录</el-button
            >
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
import { ref, getCurrentInstance,onMounted} from 'vue'
import loginimg from '@/assets/logo.png'
import { Lock, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import LoginAPIResources from '@/api/login.service'
// 引入CryptoJS加密解密库
import CryptoJS from 'crypto-js'
// 引入Cookies
import Cookies from 'js-cookie'

//getCurrentInstance方法用于获取当前视图的实例。即proxy相当于this
const { proxy } = getCurrentInstance()

//表单校验规则
const rules = ref({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

//页面加载=========
onMounted(()=>{
  //获取cookie中的账号信息
  let a = Cookies.get('shuyxAccountInfo-cookie');
  if(a){
    let accountinfo = JSON.parse(a);
    //解密密码
    let b = CryptoJS.AES.decrypt(accountinfo.passWord, 'my_secret_key').toString(CryptoJS.enc.Utf8)
    loginform.value.userName = accountinfo.userName
    loginform.value.passWord = b
    isRemember.value = true
  }
})

//登录相关=====================
let loginform = ref({
  userName: undefined,
  passWord: undefined,
  verifyCode: undefined
})
let loginLoading = ref(false)
function onSubmit() {
  //先进行表单校验
  proxy.$refs.ruleFormRef.validate((valid) => {
    if (valid) {
      loginLoading.value = true
      //调用登录接口
      LoginAPIResources.login(loginform.value)
        .then((res) => {
          if (res.code == 200) {
            ElMessage.success('登录成功')
            router.push({ path: '/home/index' })
            //存token到localStorage中
            localStorage.setItem('shuyxWebsiteToken', res.data)
            //获取用户信息
            getUserInfo()
            //获取用户菜单信息
            getUserMenuInfo()
            //加载字典数据
            loadDict()
          }
        })
        .finally(() => {
          loginLoading.value = false
          //记住账号功能
          remeberAccount()
        })
    }
  })
}

//记住账号相关 =================
let isRemember = ref(false)
function remeberAccount(){
  if(isRemember.value){
    //记住账号
    let a = {
      userName: loginform.value.userName,
      passWord: CryptoJS.AES.encrypt(loginform.value.passWord, 'my_secret_key').toString(),  //对密码进行加密
    }
    //cookie保存登录信息，保存7天
    Cookies.set('shuyxAccountInfo-cookie',JSON.stringify(a), { expires: 7 });
  }else{
    //不记住账号，如果cookie中保存了账号信息，那么需要删除
    Cookies.remove("shuyxAccountInfo-cookie")
  }
}

//用户信息相关===============
import { useUserStore } from '@/stores/userStore'
import UserAPIResources from '@/api/user.service'
function getUserInfo() {
  UserAPIResources.getUserInfoByToken().then((res) => {
    //把获取的用户信息保存到userStore中
    useUserStore().setUserInfo(res.data)
  })
}

//用户菜单相关===========================
import MenuAPIResources from '@/api/menu.service'
import { useMenuStore } from '@/stores/menuStore'
function getUserMenuInfo() {
  //调用登录接口
  MenuAPIResources.userMenuInfo().then((res) => {
    //将获取的用户菜单信息，保存到menuStore中
    useMenuStore().setMenuInfo(res.data)
  })
}

//验证码相关==============================
let codeURL = ref(undefined)
let btnLoad = ref(false)     //按钮加载
function getCodeIMG() {
  if (loginform.value.userName != undefined) {
    btnLoad.value = true
    //获取用户名
    let userName = loginform.value.userName
    LoginAPIResources.verifyCode({ userName })
      .then((res) => {
        codeURL.value = res.data.img
      })
      .finally(() => {
        btnLoad.value = false
      })
  } else {
    ElMessage.error('获取验证码，需要先输入用户名。')
  }
}


//字典相关==============================
import DictAPIInstance from "@/api/dict.service.js"
import { useDictStore } from '@/stores/dictStore.js'
function loadDict(){
  //调用字典接口获取全部字典数据
  DictAPIInstance.findBy({}).then((res)=>{
    let DictData = {}
    let array = res.data
    array.forEach(item => {
      //若该字典编码存在字典数据中,则添加
      if(item.dictCode in DictData){
        let a =  {
          label: item.dictLabel,
          value: item.dictValue,
          name: item.dictName
        }
        DictData[item.dictCode].push(a)
      }else{
        //若该字典编码不存在字典数据中，则新建字典数据的属性，然后再添加
        let a =  {
          label: item.dictLabel,
          value: item.dictValue,
          name: item.dictName
        }
        DictData[item.dictCode] = []
        DictData[item.dictCode].push(a)
      }
    });
    //把全部字典数据，添加到pinia中,pinia会持久化到localStorage中
    useDictStore().add(DictData)
  })
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
