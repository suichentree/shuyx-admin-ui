<template>
  <el-space direction="vertical" :fill="true" style="width: 100%">
    <!--查询条件-->
    <el-card shadow="never" :body-style="{ padding: '0px' }">
      <div class="card-div">
        <el-row justify="space-between">
          <el-col :span="2"><el-tag type="info">查询条件</el-tag></el-col>
          <el-col :span="6" style="text-align: right">
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetQuery">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="card-div">
        <el-form :inline="true" :model="queryform" ref="queryformRef">
          <el-form-item label="字典名称" prop="dictName">
            <el-input v-model="queryform.dictName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="字典编码" prop="dictCode">
            <el-input v-model="queryform.dictCode" placeholder="请输入" clearable />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!--查询结果-->
    <el-card shadow="never" :body-style="{ padding: '0px' }">
      <div class="card-div">
        <el-row justify="space-between">
          <el-col :span="2"><el-tag type="info">查询结果</el-tag></el-col>
          <el-col :span="6" style="text-align: right">
            <el-button type="success" @click="AddDialogVisible = true">新增</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="card-div">
        <!--数据表格-->
        <el-table :data="tableData" border stripe  :header-cell-style="{ background: '#f8f9fa', color: '#303133' }">
          <el-table-column label="字典编号" key="dictId" prop="dictId" />
          <el-table-column label="字典名称" key="dictName" prop="dictName" />
          <el-table-column label="字典编码" key="dictCode" prop="dictCode" />
          <el-table-column label="字典标签" key="dictLabel" prop="dictLabel" />
          <el-table-column label="字典值" key="dictValue" prop="dictValue" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-tooltip content="修改" placement="top">
                <el-button link type="primary" icon="Edit" @click="toEdit(scope.row)" />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button link type="primary" icon="Delete" @click="toDelete(scope.row.dictId)" />
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
import DictAPIResources from '@/api/dict.service.js'
import { ElMessage, ElMessageBox } from 'element-plus'
// 组件注册
import AddView from './components/AddView.vue'
import EditView from './components/EditView.vue'

//新增对话框
let AddDialogVisible = ref(false)
provide('AddDialogVisible', AddDialogVisible)

//编辑对话框
let EditDialogVisible = ref(false)
let EditForm = ref({})
provide('EditDialogVisible', EditDialogVisible)
provide('EditForm', EditForm)

//表单对象
let queryformRef = ref()
let queryform = ref({
  dictName: undefined,
  dictCode: undefined
})
//分页配置数据
let pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 0
})

//表格数据
let tableData = ref([])

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
  //分页查询接口
  DictAPIResources.pagelist(queryform.value, pageData.value).then((res) => {
    //填充表格数据
    tableData.value = res.data.records
    //填充分页数据
    pageData.value.total = res.data.total
  })
}

//编辑操作
function toEdit(obj) {
  EditForm.value = obj
  //打开编辑对话框
  EditDialogVisible.value = true
}

//删除操作
function toDelete(id) {
  ElMessageBox.confirm('是否确定要删除编号为' + id + '的字典?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(() => {
    doDelete(id)
  })
}

//删除用户
function doDelete(id) {
  //调用接口
  DictAPIResources.delete({ id })
    .then((res) => {
      if (res.code == 200) {
        ElMessage.success('删除成功')
      }
    })
    .finally(() => {
      search()
    })
}

//分页数据变化
function changePageData() {
  search()
}
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
