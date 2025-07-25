<template>
  <el-space direction="vertical" :fill="true" style="width: 100%;">
    <!-- 查询条件卡片 -->
    <el-card 
      shadow="always" 
      :body-style="{ padding: '10px 10px' }" 
      style="border-radius: 8px;"
    >
      <div class="card-div">
        <el-row justify="space-between" style="margin-bottom: 12px;">
          <el-col :span="24" :xs="24" :sm="24" :md="2" :lg="2">
            <el-tag type="info" effect="light">查询条件</el-tag>
          </el-col>
          <el-col :span="24" :xs="24" :sm="24" :md="6" :lg="6" style="text-align: right;">
            <el-button 
              type="primary" 
              @click="search"
            >搜索</el-button>
            <el-button 
              @click="resetQuery"
            >重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="card-div">
        <el-form :inline="true" :model="queryform" ref="queryformRef">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input 
              v-model="queryform.menuName" 
              placeholder="请输入菜单名称" 
              clearable 
              style="border-radius: 6px; width: 200px;"
            />
          </el-form-item>
          <el-form-item label="菜单状态" prop="status">
            <el-select 
              v-model="queryform.status" 
              placeholder="请选择菜单状态" 
              clearable 
              style="width: 200px; border-radius: 6px;"
            >
              <el-option v-for="obj in menuStatusDict" :key="obj.value" :label="obj.label" :value="obj.value" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 查询结果卡片 -->
    <el-card 
      shadow="always" 
      :body-style="{ padding: '10px 10px' }" 
      style="border-radius: 8px;"
    >
      <div class="card-div">
        <el-row justify="space-between">
          <el-col :span="24" :xs="24" :sm="24" :md="2" :lg="2">
            <el-tag type="info" effect="light">查询结果</el-tag>
          </el-col>
          <el-col :span="24" :xs="24" :sm="24" :md="6" :lg="6" style="text-align: right;">
            <el-button 
              type="success" 
              @click="AddDialogVisible = true"
              style="padding: 8px 16px; border-radius: 6px;"
            >新增</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="card-div">
        <!-- 响应式表格 -->
        <el-table 
          :data="tableData" 
          row-key="menuId" 
          border 
          stripe
          style="border-radius: 6px; overflow: hidden;"
          :header-cell-style="{ background: '#f8f9fa', color: '#303133', height: '48px' }"
          :row-style="{ height: '48px' }"
        >
          <el-table-column label="菜单编号" align="center" key="menuId" prop="menuId" :show-overflow-tooltip="true"/>
          <el-table-column label="菜单名称" align="center" key="menuName" prop="menuName" :show-overflow-tooltip="true"/>
          
          <!-- 移动端隐藏列 -->
          <el-table-column v-if="!isMobile" label="菜单路径" align="center" key="menuPath" prop="menuPath" :show-overflow-tooltip="true"/>
          <el-table-column v-if="!isMobile" label="菜单页面" align="center" key="menuPage" prop="menuPage" :show-overflow-tooltip="true"/>
          
          <el-table-column label="菜单图标" align="center" key="icon" prop="icon" :show-overflow-tooltip="true">
            <template #default="scope">
              <el-icon style="font-size: 18px;"><component :is="scope.row.icon"></component></el-icon>
              <span style="margin-left: 4px;">{{ scope.row.icon }}</span>
            </template>
          </el-table-column>
          <el-table-column label="菜单类型" align="center" key="menuType" prop="menuType">
            <template #default="scope">
              <el-tag v-if="scope.row.menuType === 0" type="success" effect="light">目录</el-tag>
              <el-tag v-else effect="light">菜单</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" show-overflow-tooltip>
            <template #default="scope">
              <el-tooltip content="修改" placement="top">
                <el-button 
                  link 
                  type="primary" 
                  icon="Edit" 
                  @click="toEdit(scope.row)"
                />
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button 
                  link 
                  type="danger" 
                  icon="Delete" 
                  @click="toDelete(scope.row.menuId)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </el-space>
  <!--新增对话框-->
  <AddView />
  <!--编辑对话框-->
  <EditView />
