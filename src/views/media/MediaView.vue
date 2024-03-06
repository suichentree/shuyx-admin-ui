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
          <el-form-item label="媒体名称" prop="mediaName">
            <el-input v-model="queryform.mediaName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="媒体分类" prop="mediaType">
            <el-select v-model="queryform.mediaType" placeholder="请选择" clearable>
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
          <el-table-column label="媒体编号" align="center" key="mediaId" prop="mediaId" />
          <el-table-column label="媒体名称" align="center" key="mediaName" prop="mediaName" />
          <el-table-column label="媒体分类" align="center" key="mediaType" prop="mediaType" />
          <el-table-column label="导演" align="center" key="director" prop="director" />
          <el-table-column label="演员" align="center" key="actor" prop="actor" />
          <el-table-column
            label="上映日期"
            align="center"
            key="releaseDate"
            prop="releaseDate"
            :formatter="DateTimeformatter"
          />
          <el-table-column label="制片地区" align="center" key="region" prop="region" />
          <el-table-column label="媒体评分" align="center" key="mediaScore" prop="mediaScore" />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-tooltip content="修改" placement="top">
                <el-button link type="primary" icon="Edit" @click="toEdit(scope.row.mediaId)" />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button link type="primary" icon="Delete" @click="toDelete(scope.row.mediaId)" />
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
import MediaAPIResources from '@/api/media.service.js'
import GenreAPIResources from '@/api/genre.service.js'
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
  mediaId: undefined,
  mediaName: undefined,
  mediaType: undefined
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
  }
]

//表格数据
const tableData = ref([])

//电影类型数组
let movieTypeArray = ref([])
provide('movieTypeArray', movieTypeArray)
//上映时间数组
let releaseDateArray = ref([])
provide('releaseDateArray', releaseDateArray)
//地区数组
let regionArray = ref([])
provide('regionArray', regionArray)

/**--------------------- */

// onMounted生命周期
onMounted(() => {
  searchGenre()
  search()
})

//重置按钮操作
function resetQuery() {
  queryformRef.value.resetFields()
}

//查询全部类型，并进行分组
function searchGenre() {
  GenreAPIResources.pagelist().then((res) => {
    let a = res.data
    a.forEach((obj) => {
      if (obj.type === 'Movie') {
        movieTypeArray.value.push(obj)
      }
      if (obj.type === 'Time') {
        releaseDateArray.value.push(obj)
      }
      if (obj.type === 'Region') {
        regionArray.value.push(obj)
      }
    })
  })
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
  let query = ref({
    mediaId: mediaId
  })
  //分页查询接口，根据id查询
  MediaAPIResources.pagelist(query.value, pageData.value)
    .then((res) => {
      EditForm.value = res.data.list[0]
    })
    .finally(() => {
      //打开编辑对话框
      EditDialogVisible.value = true
    })
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

//日期表头格式化操作
function DateTimeformatter(row) {
  // 将ISO时间字符串 格式化一下
  return new Date(row.createTime).toLocaleString()
}
</script>
<style scoped>
.card-div {
  padding: 10px;
}
</style>
