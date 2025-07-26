<template>
  <el-dialog
    v-model="DialogVisible"
    :width="dialogWidth" 
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <!-- 头部 -->
    <template #header>
      <span>用户列表</span> 
    </template>
    <!-- 中间内容 -->
    <el-card  shadow="never"  :body-style="{ padding: '16px 20px' }">
      <!-- 查询条件 -->
      <div class="search-section">
        <el-row justify="space-between" align="middle">
          <el-tag type="info" effect="light">查询条件</el-tag> 
          <el-button type="primary"  @click="search" >
            搜索
          </el-button>
        </el-row>
        <el-form :model="queryform" ref="queryformRef" :inline="true" > 
          <el-form-item label="用户名称" prop="userName"> 
            <el-input 
              v-model="queryform.userName" 
              placeholder="请输入用户名称" 
              clearable
            />
          </el-form-item>
        </el-form>
      </div>

      <!-- 查询结果 -->
      <div class="result-section">
        <el-tag type="info" effect="light">查询结果</el-tag>
        <!-- 表格 -->
        <el-table :data="tableData" border ref="tableRef" :header-cell-style="{ background: '#f8f9fa', color: '#303133'}" >
          <el-table-column type="selection"/>
          <el-table-column label="用户编号" align="center" key="userId" prop="userId" />
          <el-table-column label="用户名称" align="center" key="userName" prop="userName" />
          <el-table-column label="用户状态" align="center" key="status">
            <template #default="scope">
              <el-tag  v-if="scope.row.status == 0">正常</el-tag>
              <el-tag v-else type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="所属组织机构" align="center" key="orgName" prop="org.orgName" />
        </el-table>
        <!-- 分页 -->
         <div class="card-div">
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
      </div>
    </el-card>

    <!--底部按钮 -->
    <template #footer>
        <el-button type="primary"  @click="addUserRole">
          确定
        </el-button>
        <el-button @click="cancel">
          取消
        </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, inject, getCurrentInstance,computed  } from 'vue'
import APIResources from '@/api/role.service.js'
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
    var obj = { roleId: EditForm.value.roleId, userId: a.userId}
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

// 响应式对话框宽度（小屏幕90%，大屏幕60%）
const dialogWidth = computed(() => {
  return window.innerWidth < 768 ? '90%' : '60%'
})

// 监听窗口变化更新宽度
window.addEventListener('resize', () => {
  dialogWidth.value = window.innerWidth < 768 ? '90%' : '60%'
})
</script>

<style scoped>
/* 按钮悬停动画 */
.el-button:not(.is-disabled):hover {
  transform: translateY(-1px);
  transition: transform 0.1s ease;
}

/* 卡片内边距样式 */
.card-div {
  padding: 10px; 
}

</style>
