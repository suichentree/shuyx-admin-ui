<template>
  <el-form :model="form" label-width="auto" style="max-width: 500px" :rules="rules" ref="formRef">
    <el-form-item label="用户名称" prop="userName">
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
      <el-tree-select
        :props="{ value: 'orgId', label: 'orgName', children: 'children' }"
        v-model="form.orgId"
        :data="orgTreeOptions"
        check-strictly
        :render-after-expand="false"
        placeholder="请选择"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="职位" prop="positionId">
      <el-select v-model="form.positionId" placeholder="请选择" clearable style="width: 200px">
        <el-option
          v-for="obj in positionInfo"
          :key="obj.positionId"
          :label="obj.positionName"
          :value="obj.positionId"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">更新</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref,onMounted} from 'vue'
import { useUserStore } from '@/stores/userStore';
import OrgAPIResources from '@/api/org.service'
import PositionAPIResources from "@/api/position.service.js"

//页面加载
onMounted(()=>{
  form.value = useUserStore().userInfo;
  selectOrg()
  selectPostInfo()
})


//表单对象
let formRef = ref()
let form = ref({
  userName:undefined,
  phone: undefined,
  passWord: undefined,
  gender:undefined,
  birthday:undefined,
  email: undefined
})

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

//组织机构数据
let orgTreeOptions = ref([])
function selectOrg(){
  OrgAPIResources.orgTreelist().then((res) => {
      orgTreeOptions.value = res.data
  })
}

//职位数据
let positionInfo = ref([])
function selectPostInfo(){
  PositionAPIResources.postionlist().then((res) => {
    positionInfo.value = res.data
  })
}



const onSubmit = () => {
  console.log('submit!')
}

</script>
<style scoped></style>
