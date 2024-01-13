<template>
  <el-row style="height: 100%" :gutter="10">
    <el-col :span="8">
      <el-card shadow="never" :body-style="{ padding: '0px' }" style="height: 100%">
        <div class="card-div">
            <el-row justify="space-between">
                <el-tag>角色树</el-tag>
                <el-button @click="search" size="small">刷新</el-button>
                <el-button type="success" @click="toAdd" size="small">新增角色</el-button>
            </el-row>
        </div>
        <div class="card-div">
          <el-input v-model="queryform.roleName" placeholder="请输入" clearable>
            <template #append><el-button :icon="Search" @click="search"/></template>
          </el-input>
        </div>
        <div class="card-div">
          <el-tree :data="treeData" :props="{children:'children',label:'roleName'}" @node-click="handleNodeClick" default-expand-all/>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card shadow="never" :body-style="{ padding: '0px' }">
        <el-tabs type="border-card" class="demo-tabs">
          <el-tab-pane label="角色信息维护">
            <!--编辑角色表单组件-->
            <EditRoleForm/>
          </el-tab-pane>
          <el-tab-pane label="角色菜单维护">

          </el-tab-pane>
          <el-tab-pane label="角色用户维护">

          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
  <AddView/>
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import APIResources from './DemoView.service'
import { ElMessage} from 'element-plus'
import { Search } from '@element-plus/icons-vue'

// 组件注册
import EditRoleForm from './components/EditRoleForm.vue'
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
.card-div {
  padding: 10px;
}
</style>
