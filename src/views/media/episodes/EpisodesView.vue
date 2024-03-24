<template>
  <el-space direction="vertical" :fill="true" style="width: 100%">
    <!--查询条件-->
    <el-card shadow="never" :body-style="{ padding: '0px' }">
      <div class="card-div">
        <el-row justify="space-between">
          <el-col :span="2"><el-tag>查询条件</el-tag></el-col>
          <el-col :span="6" style="text-align: right">
            <el-button type="primary" @click="search">搜索</el-button>
            </el-col>
        </el-row>
      </div>
      <div class="card-div">
        <el-form :inline="true" :model="queryform">
          <el-form-item label="媒体编号" prop="mediaId">
            <el-input v-model="queryform.mediaId" placeholder="请输入" clearable disabled/>
          </el-form-item>
          <el-form-item label="媒体名称" prop="mediaName">
            <el-input v-model="queryform.mediaName" placeholder="请输入" clearable disabled/>
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
          <el-table-column label="剧集ID" align="center" key="episodesId" prop="episodesId" />
          <el-table-column label="媒体ID" align="center" key="mediaId" prop="mediaId" />
          <el-table-column label="剧集序号" align="center" key="episodesNumber" prop="episodesNumber" />
          <el-table-column label="剧集名称" align="center" key="episodesName" prop="episodesName" />
          <el-table-column label="剧集地址" align="center" key="episodesUrl" prop="episodesUrl" />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-tooltip content="修改" placement="top">
                <el-button link type="primary" icon="Edit" @click="toEdit(scope.row.episodesId)" />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button link type="primary" icon="Delete" @click="toDelete(scope.row.episodesId)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </el-space>
  <!--新增对话框-->
  <AddView :mediaId="queryform.mediaId"/>
  <!--编辑对话框-->
  <EditView />
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import EpisodesAPIResources from '@/api/episodes.service.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()

// 组件注册
import AddView from './components/AddView.vue'
import EditView from './components/EditView.vue'

console.log("route.query.id",route.query.id);
console.log("route.query.name",route.query.name);

//表单对象
let queryform = ref({
  mediaId: route.query.id,  //接收router传参
  mediaName: route.query.name, //接收router传参
})

//新增对话框
const AddDialogVisible = ref(false)
provide('AddDialogVisible', AddDialogVisible)

//编辑对话框
const EditDialogVisible = ref(false)
const EditForm = ref({})
provide('EditDialogVisible', EditDialogVisible)
provide('EditForm', EditForm)

//表格数据
const tableData = ref([])

/**--------------------- */

// onMounted生命周期
onMounted(() => {
  //查询
  search()
})

//搜索按钮操作
function search() {
  //请求参数
  let query = ref({
    mediaId: 6
  })
  EpisodesAPIResources.findBy(query.value).then((res) => {
    tableData.value = res.data
  })
}

//编辑操作
function toEdit(genreId) {
  let query = ref({
    genreId: genreId
  })
}

//删除操作
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

//删除
function doDelete(id) {
  //调用接口
  EpisodesAPIResources.delete({id})
  .then(() => {
    ElMessage.success('删除成功')
  })
  .finally(() => {
    search()
  })
}


</script>
<style scoped>
.card-div {
  padding: 10px;
}
</style>
