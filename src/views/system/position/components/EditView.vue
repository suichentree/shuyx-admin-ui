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
      <span>编辑</span>
    </template>
    <el-form :inline="true" :model="form" :rules="rules" ref="formRef">
      <el-row>
        <el-col :span="24">
          <el-form-item label="职位名称" prop="positionName">
            <el-input v-model="form.positionName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="职位编码" prop="positionCode">
            <el-input v-model="form.positionCode" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="职位状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, inject, getCurrentInstance } from 'vue'
import APIResources from '@/api/position.service.js'
import { ElMessage } from 'element-plus'

//this
const { proxy } = getCurrentInstance()

//表单对象
const formRef = ref()

//接收父组件传递的数据
const DialogVisible = inject('EditDialogVisible')
const form = inject('EditForm')


//表单校验规则
const rules = ref({
  positionName: [{ required: true, message: '请输入', trigger: 'blur' }],
  positionCode: [{ required: true, message: '请输入', trigger: 'blur' }],
  status: [{ required: true, message: '请输入', trigger: 'blur' }]
})

//点击确定操作
function submit() {
  //表单校验
  proxy.$refs.formRef.validate((valid) => {
    //若校验成功
    if (valid) {
      //调用接口
      APIResources.updatePosition(form.value).then((res) => {
        if (res.code == 200) {
          ElMessage.success('更新成功')
          cancel()
        } else {
          ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
        }
      })
    }
  })
}

//取消操作
function cancel() {
  formRef.value.resetFields()
  DialogVisible.value = false
}
</script>
<style scoped>
</style>
