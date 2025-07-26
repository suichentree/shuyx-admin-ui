<template>
  <el-form 
    :model="form" 
    label-width="auto" 
    style="max-width: 100%; padding: 24px; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)" 
    :rules="rules" 
    ref="formRef"
  >
    <!-- 头像 -->
    <el-form-item label="用户头像" prop="avatar">
      <el-image
        style="width: 100px; height: 100px; border-radius: 8px;"
        :src="form.avatar || 'http://localhost:39000/default-avatar.png'"
        fit="cover"
      >
        <template #error>
          <div style="
            width: 100%; 
            height: 100%; 
            background: #f5f5f5; 
            border-radius: 8px;
            display: flex; 
            align-items: center; 
            justify-content: center;
          ">
            <el-icon style="font-size: 24px; color: #999;"><User /></el-icon>
          </div>
        </template>
      </el-image>
    </el-form-item>

    <el-form-item label="用户编号" prop="userId">
      <el-input 
        v-model="form.userId" 
        placeholder="请输入" 
        clearable 
      />
    </el-form-item>

    <el-form-item label="用户名称" prop="userName">
      <el-input 
        v-model="form.userName" 
        placeholder="请输入" 
        clearable 
      />
    </el-form-item>

    <el-form-item label="手机号码" prop="phone">
      <el-input 
        v-model="form.phone" 
        placeholder="请输入" 
        clearable 
      />
    </el-form-item>

    <!-- 密码 -->
    <el-form-item label="用户密码" prop="passWord">
      <el-input 
        v-model="form.passWord" 
        placeholder="请输入密码" 
        type="password" 
        disabled 
      />
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
      <el-input 
        v-model="form.email" 
        placeholder="请输入" 
      >
      </el-input>
    </el-form-item>

    <!-- 性别单选按钮 -->
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="form.gender" size="large">
        <el-radio-button 
          v-for="(item, index) in userGenderDict" 
          :key="index" 
          :value="item.value"
        >
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="组织机构" prop="orgId">
      <el-input 
        v-model="orgName" 
        placeholder="请输入" 
        disabled 
      />
    </el-form-item>

    <el-form-item label="职位" prop="positionId">
      <el-input 
        v-model="positionName" 
        placeholder="请输入" 
        disabled 
      />
    </el-form-item>

    <el-form-item>
      <el-button 
        type="primary" 
        @click="onSubmit"
      >
        更新
      </el-button>
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
  gender:undefined,
  avatar: undefined, // 新增头像字段
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
    form.value.avatar = res.data[0].avatar 
  })
}

//表单校验规则
let rules = ref({
  userId: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  passWord:[{ required: true, message: '请输入密码', trigger: 'blur' }],
  phone:[{ required: true, message: '请输入手机号码', trigger: 'blur' }],
  gender:[{ required: true, message: '请选择性别', trigger: 'blur' }],
  birthday:[{ required: true, message: '请选择出生日期', trigger: 'blur' }],
  email:[{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
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
<style scoped>

</style>
