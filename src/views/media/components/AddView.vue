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
    <el-form :inline="true" :model="addform" :rules="rules" ref="addformRef" label-width="auto" label-position="right">
          <el-form-item label="媒体名称" prop="mediaName">
            <el-input v-model="addform.mediaName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="媒体分类" prop="mediaType">
            <el-select v-model="addform.mediaType" placeholder="请选择" clearable>
              <el-option
                v-for="obj in options"
                :key="obj.value"
                :label="obj.label"
                :value="obj.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="导演" prop="director">
            <el-input v-model="addform.director" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="演员" prop="actor">
            <el-input v-model="addform.actor" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="上映日期" prop="releaseDate">
            <el-date-picker
              v-model="addform.releaseDate"
              type="date"
              placeholder="请选择"
            />
          </el-form-item>
          <el-form-item label="制片地区" prop="region">
            <el-input v-model="addform.region" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="媒体评分" prop="mediaScore">
            <el-input-number v-model="addform.mediaScore" :precision="1" :step="0.1" :max="10" :min="1" />
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
        <el-button type="primary" @click="add">确定</el-button>
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

//接收父组件传递的数据
let DialogVisible = inject('AddDialogVisible')
let movieTypeArray = inject('movieTypeArray')
let releaseDateArray = inject('releaseDateArray')
let regionArray = inject('regionArray')

//表单校验规则
const rules = ref({
  mediaName: [{ required: true, message: '请输入', trigger: 'blur' }]
})

let mediaGenreArray1 = ref([])
let mediaGenreArray2 = ref([])
let mediaGenreArray3 = ref([])

//表单对象
let addformRef = ref()
let addform = ref({
  mediaName: undefined,
  mediaType: "Movie",
  director: undefined,
  actor: undefined,
  releaseDate: undefined,
  region: undefined,
  mediaScore: 6.0
})

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


//------------------------

//新增
function add() {
  //表单校验
  proxy.$refs.addformRef.validate((valid) => {
    //若校验成功
    if (valid) {
      //调用接口
      MediaAPIResources.addMedia(addform.value).then((res) => {
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
  addformRef.value.resetFields()
  DialogVisible.value = false
}
</script>
<style scoped></style>
