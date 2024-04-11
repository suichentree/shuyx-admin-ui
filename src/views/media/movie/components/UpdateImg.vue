<template>
  <el-dialog
    v-model="isVisible"
    width="60%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <template #header>
      <span>更新封面</span>
    </template>
    <el-form :model="form" label-width="auto" label-position="right">
      <el-form-item label="媒体编号" prop="mediaId">
        <el-input v-model="form.mediaId" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="媒体名称" prop="mediaName">
        <el-input v-model="form.mediaName" placeholder="请输入" disabled />
      </el-form-item>
      <div>
        <el-form-item label="封面图" prop="mediaCover">
          <el-upload
            v-loading="imgloading"
            element-loading-text="获取图片封面中..."
            v-model:file-list="fileList"
            action="#"
            :limit="1"
            list-type="picture-card"
            :auto-upload="false"
          >
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
              <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
            <template #tip>
              <div class="el-upload__tip" style="font-weight:bold">只支持.png / .jpg / .jpeg 文件。并且只支持上传一个文件。</div>
              <!--进度条-->
              <div v-if="isShowProgress">
                <span>文件进度条</span>
                <el-progress :text-inside="true" :stroke-width="20" :percentage="progressPercent" />
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, inject, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import MediaAPIResources from '@/api/media.service.js'
import OSSAPIResources from '@/api/oss.service.js'

//接收父组件传递的数据
let isVisible = inject('ImgVisible')
let props = defineProps({
  ImgForm: Object
})
let form = ref({})
form.value = props.ImgForm

//封面图相关=====================
let imgloading = ref(false)
let isShowProgress = ref(false)
let progressPercent = ref(0)
let fileList = ref([])
//移除封面
let handleRemove = () => {
  fileList.value = []
}

// onMounted生命周期
onMounted(() => {
  search()
})

//根据媒体的mediaCover，获取封面外链
function search() {
  imgloading.value = true
  let mediaCover = form.value.mediaCover
  if (mediaCover != null) {
    let a = {
      fileName: form.value.mediaCover,
      bucketName: 'media-cover-bucket'
    }
    //获取封面外链接口
    OSSAPIResources.getFileUrl(a).then((res) => {
      fileList.value.push({
        url: res.data,
        status: 'success'
      })
    })
  }
  imgloading.value = false
}

//点击确定操作
function submit() {
  //判断文件列表是否有文件
  if (fileList.value.length === 0) {
    return ElMessage.error('请选择要上传的封面')
  } else if (fileList.value.length > 1) {
    return ElMessage.warning('默认上传第一个封面，其余封面会被舍弃')
  } else {
    console.log('fileList.value[0]', fileList.value[0].name)
    //判断文件的名称是否与mediaCover一致。一致表示封面文件没有改变,无动作。否则就要更新封面文件
    //如果mediaCover为null,表示媒体本来就没有封面文件
    if (fileList.value[0].name !== form.value.mediaCover) {
      //开始更新封面文件
      //显示进度条
      isShowProgress.value = true
      let param = new FormData()
      param.append('file', fileList.value[0].raw)
      param.append('bucketName', 'media-cover-bucket')
      param.append('oldFileName', form.value.mediaCover)
      //调接口
      OSSAPIResources.updateFile(param, (e) => {
        progressPercent.value = Number(((e.loaded / e.total) * 100).toFixed(0))
      })
        .then((res) => {
          //更新媒体的封面字段
          let a = {
            mediaId: form.value.mediaId,
            mediaCover: res.data.fileUrl
          }
          MediaAPIResources.updateMedia(a).then((res) => {
            if (res.code == 200) {
              ElMessage.success('更新成功')
              cancel()
            }
          })
        })
        .finally(() => {
          isShowProgress.value = false
          progressPercent.value = 0
        })
    }
  }
}

//取消
function cancel() {
  isVisible.value = false
}
</script>
<style scoped></style>
