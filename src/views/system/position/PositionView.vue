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
          <el-form-item label="职位名称" prop="positionName">
            <el-input v-model="queryform.positionName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="职位状态" prop="status">
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
        <el-table :data="tableData" border>
          <el-table-column label="职位编号" align="center" key="positionId" prop="positionId" />
          <el-table-column label="职位名称" align="center" key="positionName" prop="positionName" />
          <el-table-column label="职位编码" align="center" key="positionCode" prop="positionCode" />
          <el-table-column label="用户状态" align="center" key="status">
            <template #default="scope">
                <el-tag v-if="scope.row.status == 0">正常</el-tag>
                <el-tag v-else type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            :formatter="DateTimeformatter"
          />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-tooltip content="修改" placement="top">
                <el-button link type="primary" icon="Edit" @click="toEdit(scope.row.positionId)" />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button link type="primary" icon="Delete" @click="toDelete(scope.row.positionId)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="card-div">
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
  import APIResources from '@/api/position.service.js'
  import { ElMessage, ElMessageBox } from 'element-plus'
  
  // 组件注册
  import AddView from './components/AddView.vue'
  import EditView from './components/EditView.vue'
  
  //新增对话框
  const AddDialogVisible = ref(false)
  provide('AddDialogVisible', AddDialogVisible)
  
  //编辑对话框
  const EditDialogVisible = ref(false)
  const EditForm = ref({})
  provide('EditDialogVisible', EditDialogVisible)
  provide('EditForm', EditForm)
  
  //表单对象
  const queryformRef = ref()
  const queryform = ref({
    positionName: undefined,
    status: undefined,
  })
  //分页配置数据
  const pageData = ref({
    pageNum: 1,
    pageSize: 10,
    pageSizes: [10, 50, 100],
    total: 0
  })
  //用户状态数组
  const statusOptions = [
    { value: 0, label: '正常' },
    { value: 1, label: '禁用' }
  ]
  //表格数据
  const tableData = ref([])
  
  /**--------------------- */
  
  // onMounted生命周期
  onMounted(() => {
    //先查询用户
    search()
  })
  //日期表头格式化操作
  const DateTimeformatter = (row) => {
    // 将ISO时间字符串 格式化一下
    const localDateTimeStr = new Date(row.createTime).toLocaleString()
    return localDateTimeStr
  }
  //重置按钮操作
  function resetQuery() {
    queryformRef.value.resetFields()
  }
  
  //搜索按钮操作
  function search() {
    //分页查询接口
    APIResources.pagelist(queryform.value, pageData.value).then((res) => {
      if (res.code != 200) {
        ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
      }
      //填充表格数据
      tableData.value = res.data.records
      //填充分页数据
      pageData.value.total = res.data.total
    })
  }
  
  //编辑操作
  function toEdit(positionId) {
    //调用接口
    APIResources.selectById({ positionId }).then((res) => {
      if (res.code != 200) {
        ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
      }
      //赋值编辑表单。会传值给编辑子组件
      EditForm.value = res.data
    }).finally(()=>{
      //打开编辑对话框
      EditDialogVisible.value = true
    })
    
  }
  
  //删除操作
  function toDelete(positionId) {
    ElMessageBox.confirm('是否确定要删除编号为' + positionId + '的职位?', 'Warning', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      closeOnClickModal: false
    }).then(() => {
      doDelete(positionId)
    })
  }
  
  //删除用户
  function doDelete(positionId) {
    //调用接口
    APIResources.deletePosition({ positionId }).then((res) => {
      if (res.code != 200) {
        ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
      }else{
        ElMessage.success("删除成功")
      }
    }).finally(()=>{
      search()
    });
  }
  
  //分页数据变化
  function changePageData() {
    search()
  }
  </script>
  <style scoped>
  .card-div {
    padding: 10px;
  }
  </style>
  