<template>
  <el-form>
      <el-form-item>
        <el-button type="primary" size="small" @click="search">查询</el-button>
        <el-button type="success" size="small" @click="addUserRole">新增</el-button>
        <el-button type="danger" size="small" @click="deleteUserRole">删除</el-button>
      </el-form-item>
      <el-form-item>
        <!--数据表格-->
        <el-table :data="tableData" border ref="tableRef">
          <el-table-column type="selection" />
          <el-table-column label="用户编号" align="center" key="userId" prop="userId" />
          <el-table-column label="用户名称" align="center" key="userName" prop="userName" />
          <el-table-column label="用户状态" align="center" key="status">
            <template #default="scope">
              <el-tag v-if="scope.row.status == 0">正常</el-tag>
              <el-tag v-else>禁用</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <!--表格分页-->
        <el-pagination
          @change="changePageData"
          v-model:current-page="pageData.pageNum"
          v-model:page-size="pageData.pageSize"
          :page-sizes="pageData.pageSizes"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.total"
        />
      </el-form-item>
  </el-form>
  <!-- 用户列表组件 -->
  <UserList/>
</template>
<script setup>
import { ref,inject,getCurrentInstance,provide} from 'vue'
import APIResources from '../RoleView.service'
import { ElMessage} from 'element-plus'

// 组件注册
import UserList from './UserList.vue'

//this
const { proxy } = getCurrentInstance()

//接收父组件传递的数据
const EditForm = inject('EditForm')

//分页配置数据
const pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 0
})

//表格数据
const tableData = ref([])
const tableRef = ref()

const UserDialogVisible = ref(false)
provide('UserDialogVisible', UserDialogVisible)


//------------------

//搜索按钮操作
function search() {
  if(EditForm.value.roleId == undefined){
    return ElMessage.error("请先选中角色!")
  }
  APIResources.selectUserListByRoleId(EditForm.value, pageData.value).then((res) => {
    if (res.code != 200) {
      //请求成功，但是业务失败的情况
      ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
    }
    //填充表格数据
    tableData.value = res.data.list
    //填充分页数据
    pageData.value.total = res.data.total
  })
}

//添加角色与用户绑定
function addUserRole(){
  if(EditForm.value.roleId == undefined){
    return ElMessage.error("请先选中角色!")
  }
  UserDialogVisible.value = true
}

//解除用户与角色绑定
function deleteUserRole(){
  if(EditForm.value.roleId == undefined){
    return ElMessage.error("请先选中角色!")
  }
  var selectUsers = []
  selectUsers = proxy.$refs.tableRef.getSelectionRows()
  if(selectUsers.size == 0){
      ElMessage.error('请先选择用户')
  }
  var userRoles = []
  for (var a of selectUsers) {
      var obj = {roleId:EditForm.value.roleId,userId:a.userId,status:0}
      userRoles.push(obj)
  }
  APIResources.deleteUserRole(userRoles).then(() => {
    search()
  })

}

//分页数据变化
function changePageData() {
  search()
}

</script>
<style scoped>

</style>
