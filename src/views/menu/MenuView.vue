<template>
  <el-space direction="vertical" :fill="true" style="width: 100%;">
  <!--查询条件-->
  <el-card shadow="never" :body-style="{ padding: '0px' }">
    <div class="card-div">
      <el-row justify="space-between">
        <el-col :span="2"><el-tag>查询条件</el-tag></el-col>
        <el-col :span="6" style="text-align: right">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-div">
      <el-form :inline="true" :model="queryform" ref="queryformRef">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryform.menuName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="菜单" prop="status">
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
    <div class="card-div">
      <el-row justify="space-between">
        <el-col :span="2"><el-tag>查询结果</el-tag></el-col>
        <el-col :span="6" style="text-align: right">
          <el-button type="success" @click="AddDialogVisible = true">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-div">
      <!--数据表格-->
      <el-table :data="tableData" row-key="menuId" default-expand-all border>
        <el-table-column label="菜单编号" align="center" key="menuId" prop="menuId"/>
        <el-table-column label="菜单名称" align="center" key="menuName" prop="menuName" />
        <el-table-column label="菜单路径" align="center" key="menuPath" prop="menuPath" />
        <el-table-column label="菜单图标" align="center" key="icon" prop="icon" />
        <el-table-column label="菜单类型" align="center" key="menuType" prop="menuType">
          <template #default="scope">
            <el-tag v-if=" scope.row.menuType == 0 ">目录</el-tag>
            <el-tag v-else>菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="菜单状态" align="center" key="status">
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
              <el-button link type="primary" icon="Delete" @click="toDelete(scope.row.menuId)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</el-space>
  <!--新增对话框-->
  <AddView />
  <!--编辑对话框-->
  <EditView />
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import APIResources from './MenuView.service'
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

//对话框的上级菜单
const menuTreeList = ref([])
provide('menuTreeList', menuTreeList)

//查询表单相关
const queryformRef = ref()
const queryform = ref({
  menuName: undefined,
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
  if(queryform.value.menuName == undefined && queryform.value.status == undefined){
    //全查接口
    APIResources.menuTreelist().then((res) => {
      if (res.code != 200) {
        ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
      }
      //填充表格数据
      tableData.value = res.data

      //将所有菜单数据赋值给menuTreeList
      menuTreeList.value = res.data
    })

  }else{
    //条件查询接口
    APIResources.menulist(queryform.value).then((res) => {
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
  ElMessageBox.confirm('是否确定要删除编号为' + id + '的菜单?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(() => {
    deleteMenu(id)
  })
}

//删除用户
function deleteMenu(menuId) {
  //调用接口
  APIResources.deleteMenu({ menuId }).then((res) => {
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
.card-div {
  padding: 10px;
}
</style>
