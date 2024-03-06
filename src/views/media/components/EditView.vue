<template>
  <el-dialog
    v-model="DialogVisible"
    width="30%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <template #header>
      <span>编辑</span>
    </template>
    <el-form :inline="true" :model="form" :rules="rules" ref="formRef" label-width="auto" label-position="right">
          <el-form-item label="媒体名称" prop="mediaName">
            <el-input v-model="form.mediaName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="媒体分类" prop="mediaType">
            <el-select v-model="form.mediaType" placeholder="请选择" clearable>
              <el-option
                v-for="obj in options"
                :key="obj.value"
                :label="obj.label"
                :value="obj.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="导演" prop="director">
            <el-input v-model="form.director" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="演员" prop="actor">
            <el-input v-model="form.actor" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="上映日期" prop="releaseDate">
            <el-date-picker
              v-model="form.releaseDate"
              type="date"
              placeholder="请选择"
            />
          </el-form-item>
          <el-form-item label="制片地区" prop="region">
            <el-input v-model="form.region" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="媒体评分" prop="mediaScore">
            <el-input-number v-model="form.mediaScore" :precision="1" :step="0.1" :max="10" :min="1" />
          </el-form-item>
          <h4>分类信息配置</h4>
          <el-form-item label="类型分类" prop="">
            <el-select v-model="mediaGenreArray1" multiple placeholder="请选择" clearable>
              <el-option
                v-for="item in movieTypeArray"
                :key="item.genreId"
                :label="item.genreName"
                :value="item.genreId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间分类" prop="">
            <el-select v-model="mediaGenreArray2" placeholder="请选择" clearable>
              <el-option
                v-for="item in releaseDateArray"
                :key="item.genreId"
                :label="item.genreName"
                :value="item.genreId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="地区分类" prop="">
            <el-select v-model="mediaGenreArray3" placeholder="请选择" clearable>
              <el-option
                v-for="item in regionArray"
                :key="item.genreId"
                :label="item.genreName"
                :value="item.genreId"
              />
            </el-select>
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
import { ref, inject, getCurrentInstance } from 'vue'
import MediaAPIResources from '@/api/media.service.js'
import { ElMessage } from 'element-plus'

//this
const { proxy } = getCurrentInstance()

//表单对象
const formRef = ref()

//接收父组件传递的数据
let DialogVisible = inject('EditDialogVisible')
let form = inject('EditForm')
let movieTypeArray = inject('movieTypeArray')
let releaseDateArray = inject('releaseDateArray')
let regionArray = inject('regionArray')

let mediaGenreArray1 = ref([])
let mediaGenreArray2 = ref([])
let mediaGenreArray3 = ref([])

let options = [
  {
    value: 'Movie',
    label: '电影'
  },
  {
    value: 'Anime',
    label: '动漫'
  },
  {
    value: 'TV',
    label: '电视剧'
  }
]


//表单校验规则
const rules = ref({
  genreName: [{ required: true, message: '请输入', trigger: 'blur' }],
  type: [{ required: true, message: '请选择', trigger: 'blur' }]
})

//点击确定操作
function submit() {
  //表单校验
  proxy.$refs.formRef.validate((valid) => {
    //若校验成功
    if (valid) {
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
<style scoped>
</style>
