<template>
  <!--查询条件-->
  <el-card shadow="never" :body-style="{ padding: '0px' }">
    <div class="card-header">
      <el-row justify="space-between">
        <el-col :span="2"><el-tag>查询条件</el-tag></el-col>
        <el-col :span="6" style="text-align: right">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-main">
      <el-form :inline="true" :model="queryform" ref="queryformRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryform.roleName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="角色" prop="status">
          <el-select v-model="queryform.status" placeholder="请选择" clearable>
            <el-option
              v-for="obj in statusOptions"
              :key="obj.value"
              :label="obj.label"
              :value="obj.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <!--查询结果-->
  <el-card shadow="never" :body-style="{ padding: '0px' }">
    <div class="card-header">
      <el-row justify="space-between">
        <el-col :span="2"><el-tag>查询结果</el-tag></el-col>
        <el-col :span="6" style="text-align: right">
          <el-button type="success" @click="AddDialogVisible = true">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-main">
      <!--数据表格-->
      <el-table :data="tableData" row-key="roleId" default-expand-all border>
        <el-table-column label="角色编号" align="center" key="roleId" prop="roleId"/>
        <el-table-column label="角色名称" align="center" key="roleName" prop="roleName" />
        <el-table-column label="角色状态" align="center" key="status">
          <template #default="scope">
            <el-tag v-if=" scope.row.status == 0 ">正常</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="toEdit(scope.row)" />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="toDelete(scope.row.roleId)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
  <!--新增对话框-->
  <AddView />
  <!--编辑对话框-->
  <EditView />
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import APIResources from './RoleView.service'
import { ElMessage, ElMessageBox } from 'element-plus'
// 组件注册
import AddView from './components/AddView.vue'
import EditView from './components/EditView.vue'

//表格相关的
const tableData = ref([])

//新增对话框相关的
const AddDialogVisible = ref(false)
provide('AddDialogVisible', AddDialogVisible)


//编辑对话框相关的
const EditDialogVisible = ref(false)
const EditForm = ref({})
provide('EditDialogVisible', EditDialogVisible)
provide('EditForm', EditForm)

//新增和编辑对话框的上级角色数据
const roleTreeData = ref([])
roleTreeData.value.push({
    "roleId": 0,
    "roleName": "无上级角色",
    "parentId": -1,
    "status": 0,
    "children": []
})
provide('roleTreeData', roleTreeData)


//查询表单相关
const queryformRef = ref()
const queryform = ref({
  roleName: undefined,
  status: undefined,
})

//状态数组
const statusOptions = [
  { value: 0, label: '正常' },
  { value: 1, label: '禁用' }
]

/**--------------------- */

// onMounted生命周期
onMounted(() => {
  //先查询
  search()
})


//重置按钮操作
function resetQuery() {
  queryformRef.value.resetFields()
}

//搜索按钮操作
function search() {
  if(queryform.value.roleName == undefined && queryform.value.status == undefined){
    //全查接口
    APIResources.roleTreelist().then((res) => {
      if (res.code != 200) {
        ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
      }
      //填充表格数据
      tableData.value = res.data

      //填充数据
      roleTreeData.value = roleTreeData.value.concat(res.data)
    })

  }else{
    //条件查询接口
    APIResources.rolelist(queryform.value).then((res) => {
      if (res.code != 200) {
        ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
      }
      //填充表格数据
      tableData.value = res.data
    })
  }
  
}


//编辑操作
function toEdit(obj) {
  //打开编辑对话框
  EditDialogVisible.value = true
  EditForm.value = obj
}

//删除操作
function toDelete(id) {
  ElMessageBox.confirm('是否确定要删除编号为' + id + '的角色?', 'Warning', {
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
  APIResources.deleteRole({ roleId }).then((res) => {
    if (res.code != 200) {
      ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
    }else{
        ElMessage.success("删除成功")
    }
  }).finally(()=>{
    search()
  });
}

</script>
<style scoped>
.card-header {
  padding: 10px;
}
.card-main {
  padding: 10px;
}
.el-card {
  margin: 10px;
}
.el-pagination {
  margin: 10px;
}
</style>
