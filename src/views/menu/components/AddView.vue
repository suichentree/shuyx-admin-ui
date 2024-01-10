<template>
  <el-dialog
    v-model="DialogVisible"
    width="30%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <template #header>
      <span>新增</span>
    </template>
    <el-form :inline="true" :model="addform" :rules="rules" ref="addformRef">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单" prop="parentId">
            <el-tree-select
              :props="{ value: 'menuId', label: 'menuName', children: 'children' }"
              v-model="addform.parentId"
              :data="menuTreeList"
              check-strictly
              :render-after-expand="false"
              placeholder="请选择"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="addform.menuName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单路径" prop="menuPath">
            <el-input v-model="addform.menuPath" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单页面" prop="menuPage">
            <el-input v-model="addform.menuPage" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="addform.menuType">
              <el-radio :label="0">目录</el-radio>
              <el-radio :label="1">菜单</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单图标" prop="icon">
            <el-input v-model="addform.icon" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单状态" prop="status">
            <el-radio-group v-model="addform.status">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button type="primary" @click="add">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, inject, getCurrentInstance } from 'vue'
import APIResources from '../MenuView.service.js'
import { ElMessage } from 'element-plus'

//this
const { proxy } = getCurrentInstance()

//接收父组件传递的数据
const DialogVisible = inject('AddDialogVisible')
const menuTreeList = inject('menuTreeList')
//先添加根节点
menuTreeList.value.push({
    "menuId": 0,
    "menuName": "根菜单",
    "parentId": -1,
    "menuPath": "root",
    "menuPage": null,
    "menuType": 0,
    "status": 0,
    "icon": "root",
    "children": []
})


//表单校验规则
const rules = ref({
  parentId: [{ required: true, message: '请选择', trigger: 'blur' }],
  menuName: [{ required: true, message: '请输入', trigger: 'blur' }],
  menuPath: [{ required: true, message: '请输入', trigger: 'blur' }],
  menuPage: [{ required: true, message: '请输入', trigger: 'blur' }],
  menuType: [{ required: true, message: '请选择', trigger: 'blur' }],
  icon: [{ required: true, message: '请输入', trigger: 'blur' }],
  status: [{ required: true, message: '请选择', trigger: 'blur' }]
})

//表单对象
const addformRef = ref()
const addform = ref({
  menuName: undefined,
  parentId: undefined,
  menuPath: undefined,
  menuPage: undefined,
  menuType: undefined,
  icon: undefined,
  status: undefined
})

//------------------------

//添加操作
function add() {
  //表单校验
  proxy.$refs.addformRef.validate((valid) => {
    //若校验成功
    if (valid) {
      //调用接口
      APIResources.addMenu(addform.value).then((res) => {
        if (res.code == 200) {
          ElMessage.success('添加成功')
          cancel()
        } else {
          ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
        }
      })
    }
  })
}

//取消
function cancel() {
  addformRef.value.resetFields()
  DialogVisible.value = false
}
</script>
<style scoped>
.card-header {
  padding: 10px;
}
.card-main {
  padding: 10px;
}
.el-card {
  margin: 10px;
}
.el-pagination {
  margin: 10px;
}
</style>
