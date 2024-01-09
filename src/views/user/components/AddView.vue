<template>
  <el-dialog
    v-model="AddUserDialogVisible"
    width="50%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
  <template #header>
      <span>新增用户</span>
    </template>
  <el-form :inline="true" :model="addform" :rules="rules" ref="addformRef">
    <el-row>
      <el-col :span="12">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="addform.userName" placeholder="请输入" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="addform.phone" placeholder="请输入" clearable/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="用户密码" prop="passWord">
          <el-input v-model="addform.passWord" placeholder="请输入密码" :prefix-icon="Lock" type="password" show-password />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="addform.confirmPassword" placeholder="请再次输入密码" :prefix-icon="Lock" type="password" show-password />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="addform.birthday" type="date" placeholder="选择出生日期" value-format="YYYY-MM-DD"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email" placeholder="请输入"><template #append>.com</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="性别" prop="gender">
            <el-radio-group  v-model="addform.gender">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
            </el-radio-group>
        </el-form-item>
      </el-col>
      
    </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button type="primary" @click="addUser">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref,inject,getCurrentInstance } from 'vue'
import APIResources from '../UserView.service.js'
import { ElMessage } from 'element-plus'

//this
const { proxy } = getCurrentInstance();

//接收父组件传递的数据
const AddUserDialogVisible = inject("AddUserDialogVisible")

//密码对比规则
const equalToPassword = (rule, value, callback) => {
  if (addform.value.passWord !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

//表单校验规则
const rules = ref({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  passWord:[{ required: true, message: '请输入密码', trigger: 'blur' }],
  phone:[{ required: true, message: '请输入手机号码', trigger: 'blur' }],
  confirmPassword:[{ required: true, message: '请输入确认密码', trigger: 'blur' },{ required: true, validator: equalToPassword, trigger: "blur" }],
  gender:[{ required: true, message: '请选择性别', trigger: 'blur' }],
  birthday:[{ required: true, message: '请选择出生日期', trigger: 'blur' }],
  email:[{ required: true, message: '请输入邮箱', trigger: 'blur' }]
})

//表单对象
const addformRef = ref()
const addform = ref({
  userName:undefined,
  phone: undefined,
  passWord: undefined,
  confirmPassword: undefined,
  gender:undefined,
  birthday:undefined,
  email: undefined
})

//添加用户
function addUser(){
  //先进行表单校验
  proxy.$refs.addformRef.validate((valid) => {
    //若前端校验成功
    if (valid) {
        //调用接口
        APIResources.addUser(addform.value).then(res => {
            if(res.code == 200){
                ElMessage.success("添加成功")
                cancel()
            }else{
                ElMessage.error("Code: "+res.code+",Message: "+res.message)
            }
        });
    }
  })
}

//取消
function cancel(){
  addformRef.value.resetFields()
  AddUserDialogVisible.value = false
}

</script>
<style scoped>
.card-header {
  padding: 10px;
}
.card-main{
  padding: 10px;
}
.el-card{
  margin: 10px;
}
.el-pagination{
  margin: 10px
}
</style>