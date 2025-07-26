<template>
  <el-space direction="vertical" :fill="true" style="width: 100%">
  <!--查询条件-->
  <el-card shadow="never" :body-style="{ padding: '0px' }">
    <div class="card-div">
      <el-row justify="space-between">
        <el-col :span="12"><el-tag type="info">查询条件</el-tag></el-col>
        <el-col :span="12" style="text-align: right">
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-div">
      <el-form :inline="true" ref="formRef" :model="queryform">
        <el-form-item label="媒体名称" prop="mediaName">
          <el-input v-model="queryform.mediaName" placeholder="请输入" clearable/>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <!--查询结果-->
  <el-card shadow="never" :body-style="{ padding: '0px'}">
    <div class="card-div">
      <el-row justify="space-between">
        <el-col :span="12"><el-tag type="info">查询结果</el-tag></el-col>
        <el-col :span="12" style="text-align: right">
          <el-button type="success" @click="toAdd()">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-div">
      <!--数据表格-->
      <el-table :data="tableData" border>
        <el-table-column label="媒体ID" key="mediaId" prop="media.mediaId" show-overflow-tooltip/>
        <el-table-column label="媒体名称" key="mediaName" prop="media.mediaName" show-overflow-tooltip/>
        <el-table-column label="剧集ID" key="episodesId" prop="episodesId" show-overflow-tooltip/>
        <el-table-column label="剧集序号" key="episodesNumber" prop="episodesNumber" show-overflow-tooltip/>
        <el-table-column label="剧集名称" key="episodesName" prop="episodesName" show-overflow-tooltip/>
        <el-table-column label="剧集链接" key="episodesUrl" prop="episodesUrl" show-overflow-tooltip/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="toEdit(scope.row)" />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="toDelete(scope.row)" />
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
  <EditView v-if="EditForm" />
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import EpisodesAPIResources from '@/api/episodes.service.js'
import { ElMessage, ElMessageBox } from 'element-plus'
//组件注册
import AddView from './components/AddView.vue'
import EditView from './components/EditView.vue'

onMounted(()=>{
  search()
})

//分页配置数据
let pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 0
})

//分页数据变化
function changePageData() {
  search()
}

//搜索按钮操作
let queryform = ref({})
let tableData = ref([])
function search() {
  let a ={
    mediaName: queryform.value.mediaName
  }
  //分页查询接口
  EpisodesAPIResources.pagelist(a,pageData.value).then((res) => {
    //填充表格数据
    tableData.value = res.data.list
    //填充分页数据
    pageData.value.total = res.data.total
  })
}



//新增对话框相关==============
let AddDialogVisible = ref(false)
provide('AddDialogVisible', AddDialogVisible)
function toAdd() {
  AddDialogVisible.value = true
}

//编辑相关====================
let EditDialogVisible = ref(false)
provide('EditDialogVisible', EditDialogVisible)
let EditForm = ref({})
provide('EditForm', EditForm)

function toEdit(obj) {
  EditForm.value = obj
  EditDialogVisible.value = true
}

//删除相关=====================
function toDelete(obj) {
  ElMessageBox.confirm('是否确定要删除编号为' + obj.episodesId + '的剧集，及其对应文件?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(() => {
    doDelete(obj)
  })
}

function doDelete(obj) {
  //调用接口
  let a = new FormData()
  a.append("episodesId",obj.episodesId);
  a.append("fileName",obj.episodesUrl);
  a.append("bucketName","media-episodes-bucket")
  EpisodesAPIResources.delete(a)
    .then(() => {
      ElMessage.success('删除成功')
    })
    .finally(() => {
      search()
    })
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
