<template>
  <el-dialog
    v-model="DialogVisible"
    width="60%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <template #header>
      <span>新增</span>
    </template>
    <el-form
      :inline="true"
      :model="form"
      ref="formRef"
      label-width="auto"
      label-position="right"
    >
      <el-form-item label="媒体名称" prop="mediaName">
        <el-input v-model="form.mediaName" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="媒体分类" prop="mediaType">
        <el-select
          v-model="form.mediaType"
          placeholder="请选择"
          clearable
          style="width: 200px"
          disabled
        >
          <el-option
            v-for="obj in options"
            :key="obj.value"
            :label="obj.label"
            :value="obj.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="导演" prop="director">
        <el-input v-model="form.director" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="演员" prop="actor">
        <el-input v-model="form.actor" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input
          v-model="form.description"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="上映日期" prop="releaseDate">
        <el-date-picker v-model="form.releaseDate" type="date" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="制片地区" prop="region">
        <el-input v-model="form.region" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="评分" prop="mediaScore">
        <el-input-number v-model="form.mediaScore" :precision="1" :step="0.1" :max="10" :min="1" />
      </el-form-item>
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
import { ref, inject, onMounted, getCurrentInstance } from 'vue'
import MediaAPIResources from '@/api/media.service.js'
import { ElMessage } from 'element-plus'
import OSSAPIResources from '@/api/oss.service.js'

//this
const { proxy } = getCurrentInstance()
//接收父组件传递的数据
let DialogVisible = inject('AddDialogVisible')

//表单对象
let formRef = ref()
let form = ref({
  mediaName: undefined,
  mediaType: 'Movie',
  director: undefined,
  actor: undefined,
  description: undefined,
  releaseDate: undefined,
  region: undefined,
  mediaScore: 6.0,
  tagList: []
})

// onMounted生命周期
onMounted(() => {

})

async function add() {
    // 调用接口
    MediaAPIResources.addMedia(form.value).then((res) => {
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
