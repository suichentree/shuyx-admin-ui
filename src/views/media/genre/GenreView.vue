<template>
  <el-space direction="vertical" :fill="true" style="width: 100%">
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
          <el-form-item label="类型名称" prop="genreName">
            <el-input v-model="queryform.genreName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="类型分类" prop="type">
            <el-select v-model="queryform.type" placeholder="请选择" clearable style="width:200px">
              <el-option
                v-for="obj in options"
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
          <el-table-column label="类型编号" align="center" key="genreId" prop="genreId" />
          <el-table-column label="类型名称" align="center" key="genreName" prop="genreName" />
          <el-table-column label="类型分类" align="center" key="type" prop="type" />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-tooltip content="修改" placement="top">
                <el-button link type="primary" icon="Edit" @click="toEdit(scope.row.genreId)" />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button link type="primary" icon="Delete" @click="toDelete(scope.row.genreId)" />
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
import APIResources from '@/api/genre.service.js'
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
  genreId: undefined,
  genreName: undefined,
  type: undefined
})
//分页配置数据
const pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 0
})
const options = [
  {
    value: 'Movie',
    label: '电影'
  },
  {
    value: 'Anime',
    label: '动漫'
  },
  {
    value: 'TV',
    label: '电视剧'
  },
  {
    value: 'Time',
    label: '时间'
  },
  {
    value: 'Region',
    label: '地区'
  }
]

//表格数据
const tableData = ref([])

/**--------------------- */

// onMounted生命周期
onMounted(() => {
  //先查询用户
  search()
})
//重置按钮操作
function resetQuery() {
  queryformRef.value.resetFields()
}

//搜索按钮操作
function search() {
  //分页查询接口
  APIResources.pagelist(queryform.value, pageData.value).then((res) => {
    //填充表格数据
    tableData.value = res.data.list
    //填充分页数据
    pageData.value.total = res.data.total
  })
}

//编辑操作
function toEdit(genreId) {
  let query = ref({
    genreId: genreId
  })
  //分页查询接口，根据id查询
  APIResources.pagelist(query.value, pageData.value)
    .then((res) => {
      EditForm.value = res.data.list[0]
    })
    .finally(() => {
      //打开编辑对话框
      EditDialogVisible.value = true
    })
}

//删除操作
function toDelete(genreId) {
  ElMessageBox.confirm('是否确定要删除编号为' + genreId + '的类型?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(() => {
    doDelete(genreId)
  })
}

//删除用户
function doDelete(genreId) {
  //调用接口
  APIResources.deleteGenre({ genreId })
    .then(() => {
      ElMessage.success('删除成功')
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
.card-div {
  padding: 10px;
}
</style>
