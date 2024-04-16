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
      <span>文件上传</span>
    </template>
    <el-form :model="form" label-position="right">
      <el-form-item label="文件上传" prop="fileName">
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
          <template #tip>
            <div class="el-upload__tip" style="font-weight: bold">一次只支持上传一个文件。</div>
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
      <el-form-item label="文件备注" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="请输入"
          clearable
          :autosize="{ minRows: 3 }"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <!--进度条-->
    <div v-if="isShowProgress">
      <div v-for="(item, index) in ProgressArray" :key="index">
        <span>文件分片 {{ item.id }} 上传进度条</span>
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
import { ref, inject } from 'vue'
import FileAPIResources from '@/api/file.service.js'
import OSSAPIResources from '@/api/oss.service.js'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import axios from 'axios'

//接收父组件传递的数据
let DialogVisible = inject('AddDialogVisible')

//表单对象
let form = ref({
  fileName: undefined,
  fileSize: undefined,
  fileAddress: undefined,
  uploadTime: undefined,
  remark: undefined,
  userId: useUserStore().userInfo.userId
})

//添加操作
function add() {
  //调用接口
  if (form.value.fileAddress != undefined) {
    FileAPIResources.add(form.value).then((res) => {
      if (res.code == 200) {
        ElMessage.success('添加成功')
        cancel()
      }
    })
  }else{
    ElMessage.warning("请先上传文件到服务器中")
  }
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
    let a = { progressPercent: 0, id: i + 1 }
    ProgressArray.value.push(a)
  }
  //显示进度条
  isShowProgress.value = true
  //请求参数
  let param = new FormData()
  let newFileName = new Date().getTime() + '.' + currentFile.name
  let currentFileSize = getSize(currentFile)
  param.append('fileName', newFileName)
  param.append('bucketName', 'file-service-bucket')
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
        bucketName: 'file-service-bucket',
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
        form.value.episodesUrl = r.data.fileUrl
      })
    })
    .finally(() => {
      //接触按钮加载
      btnLoading.value = false
      //文件上传成功后
      form.value.fileAddress = newFileName
      form.value.fileName = currentFile.name
      form.value.fileSize = currentFileSize
      form.value.uploadTime = new Date()
    })
}

//文件改变时,将新添加的文件加入到文件列表中
function onChange(file) {
  fileList.value.push(file)
}

//计算文件大小，以Mb为单位
function getSize(file) {
  let a = file.size / (1024 * 1024)
  return a.toFixed(2)
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

//取消
function cancel() {
  DialogVisible.value = false
  form.value = {}
  fileList.value = []
  ProgressArray.value = []
  isShowProgress.value = false
}
</script>
<style scoped></style>
