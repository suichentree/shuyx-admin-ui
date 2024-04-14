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
      <el-form-item label="风格标签" prop="StyleTagArray">
        <el-checkbox-group v-model="StyleTagArray">
          <el-checkbox
            v-for="item in mediaStyleArray"
            :key="item.tagId"
            :label="item.tagName"
            :value="item.tagId"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div></div>
      <el-form-item label="上映时间标签" prop="DateTagArray">
        <el-radio-group v-model="DateTagArray">
          <el-radio
            v-for="item in mediaReleaseDateArray"
            :key="item.tagId"
            :label="item.tagName"
            :value="item.tagId"
          />
        </el-radio-group>
      </el-form-item>
      <div></div>
      <el-form-item label="上映地区标签" prop="RegionTagArray">
        <el-radio-group v-model="RegionTagArray">
          <el-radio
            v-for="item in mediaRegionArray"
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
let StyleTagArray = ref([])
let DateTagArray = ref(undefined)
let RegionTagArray = ref(undefined)
let mediaStyleArray = ref([])
let mediaReleaseDateArray = ref([])
let mediaRegionArray = ref([])
function searchTag() {
  //先查询store中是否存储了媒体标签数据
  if (useMediaTagStore().isSave) {
    //store已有媒体标签数据
    mediaStyleArray.value = useMediaTagStore().mediaStyleArray
    mediaReleaseDateArray.value = useMediaTagStore().mediaReleaseDateArray
    mediaRegionArray.value = useMediaTagStore().mediaRegionArray
  } else {
    //如果store中没有保存媒体标签数据，调接口获取
    TagAPIResources.findBy().then((res) => {
      let a = []
      a = res.data
      a.forEach((obj) => {
        if (obj.tagType === 'MediaStyle') {
          mediaStyleArray.value.push(obj)
        }
        if (obj.tagType === 'MediaTime') {
          mediaReleaseDateArray.value.push(obj)
        }
        if (obj.tagType === 'MediaRegion') {
          mediaRegionArray.value.push(obj)
        }
      })
      //将媒体标签数据，存储到store中
      useMediaTagStore().mediaStyleArray = mediaStyleArray.value
      useMediaTagStore().mediaReleaseDateArray = mediaReleaseDateArray.value
      useMediaTagStore().mediaRegionArray = mediaRegionArray.value
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
        if (obj.tagType === 'MediaStyle') {
          StyleTagArray.value.push(obj.tagId)
        }
        if (obj.tagType === 'MediaTime') {
          DateTagArray.value = obj.tagId
        }
        if (obj.tagType === 'MediaRegion') {
          RegionTagArray.value = obj.tagId
        }
      })
    }
  })
}

//重置
let formRef = ref(undefined)
function reset() {
  StyleTagArray.value = []
  DateTagArray.value = undefined
  RegionTagArray.value = undefined
}

//保存
function submit() {
  //拼接tagIds
  form.value.tagIds = [...StyleTagArray.value]
  if (DateTagArray.value != undefined) {
    form.value.tagIds.push(DateTagArray.value)
  }
  if (RegionTagArray.value != undefined) {
    form.value.tagIds.push(RegionTagArray.value)
  }
  //拼接tagList
  form.value.tagList = []
  mediaRegionArray.value.forEach((i) => {
    if (i.tagId == RegionTagArray.value) {
      form.value.tagList.push(i)
    }
  })
  mediaReleaseDateArray.value.forEach((i) => {
    if (i.tagId == DateTagArray.value) {
      form.value.tagList.push(i)
    }
  })
  mediaStyleArray.value.forEach((i) => {
    StyleTagArray.value.forEach((j) => {
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
