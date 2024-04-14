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
          <el-form-item label="标签名称" prop="tagName">
            <el-input v-model="queryform.tagName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="标签分类" prop="tagType">
            <el-select
              v-model="queryform.tagType"
              placeholder="请选择"
              clearable
              style="width: 200px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span
                  style="float: right; color: var(--el-text-color-secondary); font-size: 13px"
                  >{{ item.value }}</span
                >
              </el-option>
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
          <el-table-column label="标签编号" align="center" key="tagId" prop="tagId" />
          <el-table-column label="标签类型" align="center" key="tagType" prop="tagType" />
          <el-table-column label="标签名称" align="center" key="tagName" prop="tagName" />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-tooltip content="修改" placement="top">
                <el-button link type="primary" icon="Edit" @click="toEdit(scope.row)" />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button link type="primary" icon="Delete" @click="toDelete(scope.row.tagId)" />
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
  <EditView/>
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import TagAPIResources from '@/api/tag.service.js'
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
  tagId: undefined,
  tagName: undefined,
  type: undefined
})
//分页配置数据
let pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 0
})

//标签类型字典
import { useDictStore } from '@/stores/dictStore.js'
let options = ref([])
options.value = useDictStore().getBykey('media_tag_type')

//表格数据
let tableData = ref([])

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
  TagAPIResources.pagelist(queryform.value, pageData.value).then((res) => {
    //填充表格数据
    tableData.value = res.data.list
    //填充分页数据
    pageData.value.total = res.data.total
  })
}

//编辑操作
function toEdit(obj) {
  EditForm.value = obj
  EditDialogVisible.value = true
}

//删除操作
function toDelete(tagId) {
  ElMessageBox.confirm('是否确定要删除编号为' + tagId + '的标签?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(() => {
    doDelete(tagId)
  })
}

//删除用户
function doDelete(tagId) {
  //调用接口
  TagAPIResources.delete({ tagId })
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
