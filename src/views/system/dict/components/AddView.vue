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
    <el-form :model="form" :rules="rules" ref="formRef" label-position="right">
      <el-row>
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="form.dictName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="字典编码" prop="dictCode">
          <el-input v-model="form.dictCode" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="字典标签" prop="dictLabel">
          <el-input v-model="form.dictLabel" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="字典值" prop="dictValue">
          <el-input v-model="form.dictValue" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            placeholder="请输入"
            clearable
            :autosize="{ minRows: 3 }"
            type="textarea"
          />
        </el-form-item>
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
import { ref, inject } from 'vue'
import DictAPIResources from '@/api/dict.service.js'
import { ElMessage } from 'element-plus'


//接收父组件传递的数据
let DialogVisible = inject('AddDialogVisible')

//表单对象
let formRef = ref()
let form = ref({})

//------------------------

//添加操作
function add() {
  //调用接口
  DictAPIResources.add(form.value).then((res) => {
    if (res.code == 200) {
      ElMessage.success('添加成功')
      cancel()
    }
  })
}

//取消
function cancel() {
  formRef.value.resetFields()
  DialogVisible.value = false
}
</script>
<style scoped></style>
