<template>
  <!-- 主容器卡片 -->
  <el-card 
    shadow="always" 
    :body-style="{ padding: '24px 32px' }" 
    style="max-width: 100%; margin: 0px auto; border-radius: 8px;"
  >
    <el-form :model="form" label-width="auto" label-position="right">
      <!-- 用户编号 -->
      <el-form-item label="用户编号" prop="userId">
        <el-input 
          v-model="form.userId" 
          placeholder="请输入" 
          disabled 
          style="background: #f8f9fa; border-radius: 6px;"
        />
      </el-form-item>

      <!-- 用户名称 -->
      <el-form-item label="用户名称" prop="userName">
        <el-input 
          v-model="form.userName" 
          placeholder="请输入" 
          disabled 
          style="background: #f8f9fa; border-radius: 6px;"
        />
      </el-form-item>

      <!-- 头像上传 -->
      <el-form-item label="用户头像" prop="avatar">
        <el-upload
          element-loading-text="获取用户头像中..."
          v-model:file-list="fileList"
          action="#"
          :limit="1"
          list-type="picture-card"
          :auto-upload="false"
          style="max-width: 400px;"
        >
          <el-icon><Plus /></el-icon>
          <!-- 自定义文件项样式 -->
          <template #file="{ file }">
            <div class="custom-upload-item">
              <img 
                class="el-upload-list__item-thumbnail" 
                :src="file.url" 
                alt="" 
                style="border-radius: 6px;"
              />
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                  style="background: rgba(0,0,0,0.5); border-radius: 50%;"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
          <!-- 提示与进度条 -->
          <template #tip>
            <div class="el-upload__tip" style="font-weight: bold; color: #606266;">
              只支持.png / .jpg / .jpeg 文件，仅允许上传1个文件
            </div>
            <div v-if="isShowProgress" style="margin-top: 8px;">
              <el-progress 
                :text-inside="true" 
                :stroke-width="20" 
                :percentage="progressPercent" 
                color="#409eff"
                style="width: 100%;"
              />
              <div style="text-align: center; color: #606266; font-size: 12px;">
                上传进度：{{ progressPercent }}%
              </div>
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>

    <!-- 保存按钮 -->
    <div style="margin-top: 24px; text-align: left;">
      <el-button 
        type="primary" 
        @click="submit"
        style="padding: 8px 24px; border-radius: 6px;"
      >
        保存
      </el-button>
    </div>
  </el-card>
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

<style scoped>
/* 上传文件项自定义样式 */
.custom-upload-item {
  position: relative;
  width: 100px;
  height: 100px;
}

.el-upload-list__item-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 输入框禁用样式优化 */
.el-input[disabled] {
  background-color: #f8f9fa;
  border-color: #e4e7ed;
  color: #606266;
}

/* 按钮悬停动画 */
.el-button:not(.is-disabled):hover {
  transform: translateY(-1px);
  transition: transform 0.1s ease;
}

/* 上传组件样式调整 */
.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 6px;
  margin-right: 16px;
}

.el-upload--picture-card:hover {
  border-color: #409eff;
  color: #409eff;
}
</style>