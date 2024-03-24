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
      <span>新增</span>
    </template>
    <el-form :inline="true" :model="form" :rules="rules" ref="formRef">
      <el-row>
        <el-form-item label="剧集编号" prop="episodesNumber">
          <el-input-number v-model="form.episodesNumber" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="上传剧集" prop="episodesUrl2">
          <el-upload
            ref="uploadRef"
            action="#"
            :limit="1"
            :file-list="fileList"
            :on-change="onChange"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button type="primary">选取文件</el-button>
            </template>
            <el-button style="margin-left: 10px" type="success" @click="uploadlFile" :loading="btnLoading">
              上传到服务器
            </el-button>
          </el-upload>
        </el-form-item>
      </el-row>
          <el-progress v-if="isShowProgress" :text-inside="true" :stroke-width="20" :percentage="progressPercent" />
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
import EpisodesAPIResources from '@/api/episodes.service.js'
import OSSAPIResources from '@/api/oss.service.js'
import { ElMessage } from 'element-plus'
import axios from 'axios' //引入axios

//接收父组件数据
let props = defineProps({
  mediaId:Number,
})
let DialogVisible = inject('AddDialogVisible')

//表单对象
const formRef = ref()
const form = ref({
  mediaId: props.mediaId
})


//------------------------

//添加操作
function add() {
    if(form.value.episodesName !== undefined){
      //调用接口
      EpisodesAPIResources.add(form.value).then((res) => {
        if (res.code == 200) {
          ElMessage.success('添加成功')
          cancel()
        }
      })
    }else{
      ElMessage.error("请上传文件")
    }
}

//取消
function cancel() {
  formRef.value.resetFields()
  DialogVisible.value = false
}

let uploadRef = ref(undefined)
let isShowProgress = ref(false) //是否显示进度条
let progressPercent = ref(0)  //进度条进度
let fileList = ref([])   //文件列表
let btnLoading = ref(false)

//文件改变时,将新添加的文件加入到文件列表中
function onChange(file) {
  fileList.value.push(file)
}

//自定义文件上传请求
function uploadlFile() {
  //判断文件列表中是否有文件再上传
  if (fileList.value.length === 0) {
    return ElMessage.error('请选择要上传的文件')
  }

  //按钮加载
  btnLoading.value = true

  //遍历文件列表，把列表中的每个文件都上传
  fileList.value.forEach((file) => {
    let param = new FormData()
    param.append('file', file.raw)
    param.append('bucketName', 'media-episodes-bucket')
    isShowProgress.value = true
    //调接口
    OSSAPIResources.uploadFile(param,(e)=>{
        progressPercent.value = Number((e.loaded / e.total * 100).toFixed(0))
    }).then((res) => {
      //按钮加载
      btnLoading.value = false
      //设置文件列表中该文件的状态，变为成功
      file.url = res.data.fileName
      file.status = "success"
      //隐藏进度条，并把进度清空
      isShowProgress.value = false
      progressPercent.value = 0;
      
      form.value.episodesName = res.data.fileName
    })
  })
  
}

//自定义分片文件上传请求
function uploadlPartFile() {
  //判断文件列表中是否有文件再上传
  if (fileList.value.length === 0) {
    return ElMessage.error('请选择要上传的文件')
  }
  //获取文件列表中的第一个文件
  let currentFile = fileList.value[0].raw
  console.log("11",currentFile);

  //将文件分片,得到分片数组
  let fileChunkList = createFileChunk(currentFile)

  //请求参数
  let param = new FormData()
  param.append('fileName', currentFile.name)
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
      console.log('------------------------------------')
      console.log('开始上传第' + (i + 1) + '个分片')
      
      //此处用axios发送put请求,该请求用于上传分片文件
      //请求参数就是分片文件和对应的预签名链接
      //注意该请求是同步的。即一个分片文件上传完毕之后，再上传下一个分片文件
      await axios({
        method: 'put',
        url: chunkList[i],
        data: fileChunkList[i].file
      }).then(async function (res) {
        if (res.status == 200) {
          console.log('第' + (i + 1) + '个分片,上传成功')
        } else {
          console.log('第' + (i + 1) + '个分片,上传失败')
        }
      })
    }

    //如果最后一个分片文件上传完毕，那么就调用分片文件合并请求
    let obj = {
      bucketName: 'media-episodes-bucket',
      fileName: currentFile.name,
      uploadId: uploadId
    }
    console.log("开始合并分片")
    OSSAPIResources.mergePartFile(obj).then((r) => {
      console.log('mergePartFile', r)
      console.log("分片合并完成")
    })
  })
}

/**
 * 把文件分片
 */
function createFileChunk(file) {
  let fileChunkList = []
  let chunkSize = 100 * 1024 * 1024 //每个分片大小为100mb
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
