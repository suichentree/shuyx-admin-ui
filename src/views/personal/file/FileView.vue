<template>
  <el-alert title="文件管理中只显示自己上传过的文件" type="warning" :closable="false" show-icon/>
  <!--查询条件-->
  <el-card shadow="never" :body-style="{ padding: '10px' }" style="margin-top:10px">
    <el-row justify="space-between">
      <el-col :span="2"><el-tag>查询条件</el-tag></el-col>
      <el-col :span="6" style="text-align: right">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </el-col>
    </el-row>
    <el-form :inline="true" :model="queryform" ref="queryformRef">
      <el-form-item label="文件名称" prop="fileName">
        <el-input v-model="queryform.fileName" placeholder="请输入" clearable />
      </el-form-item>
    </el-form>
  </el-card>
  <!--文件下载进度条-->
  <el-card
    v-if="isShowProgress"
    shadow="never"
    :body-style="{ padding: '10px' }"
    style="margin-top: 10px"
  >
    <el-dialog
      v-model="isShowProgress"
      title="文件下载中，请不要切换其他页面。"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
    >
      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="progressPercent"
        striped
        striped-flow
      />
    </el-dialog>
  </el-card>
  <!--查询结果-->
  <el-card shadow="never" :body-style="{ padding: '10px' }" style="margin-top: 10px">
    <el-row justify="space-between">
      <el-col :span="2"><el-tag>查询结果</el-tag></el-col>
      <el-col :span="6" style="text-align: right">
        <el-button type="success" @click="AddDialogVisible = true">上传文件</el-button>
        <el-button type="primary" @click="AddDialogVisible = true">分享文件</el-button>
      </el-col>
    </el-row>
    <!--数据表格-->
    <el-table :data="tableData" border>
      <el-table-column label="文件编号" key="fileId" prop="fileId" />
      <el-table-column label="文件名称" key="fileName" prop="fileName" />
      <el-table-column label="文件大小(单位MB)" key="fileSize" prop="fileSize" />
      <el-table-column label="文件地址" key="fileAddress" prop="fileAddress" />
      <el-table-column label="备注" key="remark" prop="remark" show-overflow-tooltip />
      <el-table-column label="操作">
        <template #default="scope">
          <el-tooltip content="下载文件" placement="top">
            <el-button link type="primary" icon="Download" @click="toDownload(scope.row)" />
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button link type="primary" icon="Delete" @click="toDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
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
  </el-card>

  <!--新增对话框-->
  <AddView />
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import FileAPIResources from '@/api/file.service.js'
import OSSAPIResources from '@/api/oss.service.js'
import { useUserStore } from '@/stores/userStore'
import { ElMessage, ElMessageBox } from 'element-plus'
// 组件注册
import AddView from './components/AddView.vue'

//新增对话框
let AddDialogVisible = ref(false)
provide('AddDialogVisible', AddDialogVisible)

//通讯录对话框
let ContactDialogVisible = ref(false)
provide('ContactDialogVisible', ContactDialogVisible)

//分页配置数据
let pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 0
})

// onMounted生命周期
onMounted(() => {
  search()
})

//重置按钮操作
function resetQuery() {
  queryformRef.value.resetFields()
}

//搜索
let queryformRef = ref()
let queryform = ref({
  fileName: undefined,
  userId: useUserStore().userInfo.userId
})
let tableData = ref([])
function search() {
  //分页查询接口
  FileAPIResources.pagelist(queryform.value, pageData.value).then((res) => {
    //填充表格数据
    tableData.value = res.data.records
    //填充分页数据
    pageData.value.total = res.data.total
  })
}

//删除操作
function toDelete(obj) {
  ElMessageBox.confirm('是否确定要删除编号为' + obj.fileId + '的文件?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(() => {
    doDelete(obj)
  })
}

//删除
function doDelete(obj) {
  //调用删除接口
  let a = {
    fileId: obj.fileId,
    fileName: obj.fileAddress,
    bucketName: 'file-service-bucket'
  }
  FileAPIResources.delete(a)
    .then((res) => {
      if (res.code == 200) {
        ElMessage.success('删除成功')
      }
    })
    .finally(() => {
      search()
    })
}

//下载
let isShowProgress = ref(false)
let progressPercent = ref(0)
function toDownload(obj) {
  ElMessageBox.confirm('是否确定要下载' + obj.fileName + '?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  })
    .then(() => {
      isShowProgress.value = true
      //调用下载接口
      let a = {
        fileName: obj.fileAddress,
        bucketName: 'file-service-bucket'
      }
      OSSAPIResources.download(a, (e) => {
        progressPercent.value = Number(((e.loaded / e.total) * 100).toFixed(1))
      }).then((res) => {
        isShowProgress.value = false
        let blob = new Blob([res])
        // a标签下载
        let elink = document.createElement('a')
        elink.download = a.fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      })
    })
    .finally(() => {
      progressPercent.value = 0
    })
}

//分页数据变化
function changePageData() {
  search()
}
</script>
<style scoped></style>
