<template>
  <el-row :gutter="20">
    <el-col :span="8">
        <el-image  style="height: 400px;width: 100%;"
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" fit="fill" />
    </el-col>
    <el-col :span="16">
      <el-descriptions :title="mediaList.mediaName" :column="1" border>
        <el-descriptions-item label="导演">{{mediaList.director}}</el-descriptions-item>
        <el-descriptions-item label="主演">{{mediaList.actor}}</el-descriptions-item>
        <el-descriptions-item label="类型">
           {{mediaList.mediaTag}}
        </el-descriptions-item>
        <el-descriptions-item label="地区">{{mediaList.region}}</el-descriptions-item>
        <el-descriptions-item label="上映时间">{{mediaList.releaseDate}}</el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
  <el-row style="padding:10px 0px">
    <el-col :span="24">
      <el-descriptions title="电影简介" :column="1">
        <el-descriptions-item v-if="mediaList.description == null">
          暂无
        </el-descriptions-item>
        <el-descriptions-item v-else>
          {{mediaList.description}}
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
    <el-col :span="24">
      <h3>电影播放</h3>
      <VideoPlayer
        src="https://vjs.zencdn.net/v/oceans.mp4"
        poster="https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=600y500"
        controls
        :loop="true"
        :volume="0.6"
      />
    </el-col>
  </el-row>
</template>
<script setup>
import { ref, onMounted} from 'vue'
import MediaAPIResources from '@/api/media.service.js'
import { useRoute } from 'vue-router'
const route = useRoute()

//导入视频播放器依赖
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'


//接收router传参
let params = route.query.id
//媒体列表
let mediaList = ref([])

onMounted(() => {
  search()
})

//分页查询
function search() {
  let query = {
    mediaId: params
  }
  MediaAPIResources.findBy(query).then((res) => {
    mediaList.value = res.data[0]
    //对数据进行修饰
    mediaList.value.releaseDate = mediaList.value.releaseDate.substring(0,10)
  })
  
}

</script>
<style scoped>

</style>
