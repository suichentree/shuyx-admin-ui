<template>
  <el-dialog
    v-model="DialogVisible"
    width="40%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <template #header>
      <span>编辑</span>
    </template>
    <el-form :model="EditForm">
      <el-form-item label="媒体编号" prop="mediaId">
        <el-input v-model="EditForm.mediaId" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="剧集序号" prop="episodesNumber">
        <el-input-number v-model="EditForm.episodesNumber" placeholder="请输入" :min="0"/>
      </el-form-item>
      <el-form-item label="剧集名称" prop="episodesName">
        <el-input v-model="EditForm.episodesName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="上传剧集文件">
        暂不支持已上传文件修改
      </el-form-item>
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
import { ref,inject,watch} from 'vue'
import EpisodesAPIResources from '@/api/episodes.service.js'
import { ElMessage } from 'element-plus'

//接收父组件数据
let DialogVisible = inject('EditDialogVisible')
let EditForm = inject('EditForm')

//取消===============
function cancel() {
  DialogVisible.value = false
}

//确定=================
function submit(){
  EpisodesAPIResources.update(EditForm.value).then(()=>{
    ElMessage.success("更新成功")
  }).finally(()=>{
    cancel()
  })
}


</script>
<style scoped></style>
