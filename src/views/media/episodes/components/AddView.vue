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
      <span>新增</span>
    </template>
    <el-form :model="form" ref="formRef">
      <el-form-item label="选择媒体" prop="mediaId">
        <el-select v-model="form.mediaId" placeholder="Select" style="width: 240px" filterable remote :remote-method="findAllMedia">
          <el-option
            v-for="item in mediaArray"
            :key="item.mediaId"
            :label="item.mediaName"
            :value="item.mediaId"
          >
            <span style="float: left">{{ item.mediaName }}</span>
            <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">媒体编号 {{
              item.mediaId
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="剧集序号" prop="episodesNumber">
        <el-input-number v-model="form.episodesNumber" placeholder="请输入" :min="0" />
      </el-form-item>
      <el-form-item label="剧集名称" prop="episodesName">
        <el-input v-model="form.episodesName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="上传剧集文件">
        <el-upload
          ref="uploadRef"
          action="#"
          :limit="1"
          :file-list="fileList"
          :on-change="onChange"
          :auto-upload="false"
          accept=".mkv,.mp4"
        >
          <template #trigger>
            <el-button type="primary">选取文件</el-button>
          </template>
          <template #tip>
              <div class="el-upload__tip" style="font-weight:bold">支持.mkv / .mp4文件。并且只支持上传一个文件。</div>
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
        <el-button type="primary" @click="add">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, inject, watch } from 'vue'
import EpisodesAPIResources from '@/api/episodes.service.js'
import OSSAPIResources from '@/api/oss.service.js'
import MediaAPIResources from '@/api/media.service.js'
import { ElMessage } from 'element-plus'
import axios from 'axios' //引入axios

//接收父组件数据
let DialogVisible = inject('AddDialogVisible')

//表单对象
let formRef = ref()
let form = ref({
  mediaId:undefined,
  episodesNumber: 0
})

//监听form
watch(form,(newValue, oldValue) => {
    if (oldValue.episodesNumber >= 0) {
      newValue.episodesName = '第' + newValue.episodesNumber + '集'
    }
  },
  { deep: true }
)

//选择媒体===========
let mediaArray = ref([])
function findAllMedia(obj){
  let query = {
    mediaName: obj
  }
  MediaAPIResources.findBy(query).then(res=>{
    mediaArray.value = res.data
  })
}

//添加操作
function add() {
  if (form.value.mediaId !== undefined) {
    //调用接口
    EpisodesAPIResources.add(form.value).then((res) => {
      if (res.code == 200) {
        ElMessage.success('添加成功')
        cancel()
      }
    })
  } else {
    ElMessage.warning('请填写剧集信息,并上传文件')
  }
}

//取消
function cancel() {
  formRef.value.resetFields()
  form.value = {
    mediaId:undefined,
    episodesNumber: 0
  }
  DialogVisible.value = false
  isShowProgress.value = false
  fileList.value = []
}

//文件改变时,将新添加的文件加入到文件列表中
function onChange(file) {
  fileList.value.push(file)
}

//自定义分片文件上传相关====
let uploadRef = ref(undefined)
let isShowProgress = ref(false) //是否显示进度条
let fileList = ref([]) //文件列表
let btnLoading = ref(false)
let ProgressArray = ref([])
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
    let a = { progressPercent: 0,id:(i+1) }
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
  OSSAPIResources.createMultipartUpload(param).then(async (res) => {
    //uploadId
    let uploadId = res.data.uploadId
    //预签名链接数组
    let chunkList = res.data.uploadUrlList
    //依次分片上传
    for (let i = 0; i < fileChunkList.length; i++) {
      console.log("开始上传第"+ (i + 1) + "个分片\n");
      //此处用axios发送put请求,该请求用于上传分片文件
      //请求参数就是分片文件和对应的预签名链接
      //注意该请求是同步的。即一个分片文件上传完毕之后，再上传下一个分片文件
      await axios({
        method: 'put',
        url: chunkList[i],
        data: fileChunkList[i].file,
        onUploadProgress:(e)=>{
          ProgressArray.value[i].progressPercent = Number(((e.loaded / e.total) * 100).toFixed(0))
        }
      }).then(async function (res) {
        if (res.status == 200) {
          console.log("第" + (i + 1) + "个分片,上传成功\n");
        } else {
          console.log("第" + (i + 1) + "个分片,上传失败\n");
        }
      })
    }
    //如果最后一个分片文件上传完毕，那么就调用分片文件合并请求
    let obj = {
      bucketName: 'media-episodes-bucket',
      fileName: newFileName,
      uploadId: uploadId
    }
    console.log("开始合并分片");
    OSSAPIResources.mergePartFile(obj).then((r) => {
      console.log("分片合并完成");
       //显示文件上传完成
       fileList.value[0].url = res.data.fileName
       fileList.value[0].status = 'success'
       //获取上传文件的链接，作为剧集链接
       form.value.episodesUrl = r.data.fileUrl
    })
  }).finally(()=>{
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
