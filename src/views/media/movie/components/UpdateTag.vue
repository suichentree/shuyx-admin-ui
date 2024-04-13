<template>
  <el-drawer
    v-model="UpdateVisible"
    title="媒体标签配置"
    direction="rtl"
    :before-close="handleClose"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="formRef" :model="form">
      <el-form-item label="媒体编号" prop="mediaName">
        <el-input v-model="form.mediaId" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="媒体名称" prop="mediaName">
        <el-input v-model="form.mediaName" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="风格分类" prop="mediaTagArray1">
        <el-checkbox-group v-model="mediaTagArray1">
          <el-checkbox
            v-for="item in movieTypeArray"
            :key="item.tagId"
            :label="item.tagName"
            :value="item.tagId"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div></div>
      <el-form-item label="时间分类" prop="mediaTagArray2">
        <el-radio-group v-model="mediaTagArray2">
          <el-radio
            v-for="item in releaseDateArray"
            :key="item.tagId"
            :label="item.tagName"
            :value="item.tagId"
          />
        </el-radio-group>
      </el-form-item>
      <div></div>
      <el-form-item label="地区分类" prop="mediaTagArray3">
        <el-radio-group v-model="mediaTagArray3">
          <el-radio
            v-for="item in regionArray"
            :key="item.tagId"
            :label="item.tagName"
            :value="item.tagId"
          />
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button @click="reset" type="danger">重置</el-button>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref, inject, onMounted } from 'vue'
import TagAPIResources from '@/api/tag.service.js'
import MediaTagAPIResources from '@/api/mediaTag.service.js'
import { ElMessage } from 'element-plus'
import { useMediaTagStore } from '@/stores/mediaTagStore'

//接收父组件传递的数据
let UpdateVisible = inject('UpdateVisible')
let props = defineProps({
  UpdateForm: Object
})
let form = ref({})
form.value = props.UpdateForm

// onMounted生命周期
onMounted(() => {
  searchTag()
  search()
})

//查询全部标签，并进行分组
let mediaTagArray1 = ref([])
let mediaTagArray2 = ref(undefined)
let mediaTagArray3 = ref(undefined)
let movieTypeArray = ref([])
let releaseDateArray = ref([])
let regionArray = ref([])
function searchTag() {
  //先查询store中是否存储了媒体标签数据
  if (useMediaTagStore().isSave) {
    //store已有媒体标签数据
    movieTypeArray.value = useMediaTagStore().movieTypeArray
    releaseDateArray.value = useMediaTagStore().releaseDateArray
    regionArray.value = useMediaTagStore().regionArray
  } else {
    //store无媒体标签数据，调接口获取
    TagAPIResources.findBy().then((res) => {
      let a = []
      a = res.data
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
      //将媒体标签数据，存储到store中
      useMediaTagStore().movieTypeArray = movieTypeArray.value
      useMediaTagStore().releaseDateArray = releaseDateArray.value
      useMediaTagStore().regionArray = regionArray.value
      useMediaTagStore().isSave = true
    })
  }
}

//根据媒体id查询媒体所属的标签。
function search() {
  let mediaId = form.value.mediaId
  TagAPIResources.findByMediaId({ mediaId }).then((res) => {
    if (res.code == 200) {
      let b = res.data
      b.forEach((obj) => {
        if (obj.tagType === 'Movie') {
          mediaTagArray1.value.push(obj.tagId)
        }
        if (obj.tagType === 'Time') {
          mediaTagArray2.value = obj.tagId
        }
        if (obj.tagType === 'Region') {
          mediaTagArray3.value = obj.tagId
        }
      })
    }
  })
}

//重置
let formRef = ref(undefined)
function reset() {
  mediaTagArray1.value = []
  mediaTagArray2.value = undefined
  mediaTagArray3.value = undefined
}

//保存
function submit() {
  //拼接tagIds
  form.value.tagIds = [...mediaTagArray1.value]
  if (mediaTagArray2.value != undefined) {
    form.value.tagIds.push(mediaTagArray2.value)
  }
  if (mediaTagArray3.value != undefined) {
    form.value.tagIds.push(mediaTagArray3.value)
  }
  //拼接tagList
  form.value.tagList = []
  regionArray.value.forEach((i) => {
    if (i.tagId == mediaTagArray3.value) {
      form.value.tagList.push(i)
    }
  })
  releaseDateArray.value.forEach((i) => {
    if (i.tagId == mediaTagArray2.value) {
      form.value.tagList.push(i)
    }
  })
  movieTypeArray.value.forEach((i) => {
    mediaTagArray1.value.forEach((j) => {
      if (i.tagId == j) {
        form.value.tagList.push(i)
      }
    })
  })
  //保存
  MediaTagAPIResources.saveOrUpdateBatch(form.value).then((res) => {
    if (res.code == 200) {
      reset()
      handleClose()
      ElMessage.success('更新成功')
    }
  })
}

function handleClose(){
  UpdateVisible.value = false
}

</script>
<style scoped></style>
