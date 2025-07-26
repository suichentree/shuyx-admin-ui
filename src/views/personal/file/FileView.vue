<template>
  <el-space direction="vertical" :fill="true" style="width: 100%;">
  <!-- 查询条件卡片 -->
  <el-card shadow="always" :body-style="{ padding: '0px' }" >
    <div class="card-div">
      <el-row justify="space-between">
        <el-col :span="2"><el-tag type="info">查询条件</el-tag></el-col>
        <el-col :span="6" style="text-align: right">
          <el-button type="primary"  @click="search">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-div">
      <el-form :inline="true" :model="queryform" ref="queryformRef">
        <el-form-item label="文件名称" prop="fileName">
          <el-input 
            v-model="queryform.fileName" 
            placeholder="请输入文件名称" 
            clearable 
          />
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <!-- 查询结果卡片 -->
  <el-card shadow="always" :body-style="{ padding: '0px' }" >
    <div class="card-div">
      <el-row justify="space-between" >
        <el-col :span="2"><el-tag type="info">查询结果</el-tag></el-col>
        <el-col :span="6" style="text-align: right">
          <el-button type="success" @click="AddDialogVisible = true">上传文件</el-button>
          <el-button type="primary"  @click="AddDialogVisible = true">分享文件</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-div">
        <!-- 数据表格 -->
        <el-table 
          :data="tableData" 
          border 
          :header-cell-style="{ background: '#f8f9fa', color: '#303133' }"
        >
          <el-table-column label="文件编号" key="fileId" prop="fileId" show-overflow-tooltip/>
          <el-table-column label="文件名称" key="fileName" prop="fileName" show-overflow-tooltip />
          <el-table-column label="文件大小(单位MB)" key="fileSize" prop="fileSize" show-overflow-tooltip/>
          <el-table-column label="文件地址" key="fileAddress" prop="fileAddress" show-overflow-tooltip />
          <el-table-column label="备注" key="remark" prop="remark" show-overflow-tooltip />
          <el-table-column label="操作">
            <template #default="scope">
              <el-tooltip content="下载文件" placement="top">
                <el-button 
                  link 
                  type="primary" 
                  icon="Download" 
                  @click="toDownload(scope.row)"
                />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button 
                  link 
                  type="danger" 
                  icon="Delete" 
                  @click="toDelete(scope.row)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="card-div">
      <!-- 表格分页 -->
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
  <!-- 新增对话框 -->
  <AddView />
   <!-- 下载进度条 -->
  <el-card v-if="isShowProgress" shadow="always" :body-style="{ padding: '0px' }" >
    <el-dialog
      v-model="isShowProgress"
      title="文件下载中"
      :show-close="false"
      :close-on-click-modal="true"
      :close-on-press-escape="false"
      destroy-on-close
    >
      <div style="text-align: center;">
        <el-progress
          :text-inside="true"
          :stroke-width="24"
          :percentage="progressPercent"
          color="#409eff"
          striped
          striped-flow
        />
        <div>{{ progressPercent }}%</div>
      </div>
    </el-dialog>
  </el-card>
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
