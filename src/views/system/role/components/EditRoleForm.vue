<template>
    <el-form :model="formData" :rules="rules" ref="formDataRef">
        <el-form-item label="角色编号" prop="roleId" style="width: 100%">
            <el-input v-model="formData.roleId" disabled />
        </el-form-item>
        <el-form-item label="上级角色" prop="parentId" style="width: 100%">
            <el-tree-select
            :props="{ value: 'roleId', label: 'roleName', children: 'children' }"
            v-model="formData.parentId"
            :data="roleTreeData"
            check-strictly
            :render-after-expand="false"
            placeholder="请选择"
            clearable
            style="width: 200px"
            />
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName" style="width: 100%">
            <el-input v-model="formData.roleName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio
              v-for="item in roleDictData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              />
            </el-radio-group>
        </el-form-item>
        <el-button type="primary" @click="toupdate">更新</el-button>
        <el-button type="danger" @click="todelete">删除</el-button>
    </el-form>
</template>
<script setup>
import { ref,inject,getCurrentInstance} from 'vue'
import APIResources from '@/api/role.service.js'
import { ElMessage,ElMessageBox} from 'element-plus'

//this
const { proxy } = getCurrentInstance()

//接收父组件传递的数据
const roleTreeData = inject('roleTreeData')
const formData = inject('EditForm')

//表单相关
const formDataRef = ref()
const rules = ref({
  roleId: [{ required: true, message: '请输入', trigger: 'blur' }],
  parentId: [{ required: true, message: '请选择', trigger: 'blur' }],
  roleName: [{ required: true, message: '请输入', trigger: 'blur' }],
  status: [{ required: true, message: '请选择', trigger: 'blur' }]
})

//角色状态字典
import { useDictStore } from '@/stores/dictStore.js'
let roleDictData = ref([])
roleDictData.value = useDictStore().getBykey('role_status')

//更新操作
function toupdate() {
  //表单校验
  proxy.$refs.formDataRef.validate((valid) => {
    //若校验成功
    if (valid) {
      //调用接口
      APIResources.updateRole(formData.value).then((res) => {
        if (res.code == 200) {
          ElMessage.success('更新成功')
        } else {
          ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
        }
      })
    }
  })
}

//删除操作
function todelete(){
  if(formData.value.roleId == undefined){
    return ElMessage.error("请先选中角色!")
  }
  var id = formData.value.roleId
  ElMessageBox.confirm('是否确定要删除名称为' + formData.value.roleName + '的角色?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(() => {
    deleteRole(id)
  })
}

//删除用户
function deleteRole(roleId) {
  //调用接口
  APIResources.deleteRole({ roleId })
  .then((res) => {
    if (res.code != 200) {
      ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
    } else {
      ElMessage.success('删除成功')
    }
  })
}

</script>
<style scoped>

</style>
