<template>
  <el-dialog
    v-model="DialogVisible"
    width="60%"
    @open="handOpen()"
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
      <h4>分类信息配置</h4>
      <el-form-item label="类型分类">
        <el-checkbox-group v-model="mediaGenreArray1">
          <el-checkbox
            v-for="item in movieTypeArray"
            :key="item.genreId"
            :label="item.genreName"
            :value="item.genreId"
            ></el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <div></div>
      <el-form-item label="时间分类">
        <el-radio-group v-model="mediaGenreArray2">
          <el-radio
            v-for="item in releaseDateArray"
            :key="item.genreId"
            :label="item.genreName"
            :value="item.genreId"
          />
        </el-radio-group>
      </el-form-item>
      <div></div>
      <el-form-item label="地区分类">
        <el-radio-group v-model="mediaGenreArray3">
          <el-radio
            v-for="item in regionArray"
            :key="item.genreId"
            :label="item.genreName"
            :value="item.genreId"
          />
        </el-radio-group>
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
import GenreAPIResources from '@/api/genre.service.js'
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
  genreDTOList: [],
  genreIds:[]
})

//接收父组件传递的数据
let DialogVisible = inject('EditDialogVisible')

let movieTypeArray = ref([])
let releaseDateArray = ref([])
let regionArray = ref([])

let mediaGenreArray1 = ref([])
let mediaGenreArray2 = ref(undefined)
let mediaGenreArray3 = ref(undefined)

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

onMounted(() => {
  searchGenre()
})

//查询全部类型，并进行分组
function searchGenre() {
  GenreAPIResources.pagelist().then((res) => {
    let a = res.data
    a.forEach((obj) => {
      if (obj.type === 'Movie') {
        movieTypeArray.value.push(obj)
      }
      if (obj.type === 'Time') {
        releaseDateArray.value.push(obj)
      }
      if (obj.type === 'Region') {
        regionArray.value.push(obj)
      }
    })
  })
}


//打开回调
function handOpen() {
  //先重置数据
  form.value = {}
  mediaGenreArray1.value = []
  mediaGenreArray2.value = undefined
  mediaGenreArray3.value = undefined

  let query = {
    mediaId:props.Id
  }

  //查询接口
  MediaAPIResources.findBy(query).then((res) => {
    //媒体数据
    form.value = res.data[0]
    //媒体类型数据
    let a =  res.data[0].genreDTOList
    a.forEach((obj) => {
      if(obj.type === 'Movie'){
        mediaGenreArray1.value.push(obj.genreId)
      }
      if(obj.type === 'Time'){
        mediaGenreArray2.value = obj.genreId
      }
      if(obj.type === 'Region'){
        mediaGenreArray3.value = obj.genreId
      }
    })
  })
}

//点击确定操作
function submit() {
  //表单校验
  proxy.$refs.formRef.validate((valid) => {
    if (valid) {
      //修饰数据，拼接genreIds
      form.value.genreIds = [mediaGenreArray2.value,mediaGenreArray3.value,...mediaGenreArray1.value]
      //修饰数据，拼接genreDTOList
      form.value.genreDTOList = []
      regionArray.value.forEach((i)=>{
        if(i.genreId == mediaGenreArray3.value){
          form.value.genreDTOList.push(i)
        }
      })
      releaseDateArray.value.forEach((i)=>{
        if(i.genreId == mediaGenreArray2.value){
          form.value.genreDTOList.push(i)
        }
      })
      movieTypeArray.value.forEach((i)=>{
        mediaGenreArray1.value.forEach((j)=>{
          if(i.genreId == j){
            form.value.genreDTOList.push(i)
          }
        })
      })
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
