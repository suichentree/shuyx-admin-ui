<template>
  <el-dialog
    v-model="DialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <!-- 头部 -->
    <template #header>
      <span>用户列表</span>
    </template>
    <!-- 中间 -->
    <el-card shadow="never" :body-style="{ padding: '0px' }" style="padding: 10px;">
      <el-row justify="space-between">
        <el-tag>查询条件</el-tag>
        <el-button type="primary" @click="search" size="small">搜索</el-button>
      </el-row>
      <div class="card-div">
        <el-form :model="queryform" ref="queryformRef" :inline="true">
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="queryform.userName" placeholder="请输入" clearable />
          </el-form-item>
        </el-form>
      </div>
      <el-tag>查询结果</el-tag>
      <div class="card-div">
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
          <el-table-column label="所属组织机构" align="center" key="orgName" prop="org.orgName" />
        </el-table>
        <el-pagination
          @change="changePageData"
          v-model:current-page="pageData.pageNum"
          v-model:page-size="pageData.pageSize"
          :page-sizes="pageData.pageSizes"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.total"
        />
      </div>
    </el-card>
    <!-- 尾部 -->
    <template #footer>
      <span>
        <el-button type="primary" @click="addUserRole">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!--查询条件-->
</template>
<script setup>
import { ref, inject, getCurrentInstance } from 'vue'
import APIResources from '../RoleView.service.js'
import { ElMessage } from 'element-plus'

//父组件传值
const DialogVisible = inject('UserDialogVisible')
const EditForm = inject('EditForm')

//this
const { proxy } = getCurrentInstance()

//表单对象
const queryformRef = ref()
const queryform = ref({
  userName: undefined,
  roleId: undefined
})
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

/**--------------------- */

//搜索按钮操作
function search() {
  queryform.value.roleId = EditForm.value.roleId
  APIResources.selectUserListByNoRoleId(queryform.value, pageData.value).then((res) => {
    tableData.value = res.data.list
    pageData.value.total = res.data.total
  })
}

//角色与用户绑定
function addUserRole() {
  var selectUsers = []
  selectUsers = proxy.$refs.tableRef.getSelectionRows()
  if (selectUsers.size == 0) {
    ElMessage.error('请先选择用户')
  }
  var userRoles = []
  for (var a of selectUsers) {
    var obj = { roleId: EditForm.value.roleId, userId: a.userId, status: 0 }
    userRoles.push(obj)
  }
  console.log(userRoles)
  APIResources.addUserRole(userRoles).then(() => {
    DialogVisible.value = false
  })
}

//分页数据变化
function changePageData() {
  search()
}

//取消操作
function cancel() {
  DialogVisible.value = false
}
</script>
<style scoped>
.card-div {
  padding: 10px;
}
</style>
