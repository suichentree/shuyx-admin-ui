<template>
  <div>
    <el-row style="height: 100%" :gutter="16"> 
      <!-- 左侧角色树（小屏幕24,中等屏幕8） -->
      <el-col :xs="24" :sm="8">
        <el-card shadow="always" :body-style="{ padding: '0px' }" style="height: 100%;" >
          <div class="card-div">
            <el-row justify="space-between" align="middle">
              <el-tag type="info">角色树</el-tag>
              <el-button  type="success"   @click="toAdd">
                新增角色
              </el-button>
            </el-row>
          </div>
          <!-- 搜索输入框 -->
          <div class="card-div">
            <el-input v-model="queryform.roleName"  placeholder="搜索角色名称" clearable >
              <template #append>
                <el-button :icon="Search"  @click="search"/>
              </template>
            </el-input>
          </div>
          <!-- 角色树组件 -->
          <div class="card-div" >
            <el-tree 
              :data="treeData" 
              :props="{children:'children',label:'roleName'}" 
              @node-click="handleNodeClick" 
              default-expand-all 
              :highlight-current="true"
              style="background: #f8f9fa;" 
            />
          </div>
        </el-card>
      </el-col>

      <!-- 右侧标签页列（小屏幕24,中等屏幕16） -->
      <el-col :xs="24" :sm="16">
        <el-card shadow="always" :body-style="{ padding: '0px' }" style="height: 100%;" >
          <div class="card-div">
              <el-tabs type="border-card">
                <el-tab-pane label="角色信息维护">
                  <EditRoleForm/>
                </el-tab-pane>
                <el-tab-pane label="角色菜单维护" :lazy="true">
                  <EditRoleMenu/>
                </el-tab-pane>
                <el-tab-pane label="角色用户维护" :lazy="true">
                  <EditRoleUser/>
                </el-tab-pane>
              </el-tabs>
          </div>
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
