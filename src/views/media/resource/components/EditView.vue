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
    <el-form
      :inline="true"
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="auto"
      label-position="right"
    >
      <el-form-item label="媒体名称" prop="mediaName">
        <el-input v-model="form.mediaName" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="媒体分类" prop="mediaType">
        <el-select v-model="form.mediaType" disabled placeholder="请选择"  style="width: 200px">
          <el-option
            v-for="obj in options"
            :key="obj.value"
            :label="obj.label"
            :value="obj.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="媒体标签" prop="mediaTag">
        <el-input v-model="form.mediaTag" disabled placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="导演" prop="director">
        <el-input v-model="form.director" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="演员" prop="actor">
        <el-input v-model="form.actor" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="form.description" :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="上映日期" prop="releaseDate">
        <el-date-picker v-model="form.releaseDate" type="date" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="制片地区" prop="region">
        <el-input v-model="form.region" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="媒体评分" prop="mediaScore">
        <el-input-number v-model="form.mediaScore" :precision="1" :step="0.1" :max="10" :min="1" />
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
import { ref, inject, getCurrentInstance,onMounted} from 'vue'
import MediaAPIResources from '@/api/media.service.js'
import { ElMessage } from 'element-plus'
//this
const { proxy } = getCurrentInstance()

//接收父组件数据
let props = defineProps({
    Id:Number,
})

//表单对象
let formRef = ref()
let form = ref({
  mediaName: undefined,
  mediaType: 'Movie',
  director: undefined,
  actor: undefined,
  releaseDate: undefined,
  region: undefined,
  mediaScore: 6.0,
  tagList: [],
  tagIds:[]
})

//接收父组件传递的数据
let DialogVisible = inject('EditDialogVisible')

//标签类型字典
import { useDictStore } from '@/stores/dictStore.js'
let options = ref([])
options.value = useDictStore().getBykey('media_type')

onMounted(() => {
  search()
})
function search() {
  //先重置数据
  form.value = {}
  let query = {
    mediaId:props.Id
  }
  //查询接口
  MediaAPIResources.findBy(query).then((res) => {
    //媒体数据
    form.value = res.data[0]
  })
}

//点击确定操作
function submit() {
  //表单校验
  proxy.$refs.formRef.validate((valid) => {
    if (valid) {
      //调接口
      MediaAPIResources.updateMedia(form.value).then((res) => {
        if (res.code == 200) {
          ElMessage.success('更新成功')
          cancel()
        }
      })
    }
  })
}

//取消操作
function cancel() {
  formRef.value.resetFields()
  DialogVisible.value = false
}
</script>
<style scoped></style>
