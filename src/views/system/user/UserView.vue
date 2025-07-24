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
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="queryform.userName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="用户状态" prop="status">
            <el-select v-model="queryform.status" placeholder="请选择" clearable style="width: 200px">
              <el-option v-for="obj in userStatusDict" :key="obj.value" :label="obj.label" :value="obj.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="queryform.phone" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="所属组织机构" prop="orgId">
            <el-tree-select
              :props="{ value: 'orgId', label: 'orgName', children: 'children' }"
              v-model="queryform.orgId"
              :data="orgTreeOptions"
              check-strictly
              :render-after-expand="false"
              placeholder="请选择"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="创建时间" prop="dateRange">
            <el-date-picker v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
              start-placeholder="开始日期" end-placeholder="结束日期" clearable></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!--查询结果-->
    <el-card shadow="never" :body-style="{ padding: '0px' }" style="">
      <div class="card-div">
        <el-row justify="space-between">
          <el-col :span="2"><el-tag>查询结果</el-tag></el-col>
          <el-col :span="6" style="text-align: right">
            <el-button type="success" @click="AddUserDialogVisible = true" >新增</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="card-div">
        <!--数据表格-->
        <el-table :data="tableData" border stripe>
          <el-table-column label="用户编号" align="center" key="userId" prop="userId" show-overflow-tooltip/>
          <el-table-column label="用户名称" align="center" key="userName" prop="userName" show-overflow-tooltip/>
          <el-table-column label="手机号码" align="center" key="phone" prop="phone" show-overflow-tooltip/>
          <el-table-column label="邮箱" align="center" key="email" prop="email" show-overflow-tooltip/>
          <el-table-column label="用户状态" align="center" key="status" show-overflow-tooltip>
            <template #default="scope">
              <el-switch v-model="scope.row.status" :active-value="'0'" :inactive-value="'1'" active-text="正常"
                inactive-text="禁用" inline-prompt></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="所属组织机构" align="center" key="orgName" prop="org.orgName" show-overflow-tooltip/>
          <el-table-column label="职位" align="center" key="positionName" prop="position.positionName" show-overflow-tooltip/>
          <el-table-column label="创建时间" align="center" prop="createTime" :formatter="DateTimeformatter" show-overflow-tooltip/>
          <el-table-column label="操作" align="center" show-overflow-tooltip>
            <template #default="scope">
              <el-tooltip content="修改" placement="top">
                <el-button link type="primary" icon="Edit" @click="toEdit(scope.row.userId)" />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button link type="primary" icon="Delete" @click="toDelete(scope.row.userId)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--表格分页-->
      <div class="card-div">
        <el-pagination @change="changePageData" v-model:current-page="pageData.pageNum" 
          v-model:page-size="pageData.pageSize" :page-sizes="pageData.pageSizes" :background="true"
          layout="total, sizes, prev, pager, next, jumper" :total="pageData.total" />
      </div>
    </el-card>
  </el-space>
  <!--新增用户对话框-->
  <AddView />
  <!--编辑用户对话框-->
  <EditView />
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import UserAPIResources from '@/api/user.service.js'
import OrgApiResources from "@/api/org.service.js"
import PositionAPIResources from "@/api/position.service.js"
import { ElMessage, ElMessageBox } from 'element-plus'
// 组件注册
import AddView from './components/AddView.vue'
import EditView from './components/EditView.vue'

//对话框显示变量-添加用户
let AddUserDialogVisible = ref(false)
//将变量传递给子组件
provide('AddUserDialogVisible', AddUserDialogVisible)

//对话框显示变量-编辑用户
let EditUserDialogVisible = ref(false)
provide('EditUserDialogVisible', EditUserDialogVisible)
let EditForm = ref({})
provide('EditForm', EditForm)

//表单对象
let queryformRef = ref()
let queryform = ref({
  userName: undefined,
  status: undefined,
  phone: undefined
})
//分页配置数据
let pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 0
})

//用户状态字典
import { useDictStore } from '@/stores/dictStore.js'
let userStatusDict = ref([])
userStatusDict.value = useDictStore().getBykey('user_status')

//时间范围数组
let dateRange = ref([])
//表格数据
let tableData = ref([])

//组织树
let orgTreeOptions = ref([])
provide('orgTreeOptions', orgTreeOptions)
function selectOrgTree(){
  OrgApiResources.orgTreelist().then((res) => {
      orgTreeOptions.value = res.data
  })
}

//职位信息
let positionInfo = ref([])
provide('positionInfo', positionInfo)
function selectPostInfo(){
  PositionAPIResources.postionlist().then((res) => {
    positionInfo.value = res.data
  })
}

/**--------------------- */

// onMounted生命周期
onMounted(() => {
  //先查询用户
  search()
  //查询组织树
  selectOrgTree()
  //查询职位
  selectPostInfo()
})
//日期表头格式化操作
let DateTimeformatter = (row) => {
  // 将ISO时间字符串 格式化一下
  let localDateTimeStr = new Date(row.createTime).toLocaleString()
  return localDateTimeStr
}
//重置按钮操作
function resetQuery() {
  dateRange.value = []
  queryformRef.value.resetFields()
}

//搜索按钮操作
function search() {
  //先获取日期范围
  if (dateRange.value.length != 0) {
    queryform.value.beginTime = dateRange.value[0]
    queryform.value.endTime = dateRange.value[1]
  }
  //调用分页查询接口
  UserAPIResources.pagelist(queryform.value, pageData.value).then((res) => {
    //填充表格数据
    tableData.value = res.data.list
    //填充分页数据
    pageData.value.total = res.data.total
  })
}

//编辑操作
function toEdit(userId) {
    //调用接口
    UserAPIResources.selectById({ userId }).then((res) => {
      //赋值编辑表单。会传值给编辑子组件
      EditForm.value = res.data[0]
    }).finally(() => {
      //打开编辑对话框
      EditUserDialogVisible.value = true
    })
}

//删除操作
function toDelete(userId) {
  ElMessageBox.confirm('是否确定要删除用户编号为' + userId + '的用户?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(() => {
    deleteUser(userId)
  })
}

//删除用户
function deleteUser(userId) {
    //调用接口
    UserAPIResources.deleteUser({ userId }).then(() => {
      ElMessage.success('删除成功')
    }).finally(() => {
      search()
    })
}

//分页数据变化
function changePageData() {
  search()
}

</script>
<style scoped>
.card-div {
  padding: 5px;
}
</style>
