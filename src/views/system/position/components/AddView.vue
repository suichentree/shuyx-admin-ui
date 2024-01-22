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
          <el-form-item label="职位名称" prop="positionName">
            <el-input v-model="addform.positionName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="职位编码" prop="positionCode">
            <el-input v-model="addform.positionCode" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="职位状态" prop="status">
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
import APIResources from '../PositionView.service.js'
import { ElMessage } from 'element-plus'

//this
const { proxy } = getCurrentInstance()

//接收父组件传递的数据
const DialogVisible = inject('AddDialogVisible')

//表单校验规则
const rules = ref({
  positionCode: [{ required: true, message: '请选择', trigger: 'blur' }],
  positionName: [{ required: true, message: '请输入', trigger: 'blur' }],
  status: [{ required: true, message: '请选择', trigger: 'blur' }]
})

//表单对象
const addformRef = ref()
const addform = ref({
  positionName: undefined,
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
      APIResources.addPosition(addform.value).then((res) => {
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
</style>
