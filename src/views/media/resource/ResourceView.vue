<template>
  <el-space direction="vertical" :fill="true" style="width: 100%">
    <!--查询条件-->
    <el-card shadow="never" :body-style="{ padding: '10px' }">
        <el-row justify="space-between">
          <el-col :span="2"><el-tag>查询条件</el-tag></el-col>
          <el-col :span="6" style="text-align: right">
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetQuery">重置</el-button>
          </el-col>
        </el-row>
        <el-form :inline="true" :model="queryform" ref="queryformRef">
          <el-form-item label="媒体名称" prop="mediaName">
            <el-input v-model="queryform.mediaName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="媒体分类" prop="mediaType">
            <el-select v-model="queryform.mediaType" placeholder="请选择" clearable style="width:200px">
              <el-option
                v-for="obj in options"
                :key="obj.value"
                :label="obj.label"
                :value="obj.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
    </el-card>
    <!--查询结果-->
    <el-card shadow="never" :body-style="{ padding: '10px' }">
        <el-row justify="space-between">
          <el-col :span="2"><el-tag>查询结果</el-tag></el-col>
          <el-col :span="6" style="text-align: right">
            <el-button type="success" @click="AddDialogVisible = true">新增</el-button>
          </el-col>
        </el-row>
        <!--数据表格-->
        <el-table :data="tableData" border>
          <el-table-column label="媒体编号"  key="mediaId" prop="mediaId" />
          <el-table-column label="媒体名称"  key="mediaName" prop="mediaName" />
          <el-table-column label="媒体分类" key="mediaType" prop="mediaType" />
          <el-table-column label="媒体标签"  key="mediaTag" prop="mediaTag" show-overflow-tooltip/>
          <el-table-column label="导演"  key="director" prop="director" />
          <el-table-column label="演员"  key="actor" prop="actor" />
          <el-table-column
            label="上映日期"
            key="releaseDate"
            prop="releaseDate"
            :formatter="DateTimeformatter"
            show-overflow-tooltip
          />
          <el-table-column label="制片地区"  key="region" prop="region" />
          <el-table-column label="媒体评分"  key="mediaScore" prop="mediaScore" />
          <el-table-column label="操作" >
            <template #default="scope">
              <el-tooltip content="修改" placement="top">
                <el-button link type="primary" icon="EditPen" @click="toEdit(scope.row.mediaId)" />
              </el-tooltip>
              <el-tooltip content="更新标签" placement="top">
                <el-button link type="success" icon="Edit" @click="toChangeTag(scope.row)" />
              </el-tooltip>
              <el-tooltip content="更新封面" placement="top">
                <el-button link type="warning" icon="Picture" @click="toChangePic(scope.row)" />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button link type="primary" icon="Delete" @click="toDelete(scope.row.mediaId)" />
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
  </el-space>
  <!--新增对话框-->
  <AddView v-if="AddDialogVisible" />
  <!--编辑对话框-->
  <EditView :Id="EditMediaId" v-if="EditDialogVisible" />
  <!-- 更新标签组件 -->
  <UpdateTag v-if="UpdateVisible" :UpdateForm="UpdateForm"/>
  <UpdateImg v-if="ImgVisible" :ImgForm="ImgForm"/>
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import MediaAPIResources from '@/api/media.service.js'
import { ElMessage, ElMessageBox } from 'element-plus'

// 组件注册
import AddView from './components/AddView.vue'
import EditView from './components/EditView.vue'
import UpdateTag from "./components/UpdateTag.vue"
import UpdateImg from "./components/UpdateImg.vue"

//新增对话框子组件
let AddDialogVisible = ref(false)
provide('AddDialogVisible', AddDialogVisible)

//编辑对话框子组件
let EditDialogVisible = ref(false)
let EditMediaId = ref()
let EditForm = ref({})
provide('EditDialogVisible', EditDialogVisible)
provide('EditForm', EditForm)

//更新标签子组件
let UpdateVisible = ref(false)
let UpdateForm = ref({})
provide('UpdateVisible',UpdateVisible)
function toChangeTag(obj){
  UpdateForm.value  = obj 
  UpdateVisible.value = true
}

//更新封面子组件
let ImgVisible = ref(false)
let ImgForm = ref({})
provide('ImgVisible',ImgVisible)
function toChangePic(obj){
  ImgForm.value  = obj 
  ImgVisible.value = true
}

//表单对象
let queryformRef = ref()
let queryform = ref({
  mediaId: undefined,
  mediaName: undefined,
  mediaType: undefined
})

//分页配置数据
let pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 0
})

//媒体类型字典
import { useDictStore } from '@/stores/dictStore.js'
let options = ref([])
options.value = useDictStore().getBykey('media_type')

//表格数据
let tableData = ref([])

// onMounted生命周期
onMounted(() => {
  search()
})

//重置按钮操作
function resetQuery() {
  queryformRef.value.resetFields()
}

//搜索按钮操作
function search() {
  //分页查询接口
  MediaAPIResources.pagelist(queryform.value, pageData.value).then((res) => {
    //填充表格数据
    tableData.value = res.data.list
    //填充分页数据
    pageData.value.total = res.data.total
  })
}

//编辑操作
function toEdit(mediaId) {
  EditMediaId.value = mediaId
  EditDialogVisible.value = true
}

//删除操作
function toDelete(mediaId) {
  ElMessageBox.confirm('是否确定要删除编号为' + mediaId + '的媒体?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(() => {
    doDelete(mediaId)
  })
}

//删除
function doDelete(mediaId) {
  MediaAPIResources.deleteMedia({ mediaId })
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

//日期格式化操作
function DateTimeformatter(row) {
  return row.releaseDate.substring(0,10)
}

</script>
<style scoped>
</style>
