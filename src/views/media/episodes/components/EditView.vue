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
          <el-form-item label="类型名称" prop="genreName">
            <el-input v-model="form.genreName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="类型分类" prop="type">
            <el-select v-model="form.type" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
import APIResources from '@/api/genre.service.js'
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
  genreName: [{ required: true, message: '请输入', trigger: 'blur' }],
  type: [{ required: true, message: '请选择', trigger: 'blur' }]
})

const options = [
  {
    value: 'Movie',
    label: '电影',
  },
  {
    value: 'Anime',
    label: '动漫',
  },
  {
    value: 'TV',
    label: '电视剧',
  },
  {
    value: 'Time',
    label: '时间',
  },
  {
    value: 'Region',
    label: '地区',
  }
]

//点击确定操作
function submit() {
  //表单校验
  proxy.$refs.formRef.validate((valid) => {
    //若校验成功
    if (valid) {
      //调用接口
      APIResources.updateGenre(form.value).then((res) => {
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
