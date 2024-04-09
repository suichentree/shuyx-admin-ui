<template>
  <el-dialog
    v-model="DialogVisible"
    width="60%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <template #header>
      <span>新增</span>
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
        <el-select v-model="form.mediaType" placeholder="请选择" clearable  style="width:200px" disabled>
          <el-option
            v-for="obj in options"
            :key="obj.value"
            :label="obj.label"
            :value="obj.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="导演" prop="director">
        <el-input v-model="form.director" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="演员" prop="actor">
        <el-input v-model="form.actor" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="form.description"  :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="上映日期" prop="releaseDate">
        <el-date-picker v-model="form.releaseDate" type="date" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="制片地区" prop="region">
        <el-input v-model="form.region" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="评分" prop="mediaScore">
        <el-input-number
          v-model="form.mediaScore"
          :precision="1"
          :step="0.1"
          :max="10"
          :min="1"
        />
      </el-form-item>
      <h4>分类信息配置</h4>
      <el-form-item label="风格分类" prop="">
        <el-checkbox-group v-model="mediaTagArray1">
          <el-checkbox
            v-for="item in movieTypeArray"
            :key="item.tagId"
            :label="item.tagName"
            :value="item"
            ></el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <div></div>
      <el-form-item label="时间分类" prop="">
        <el-radio-group v-model="mediaTagArray2">
          <el-radio
            v-for="item in releaseDateArray"
            :key="item.tagId"
            :label="item.tagName"
            :value="item"
          />
        </el-radio-group>
      </el-form-item>
      <div></div>
      <el-form-item label="地区分类" prop="">
        <el-radio-group v-model="mediaTagArray3">
          <el-radio
            v-for="item in regionArray"
            :key="item.tagId"
            :label="item.tagName"
            :value="item"
          />
        </el-radio-group>
      </el-form-item>
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
import { ref, inject,onMounted, getCurrentInstance } from 'vue'
import MediaAPIResources from '@/api/media.service.js'
import { ElMessage } from 'element-plus'
import TagAPIResources from '@/api/tag.service.js'

//this
const { proxy } = getCurrentInstance()

//接收父组件传递的数据
let DialogVisible = inject('AddDialogVisible')

//表单校验规则
const rules = ref({
  mediaName: [{ required: true, message: '请输入', trigger: 'blur' }]
})

let mediaTagArray1 = ref([])
let mediaTagArray2 = ref(undefined)
let mediaTagArray3 = ref(undefined)

//表单对象
let formRef = ref()
let form = ref({
  mediaName: undefined,
  mediaType: "Movie",
  director: undefined,
  actor: undefined,
  description: undefined,
  releaseDate: undefined,
  region: undefined,
  mediaScore: 6.0,
  tagList: []
})

//媒体类型字典
import { useDictStore } from '@/stores/dictStore.js'
let options = ref([])
options.value = useDictStore().getBykey('media_type')

// onMounted生命周期
onMounted(() => {
  searchTag()
})

//查询全部标签，并进行分组
//电影类型数组
let movieTypeArray = ref([])
//时间数组
let releaseDateArray = ref([])
//地区数组
let regionArray = ref([])

function searchTag() {
  TagAPIResources.findBy().then((res) => {
    let a = res.data
    a.forEach((obj) => {
      if (obj.tagType === 'Movie') {
        movieTypeArray.value.push(obj)
      }
      if (obj.tagType === 'Time') {
        releaseDateArray.value.push(obj)
      }
      if (obj.tagType === 'Region') {
        regionArray.value.push(obj)
      }
    })
  })
}

//新增
function add() {
  //表单校验
  proxy.$refs.formRef.validate((valid) => {
    //若校验成功
    if (valid) {
      //拼接类型id数组
      form.value.tagList = [mediaTagArray2.value,mediaTagArray3.value,...mediaTagArray1.value]
      // 调用接口
      MediaAPIResources.addMedia(form.value).then((res) => {
        if (res.code == 200) {
          ElMessage.success('添加成功')
          cancel()
        }
      })
    }
  })
}

//取消
function cancel() {
  formRef.value.resetFields()
  DialogVisible.value = false
}

</script>
<style scoped></style>
