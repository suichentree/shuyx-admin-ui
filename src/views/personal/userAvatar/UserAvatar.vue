<template>
  <el-form :model="form" label-width="auto" label-position="right">
    <el-form-item label="用户编号" prop="userId">
      <el-input v-model="form.userId" placeholder="请输入" disabled />
    </el-form-item>
    <el-form-item label="用户名称" prop="userName">
      <el-input v-model="form.userName" placeholder="请输入" disabled />
    </el-form-item>
    <div>
      <el-form-item label="用户头像" prop="avatar">
        <el-upload
          element-loading-text="获取用户头像中..."
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
            <div class="el-upload__tip" style="font-weight: bold">
              只支持.png / .jpg / .jpeg 文件。并且只支持上传一个文件。
            </div>
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
  <span>
    <el-button type="primary" @click="submit">保存</el-button>
  </span>
</template>
<script setup>
import { ref,onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import UserAPIResources from '@/api/user.service.js'
import { useUserStore } from '@/stores/userStore'
import OSSAPIResources from '@/api/oss.service.js'

// onMounted生命周期
onMounted(() => {
  search()
})

//查询当前用户详细信息
let form = ref({})
function search(){
  let a = {
    userId:useUserStore().userInfo.userId
  }
  UserAPIResources.selectById(a).then((res) => {
    form.value = res.data[0]
  }).finally(()=>{
    //拼接文件链接
    if (form.value.avatar != null) {
      fileList.value.push({
        url: 'http://localhost:39000/user-avatar-bucket/' + form.value.avatar,
        status: 'success'
      })
    }
  })
}

//头像相关=====================
let disabled = ref(false)
let isShowProgress = ref(false)
let progressPercent = ref(0)
let fileList = ref([])
//移除头像
let handleRemove = () => {
  fileList.value = []
}

//点击确定操作
function submit() {
  //判断文件列表是否有文件
  if (fileList.value.length === 0) {
    return ElMessage.error('请选择要上传的文件')
  } else if (fileList.value.length > 1) {
    return ElMessage.warning('默认上传第一个文件，其余文件会被舍弃')
  } else {
    console.log('fileList.value[0]', fileList.value[0].name)
    //判断文件的名称是否与avatar一致。一致表示文件没有改变,无动作。否则就要更新文件
    //如果avatar为null,表示本来就没有文件,需要更新文件
    if (fileList.value[0].name !== form.value.avatar) {
      //开始更新文件
      //显示进度条
      isShowProgress.value = true
      let param = new FormData()
      param.append('file', fileList.value[0].raw)
      param.append('bucketName', 'user-avatar-bucket')
      param.append('oldFileName', form.value.avatar)
      //调接口
      OSSAPIResources.updateFile(param, (e) => {
        progressPercent.value = Number(((e.loaded / e.total) * 100).toFixed(0))
      })
        .then((res) => {
          //更新文件所属字段
          let a = {
            userId: form.value.userId,
            avatar: res.data.fileUrl
          }
          UserAPIResources.updateUser(a).then((res) => {
            if (res.code == 200) {
              ElMessage.success('更新成功')
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

</script>
<style scoped></style>