</template>
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, onMounted, provide,computed } from 'vue'
import APIResources from '@/api/menu.service'
//导入组件
import AddView from './components/AddView.vue'
import EditView from './components/EditView.vue'

// 响应式判断移动端（屏幕宽度小于768px）
const isMobile = computed(() => {
  return window.innerWidth < 768
})

// 监听窗口变化
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 768
})

//表格相关的
const tableData = ref([])

//新增对话框相关的
const AddDialogVisible = ref(false)
provide('AddDialogVisible', AddDialogVisible)


//编辑对话框相关的
const EditDialogVisible = ref(false)
const EditForm = ref({})
provide('EditDialogVisible', EditDialogVisible)
provide('EditForm', EditForm)

//对话框的上级菜单选择数据
const menuTreeList = ref([])
provide('menuTreeList', menuTreeList)
//构建菜单树形数据
function buildtreeMenuData(obj){
    const treed = ref([])
    //先添加根节点
    treed.value.push({
        "menuId": 0,
        "menuName": "根目录",
        "parentId": -1,
        "menuPath": undefined,
        "menuPage": null,
        "menuType": 0,
        "isLink":0,
        "visible": 0,
        "status": 0,
        "icon": "root",
        "children": []
    })
    return treed.value.concat(obj)
}

//查询表单相关
const queryformRef = ref()
const queryform = ref({
  menuName: undefined,
  status: undefined,
})

//菜单状态字典数据
import { useDictStore } from '@/stores/dictStore.js'
let menuStatusDict = useDictStore().getBykey('menu_status')

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
  if(queryform.value.menuName == undefined && queryform.value.status == undefined){
    //全查接口
    APIResources.menuTreelist().then((res) => {
      if (res.code == 200) {
        //填充表格数据
        tableData.value = res.data
        //将所有菜单数据赋值给menuTreeList
        menuTreeList.value = buildtreeMenuData(res.data)
      }
    })

  }else{
    //条件查询接口
    APIResources.menulist(queryform.value).then((res) => {
      if (res.code == 200) {
        //填充表格数据
        tableData.value = res.data
      }
    })
  }
}

//编辑操作
function toEdit(obj) {
  //打开编辑对话框
  EditDialogVisible.value = true
  EditForm.value = obj
}

//删除操作
function toDelete(id) {
  ElMessageBox.confirm('是否确定要删除编号为' + id + '的菜单?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(() => {
    deleteMenu(id)
  })
}

//删除用户
function deleteMenu(menuId) {
  //调用接口
  APIResources.deleteMenu({ menuId }).then((res) => {
    if (res.code == 200) {
      ElMessage.success("删除成功")
    }
  }).finally(()=>{
    search()
  });
}

</script>
<style scoped>
/* 卡片样式优化 */
.card-div {
  padding: 8px 0; /* 调整内边距与卡片整体风格一致 */
}

/* 输入框/选择器聚焦效果 */
.el-input:focus, .el-input:hover,
.el-select:focus, .el-select:hover {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64,158,255,0.1);
}

/* 按钮悬停动画 */
.el-button:not(.is-disabled):hover {
  transform: translateY(-1px);
  transition: transform 0.1s ease;
}

/* 表格行悬停样式 */
.el-table__body tr:hover > td {
  background-color: #f8f9fa !important;
}

/* 标签样式调整 */
.el-tag {
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .el-form-item {
    margin-right: 0 !important;
    width: 100%;
  }
  .el-input, .el-select {
    width: 100% !important; /* 小屏幕输入框占满宽度 */
  }
  .el-table {
    font-size: 12px; /* 缩小表格字体 */
  }
  .el-table-column {
    min-width: auto !important; /* 自动调整列宽 */
  }
}
</style>
