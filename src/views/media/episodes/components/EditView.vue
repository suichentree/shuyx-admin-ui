<template>
  <el-dialog
    v-model="DialogVisible"
    width="50%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <template #header>
      <span>编辑</span>
    </template>
    <el-form :model="EditForm" ref="formRef">
      <el-form-item label="媒体编号" prop="mediaId">
        <el-input v-model="EditForm.mediaId" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="媒体名称" prop="mediaName">
        <el-input v-model="EditForm.media.mediaName" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="剧集序号" prop="episodesNumber">
        <el-input-number v-model="EditForm.episodesNumber" placeholder="请输入" :min="0" />
      </el-form-item>
      <el-form-item label="剧集名称" prop="episodesName">
        <el-input v-model="EditForm.episodesName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="当前剧集文件" prop="episodesUrl">
        <el-input v-model="EditForm.episodesUrl" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item>
        <el-alert title="上传新剧集文件会删除旧剧集文件" type="warning" :closable="false" />
      </el-form-item>
      <el-form-item label="上传新剧集文件">
        <el-upload
          ref="uploadRef"
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
    <!--进度条-->
    <div v-if="isShowProgress">
      <div v-for="(item, index) in ProgressArray" :key="index">
        <span>文件分片 {{ item.id }} 进度条</span>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="item.progressPercent" />
      </div>
    </div>
    <template #footer>
      <span>
        <el-button type="primary" @click="submit" v-loading="submitLoading">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, inject, watch } from 'vue'
import EpisodesAPIResources from '@/api/episodes.service.js'
import OSSAPIResources from '@/api/oss.service.js'
import { ElMessage } from 'element-plus'
import axios from 'axios' //引入axios
//接收父组件数据
let DialogVisible = inject('EditDialogVisible')
let EditForm = inject('EditForm')

//监听form
watch(EditForm,(newValue, oldValue) => {
    if (oldValue.episodesNumber >= 0) {
      newValue.episodesName = '第' + newValue.episodesNumber + '集'
    }
  },
  { deep: true }
)


//取消操作
let formRef = ref()
function cancel() {
  formRef.value.resetFields()
  ProgressArray.value = []
  fileList.value = []
  isShowProgress.value = false
  DialogVisible.value = false
}

//确定=================
let submitLoading = ref(false)
async function submit() {
  submitLoading.value = true
  //先删除旧剧集文件
  if (EditForm.value.NewEpisodesUrl != undefined) {
    //表示已上传新剧集文件，因此要先删除旧剧集文件
    let a = {
      bucketName: 'media-episodes-bucket',
      fileName: EditForm.value.episodesUrl
    }
    //调用文件删除接口
    await OSSAPIResources.delete(a).then(() => {
      ElMessage.info('已删除旧剧集文件')
    })
  }
  //文件链接替换为新的剧集文件的链接
  EditForm.value.episodesUrl = EditForm.value.NewEpisodesUrl   
  //然后调用更新接口
  EpisodesAPIResources.update(EditForm.value)
  .then(() => {
    ElMessage.success('更新成功')
  })
  .finally(() => {
    submitLoading.value = false
    cancel()
  })
}

//文件改变时,将新添加的文件加入到文件列表中
function onChange(file) {
  fileList.value.push(file)
}


//进度条数组
let ProgressArray = ref([])
let uploadRef = ref(undefined)
let isShowProgress = ref(false) //是否显示进度条
let fileList = ref([]) //文件列表
let btnLoading = ref(false)

//自定义分片文件上传请求
function uploadlPartFile() {
  //按钮加载
  btnLoading.value = true

  //判断文件列表中是否有文件再上传
  if (fileList.value.length === 0) {
    return ElMessage.error('请选择要上传的文件')
  }
  //获取文件列表中的第一个文件
  let currentFile = fileList.value[0].raw

  //将文件分片,得到分片数组
  let fileChunkList = createFileChunk(currentFile)

  //根据分片数量，创建对应的进度条
  for (let i = 0; i < fileChunkList.length; i++) {
    let a = { progressPercent: 0, id: i + 1 }
    ProgressArray.value.push(a)
  }

  //显示进度条
  isShowProgress.value = true

  //请求参数
  let param = new FormData()
  let newFileName = new Date().getTime() +"."+currentFile.name
  param.append('fileName', newFileName)
  param.append('bucketName', 'media-episodes-bucket')
  param.append('chunkNum', fileChunkList.length)

  //创建分片上传请求
  OSSAPIResources.createMultipartUpload(param)
    .then(async (res) => {
      //uploadId
      let uploadId = res.data.uploadId
      //预签名链接数组
      let chunkList = res.data.uploadUrlList
      //依次分片上传
      for (let i = 0; i < fileChunkList.length; i++) {
        console.log('开始上传第' + (i + 1) + '个分片\n')

        //此处用axios发送put请求,该请求用于上传分片文件
        //请求参数就是分片文件和对应的预签名链接
        //注意该请求是同步的。即一个分片文件上传完毕之后，再上传下一个分片文件
        await axios({
          method: 'put',
          url: chunkList[i],
          data: fileChunkList[i].file,
          onUploadProgress: (e) => {
            ProgressArray.value[i].progressPercent = Number(((e.loaded / e.total) * 100).toFixed(0))
          }
        }).then(async function (res) {
          if (res.status == 200) {
            console.log('第' + (i + 1) + '个分片,上传成功\n')
          } else {
            console.log('第' + (i + 1) + '个分片,上传失败\n')
          }
        })
      }
      //如果最后一个分片文件上传完毕，那么就调用分片文件合并请求
      let obj = {
        bucketName: 'media-episodes-bucket',
        fileName: newFileName,
        uploadId: uploadId
      }
      console.log('开始合并分片')
      OSSAPIResources.mergePartFile(obj).then((r) => {
        console.log('分片合并完成')
        //显示文件上传完成
        fileList.value[0].url = res.data.fileName
        fileList.value[0].status = 'success'
        //获取上传文件的链接，作为剧集链接
        EditForm.value.NewEpisodesUrl = r.data.fileUrl
      })
    })
    .finally(() => {
      //接触按钮加载
      btnLoading.value = false
    })
}

/**
 * 把文件分片
 */
function createFileChunk(file) {
  let fileChunkList = []
  let chunkSize = 500 * 1024 * 1024 //每个分片大小为500mb
  let count = 0
  while (count < file.size) {
    fileChunkList.push({
      file: file.slice(count, count + chunkSize)
    })
    count += chunkSize
  }
  return fileChunkList
}
</script>
<style scoped></style>
