<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-image
        style="height: auto; width: auto"
        :src="'http://localhost:39000/media-cover-bucket/' + mediaList.mediaCover"
        fit="fill"
      />
    </el-col>
    <el-col :span="16">
      <el-descriptions :title="mediaList.mediaName" :column="1" border>
        <el-descriptions-item label="导演">{{ mediaList.director }}</el-descriptions-item>
        <el-descriptions-item label="主演">{{ mediaList.actor }}</el-descriptions-item>
        <el-descriptions-item label="类型">
          {{ mediaList.mediaTag }}
        </el-descriptions-item>
        <el-descriptions-item label="地区">{{ mediaList.region }}</el-descriptions-item>
        <el-descriptions-item label="上映时间">{{ mediaList.releaseDate }}</el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
  <el-row style="padding: 10px 0px">
    <el-col :span="24">
      <el-descriptions title="简介" :column="1">
        <el-descriptions-item v-if="mediaList.description == null"> 暂无 </el-descriptions-item>
        <el-descriptions-item v-else>
          {{ mediaList.description }}
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
    <el-col :span="24">
      <h3>剧集播放</h3>
      <el-button v-for="(item, index) in mediaList.episodesList" :key="index" @click="toPlay(item)">
      {{ item.episodesName }}
      </el-button>
    </el-col>
  </el-row>
  <!-- 视频播放子组件 -->
  <PlayVideo v-if="PlayerVisible"/>
</template>
<script setup>
import { ref, onMounted, provide } from 'vue'
import MediaAPIResources from '@/api/media.service.js'
import { useRoute } from 'vue-router'
import PlayVideo from './components/PlayVideo.vue';

//接收router传参
let mediaId = useRoute().query.id
//媒体列表
let mediaList = ref([])

onMounted(() => {
  search()
})

//查询
function search() {
  let query = {
    mediaId: mediaId
  }
  MediaAPIResources.findMediaAndEpisodes(query).then((res) => {
    mediaList.value = res.data[0]
  })
}

//视频播放子组件
let PlayerVisible = ref(false)
let PlayForm = ref({})
provide('PlayerVisible',PlayerVisible)
provide('PlayForm',PlayForm)
function toPlay(obj) {
  PlayerVisible.value = true
  PlayForm.value = obj
}
</script>
<style scoped></style>
