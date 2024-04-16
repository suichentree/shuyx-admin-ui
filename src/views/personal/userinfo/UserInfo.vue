<template>
  <el-form :model="form" label-width="auto" style="max-width: 500px" :rules="rules" ref="formRef">
    <el-form-item label="用户名称" prop="userName">
      <el-input v-model="form.userName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="用户头像" prop="userName">
      <el-input v-model="form.userName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="form.phone" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="用户密码" prop="passWord">
      <el-input v-model="form.passWord" placeholder="请输入密码" type="password" disabled />
    </el-form-item>
    <el-form-item label="出生日期" prop="birthday">
      <el-date-picker
        v-model="form.birthday"
        type="date"
        placeholder="选择出生日期"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入"
        ><template #append>.com</template></el-input
      >
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="form.gender">
        <el-radio v-for="(item,index) in userGenderDict" :key="index"
        :label="item.label" :value="item.value"/>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="组织机构" prop="orgId">
      <el-input v-model="orgName" placeholder="请输入" disabled />
    </el-form-item>
    <el-form-item label="职位" prop="positionId">
      <el-input v-model="positionName" placeholder="请输入" disabled />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">更新</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref,onMounted} from 'vue'
import { useUserStore } from '@/stores/userStore';
import UserAPIResources from "@/api/user.service.js"
import { ElMessage } from 'element-plus'
//页面加载
onMounted(()=>{
  search()
})

let formRef = ref()
let form = ref({
  userId:undefined,
  userName:undefined,
  phone:undefined,
  birthday:undefined,
  email:undefined,
  gender:undefined
})
let orgName = ref(undefined)
let positionName = ref(undefined)
//查询当前用户详细信息
function search(){
  let a = {
    userId:useUserStore().userInfo.userId
  }
  UserAPIResources.selectById(a).then((res) => {
    form.value = res.data[0]
    orgName.value = res.data[0].org.orgName
    positionName.value = res.data[0].position.positionName
  })
}

//表单校验规则
let rules = ref({
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  passWord:[{ required: true, message: '请输入密码', trigger: 'blur' }],
  phone:[{ required: true, message: '请输入手机号码', trigger: 'blur' }],
  gender:[{ required: true, message: '请选择性别', trigger: 'blur' }],
  birthday:[{ required: true, message: '请选择出生日期', trigger: 'blur' }],
  email:[{ required: true, message: '请输入邮箱', trigger: 'blur' }]
})

// 用户性别字典
import { useDictStore } from '@/stores/dictStore.js'
let userGenderDict = ref([])
userGenderDict.value = useDictStore().getBykey('user_gender')

//更新
let onSubmit = () => {
  UserAPIResources.updateUser(form.value).then((res)=>{
    if(res.code == 200){
      ElMessage.success("更新成功!")
    }
  })
}

</script>
<style scoped></style>
