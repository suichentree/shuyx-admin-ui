<template>
  <!-- 响应式容器，限制最大宽度 -->
  <div class="responsive-container">
    <el-row style="height: 100%" :gutter="16"> <!-- 调整列间距为16px -->
      <!-- 左侧角色树列（小屏幕占满宽度） -->
      <el-col :span="8" :xs="24" :sm="24" :md="8">
        <el-card 
          shadow="always" 
          :body-style="{ padding: '16px 20px' }" 
          style="height: 100%; border-radius: 8px;" 
        >
          <!-- 标题与新增按钮 -->
          <div class="card-header">
            <el-row justify="space-between" align="middle">
              <el-tag type="info" effect="light">角色树</el-tag>  <!-- 优化标签样式 -->
              <el-button 
                type="success" 
                @click="toAdd" 
                size="small"
                style="padding: 4px 12px; border-radius: 6px;" 
              >
                新增角色
              </el-button>
            </el-row>
          </div>

          <!-- 搜索输入框 -->
          <div class="card-search" style="margin-top: 12px;">
            <el-input 
              v-model="queryform.roleName" 
              placeholder="搜索角色名称" 
              clearable
              style="border-radius: 6px;" 
            >
              <template #append>
                <el-button 
                  :icon="Search" 
                  @click="search"
                  style="border-radius: 0 6px 6px 0;" 
                />
              </template>
            </el-input>
          </div>

          <!-- 角色树组件 -->
          <div class="card-tree" style="margin-top: 16px; height: calc(100% - 80px); overflow-y: auto;">
            <el-tree 
              :data="treeData" 
              :props="{children:'children',label:'roleName'}" 
              @node-click="handleNodeClick" 
              default-expand-all 
              :highlight-current="true"
              style="background: #f8f9fa; padding: 12px; border-radius: 6px;" 
            />
          </div>
        </el-card>
      </el-col>

      <!-- 右侧标签页列（小屏幕占满宽度） -->
      <el-col :span="16" :xs="24" :sm="24" :md="16">
        <el-card 
          shadow="always" 
          :body-style="{ padding: '16px 20px' }" 
          style="border-radius: 8px; height: 100%;"
        >
          <el-tabs type="border-card" class="demo-tabs">
            <el-tab-pane label="角色信息维护">
              <EditRoleForm/>
            </el-tab-pane>
            <el-tab-pane label="角色菜单维护" lazy="true">
              <EditRoleMenu/>
            </el-tab-pane>
            <el-tab-pane label="角色用户维护" lazy="true">
              <EditRoleUser/>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <AddView/>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import APIResources from '@/api/role.service.js'
import { ElMessage} from 'element-plus'
import { Search } from '@element-plus/icons-vue'

// 组件注册
import EditRoleForm from './components/EditRoleForm.vue'
import EditRoleMenu from './components/EditRoleMenu.vue'
import EditRoleUser from './components/EditRoleUser.vue'
import AddView from './components/AddView.vue'

// onMounted生命周期
onMounted(() => {
  //先查询
  search()
})

//包含无上级角色的角色树形数据
const roleTreeData = ref([])
//添加无上级角色节点
roleTreeData.value.push({
  roleId: 0,
  roleName: '无上级角色',
  parentId: -1,
  status: 0,
  children: []
})
provide('roleTreeData', roleTreeData)

//角色树相关的
const treeData = ref([])
const queryform = ref({
  roleName: undefined
})

//新增对话框相关的
const AddDialogVisible = ref(false)
provide('AddDialogVisible', AddDialogVisible)
function toAdd(){
  AddDialogVisible.value = true
}

//角色信息维护相关的
const EditForm = ref({
  roleId: undefined,
  parentId: undefined,
  roleName: undefined,
  status: undefined
})
provide('EditForm', EditForm)

//------------------------

//树形节点点击操作
function handleNodeClick(data){
    //把data对象的属性值赋值给左边
    EditForm.value = Object.assign({}, data);
}

//搜索按钮操作
function search() {
  if (queryform.value.roleName == undefined || queryform.value.roleName == '') {
    //全查接口
    APIResources.roleTreelist().then((res) => {
      if (res.code != 200) {
        ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
      }
      //填充表格数据
      treeData.value = res.data
      //填充数据
      roleTreeData.value = roleTreeData.value.concat(res.data)
    })
  } else {
    //条件查询接口
    APIResources.rolelist(queryform.value).then((res) => {
      if (res.code != 200) {
        ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
      }
      //填充表格数据
      treeData.value = res.data
    })
  }
}

</script>

<style scoped>
/* 响应式容器，限制最大宽度并居中 */
.responsive-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px; /* 替代外部margin，使用内边距控制整体间距 */
}

/* 卡片头部样式 */
.card-header {
  padding-bottom: 8px; /* 替代margin，使用底部内边距 */
}

/* 搜索区域样式 */
.card-search .el-input {
  border-color: #e4e7ed;
  transition: all 0.3s;
}

.card-search .el-input:focus, 
.card-search .el-input:hover {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64,158,255,0.1); /* 新增聚焦阴影 */
}

/* 树组件样式优化 */
.el-tree {
  --el-tree-node-hover-bg-color: #f0f2f5; /* 调整悬停背景色 */
  --el-tree-node-padding: 4px 0; /* 调整节点间距 */
}

/* 标签页样式优化 */
.el-tabs.demo-tabs {
  height: 100%; /* 标签页占满容器高度 */
}

.el-tabs__content {
  height: calc(100% - 40px); /* 调整内容区域高度 */
  overflow-y: auto;
}

/* 小屏幕适配 */
@media (max-width: 768px) {
  .el-row {
    height: auto !important; /* 小屏幕取消固定高度 */
  }
  .card-tree {
    height: auto; /* 小屏幕树组件高度自适应 */
    margin-bottom: 16px;
  }
}
</style>
