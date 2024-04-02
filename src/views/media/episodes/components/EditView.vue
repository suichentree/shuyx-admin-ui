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
    <el-form :model="form">
      <el-form-item label="媒体编号" prop="mediaId">
        <el-input v-model="form.mediaId" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="剧集序号" prop="episodesNumber">
        <el-input-number v-model="form.episodesNumber" placeholder="请输入" :min="0"/>
      </el-form-item>
      <el-form-item label="剧集名称" prop="episodesName">
        <el-input v-model="form.episodesName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="剧集文件">
        <el-upload
          action="#"
          :limit="1"
          :file-list="fileList"
          :on-change="onChange"
          :auto-upload="false"
          accept="video/*"
        >
          <template #trigger>
            <el-button type="primary">选取文件</el-button>
          </template>
          <el-button
            style="margin-left: 10px"
            type="success"
            @click="uploadlPartFile"
            :loading="btnLoading"
          >
            上传到服务器
          </el-button>
        </el-upload>
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
let props = defineProps({
  form:Object
})
let DialogVisible = inject('EditDialogVisible')
let EditForm = ref(props.form)

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

//剧集文件相关=======================
//把剧集文件加入到文件列表中
let fileList = ref([]) 
let currentFile = {
  name:EditForm.value.episodesUrl,
  percentage:100,
  status:"success",
  url:EditForm.value.episodesUrl
}
fileList.value.push(currentFile)



</script>
<style scoped></style>
