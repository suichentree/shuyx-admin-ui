<template>
  <el-space direction="vertical" :fill="true" style="width: 100%">
    <!--查询条件-->
    <el-card shadow="never" :body-style="{ padding: '10px' }">
      <el-row justify="space-between">
        <el-col :span="12"><el-tag>查询条件</el-tag></el-col>
        <el-col :span="12" style="text-align: right">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
      </el-row>
      <el-form :inline="true" ref="formRef">
        <el-form-item label="选择媒体" prop="mediaId">
          <el-select v-model="MediaId" placeholder="Select" style="width: 240px" filterable remote :remote-method="findAllMedia">
            <el-option
              v-for="item in mediaArray"
              :key="item.mediaId"
              :label="item.mediaName"
              :value="item.mediaId"
            >
              <span style="float: left">{{ item.mediaName }}</span>
              <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">媒体编号 {{
                item.mediaId
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!--查询结果-->
    <el-card shadow="never" :body-style="{ padding: '10px' }">
      <el-row justify="space-between">
        <el-col :span="2"><el-tag>查询结果</el-tag></el-col>
        <el-col :span="6" style="text-align: right">
          <el-button type="success" @click="toAdd()">新增</el-button>
        </el-col>
      </el-row>
      <!--数据表格-->
      <el-table :data="tableData" border>
        <el-table-column label="剧集ID"  key="episodesId" prop="episodesId" />
        <el-table-column
          label="剧集序号"
          key="episodesNumber"
          prop="episodesNumber"
        />
        <el-table-column label="剧集名称"  key="episodesName" prop="episodesName" />
        <el-table-column label="剧集地址"  key="episodesUrl" prop="episodesUrl" />
        <el-table-column label="操作" >
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="toEdit(scope.row)" />
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                link
                type="primary"
                icon="Delete"
                @click="toDelete(scope.row.episodesId)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-space>
  <!--新增对话框-->
  <AddView/>
  <!--编辑对话框-->
  <EditView v-if="EditForm"/>
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import EpisodesAPIResources from '@/api/episodes.service.js'
import MediaAPIResources from '@/api/media.service.js'
import { ElMessage, ElMessageBox } from 'element-plus'
//组件注册
import AddView from './components/AddView.vue'
import EditView from './components/EditView.vue'

//表格相关=======================
const tableData = ref([])

//查询相关==================
let mediaArray = ref([])
function findAllMedia(obj){
  let query = {
    mediaName: obj
  }
  MediaAPIResources.findBy(query).then(res=>{
    mediaArray.value = res.data
  })
}

let MediaId = ref(undefined)
function search() {
  if(MediaId.value == undefined){
    return ElMessage.error("请先选择媒体")
  }
  let query = {
    mediaId: MediaId.value
  }
  EpisodesAPIResources.findBy(query).then((res) => {
    tableData.value = res.data
  })
}

//新增相关==============
const AddDialogVisible = ref(false)
provide('AddDialogVisible', AddDialogVisible)
provide('MediaId', MediaId)
function toAdd(){
  if(MediaId.value == undefined){
    return ElMessage.error("请先选择媒体")
  }
  AddDialogVisible.value = true
}


//编辑相关====================
let EditDialogVisible = ref(false)
provide('EditDialogVisible', EditDialogVisible)
let EditForm = ref({})
provide('EditForm', EditForm)

function toEdit(obj) {
  EditForm.value = obj
  console.log("EditForm111",EditForm.value);
  EditDialogVisible.value = true
}

//删除相关=====================
function toDelete(id) {
  ElMessageBox.confirm('是否确定要删除编号为' + id + '的数据?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(() => {
    doDelete(id)
  })
}

function doDelete(id) {
  //调用接口
  EpisodesAPIResources.delete({id}).then(() => {
      ElMessage.success('删除成功')
    })
    .finally(() => {
      search()
    })
}





</script>
<style scoped></style>
