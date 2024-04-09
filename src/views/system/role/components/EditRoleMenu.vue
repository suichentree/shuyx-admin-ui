<template>
  <el-form>
      <el-form-item>
        <el-col>
            <el-button type="primary" @click="search" size="small">查询菜单</el-button>
            <el-button type="primary" @click="toupdate" size="small">更新菜单</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-tree
        style="width:100%"
        ref="treeRef"
        :props="{ value: 'menuId', label: 'menuName', children: 'children' }"
        :data="menuTreeData"
        :default-checked-keys="roleMenuIds"
        :check-strictly="true"
        empty-text="加载中，请稍候"
        node-key="menuId"
        show-checkbox
        />
      </el-form-item>
  </el-form>
</template>
<script setup>
import { ref,inject,onMounted} from 'vue'
import APIResources from '@/api/role.service.js'
import { ElMessage,ElMessageBox} from 'element-plus'

//接收父组件传递的数据
const EditForm = inject('EditForm')

//菜单树形数据
const menuTreeData = ref([])
//角色已拥有菜单数组
const roleMenuIds = ref([])

//菜单树
const treeRef = ref()
const updateform = ref({
  roleId:undefined,
  menuIds:[]
})

onMounted(()=>{
  search()
})

//查询所有菜单和角色下的菜单信息
function search(){
  if(EditForm.value.roleId == undefined){
    return ElMessage.error("请先选中角色!")
  }
  const roleId = EditForm.value.roleId
  APIResources.selectRoleMenuInfo({roleId}).then((res) => {
      if (res.code != 200) {
        ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
      }
      menuTreeData.value = res.data.menuTreeData
      roleMenuIds.value = res.data.roleMenuIds
  })
}

/** 所有选中的和半选中的菜单节点数据 */
function getMenuAllCheckedKeys() {
  // 目前被选中的菜单节点
  let checkedKeys = treeRef.value.getCheckedKeys();
  // 半选中的菜单节点
  let halfCheckedKeys = treeRef.value.getHalfCheckedKeys();
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
  return checkedKeys;
}


//更新操作
function toupdate() {
  if(EditForm.value.roleId == undefined){
    return ElMessage.error("请先选中角色!")
  }
  ElMessageBox.confirm('是否更新角色名称为' + EditForm.value.roleName + '的菜单数据?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  }).then(()=>{
    //获取选中的菜单节点
    updateform.value.roleId = EditForm.value.roleId
    updateform.value.menuIds = getMenuAllCheckedKeys()
    APIResources.updateRoleMenuInfo(updateform.value).then((res) => {
      if (res.code == 200) {
        ElMessage.success('更新成功')
      } else {
        ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
      }
    })
  })
}

</script>
<style scoped>

</style>
