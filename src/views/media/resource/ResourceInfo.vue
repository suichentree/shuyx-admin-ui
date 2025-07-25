<template>
  <div class="movie-detail-container">
    <!-- 电影封面与基本信息 -->
    <el-row :gutter="30" class="movie-header-row">
      <el-col :span="8" class="movie-cover-col">
        <el-image
          class="movie-cover"
          :src="'http://localhost:39000/media-cover-bucket/' + mediaList.mediaCover"
          fit="cover"
          :preview-src-list="[mediaList.mediaCover]"
          style="box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); border-radius: 12px;"
        >
          <template #error>
            <div class="error-cover">
              <el-icon size="48" color="#666"><Picture /></el-icon>
              <div class="error-text">暂无图片</div>
            </div>
          </template>
        </el-image>
      </el-col>
      <el-col :span="16" class="movie-info-col">
        <div class="movie-title-section">
          <h1 class="movie-title">{{ mediaList.mediaName }}</h1>
          <el-rate v-model="mediaList.mediaScore" disabled show-score text-color="#ffb400" class="movie-score" />
        </div>
        <el-descriptions :column="2" border class="movie-basic-info">
          <el-descriptions-item label="导演" class="info-item">{{ mediaList.director }}</el-descriptions-item>
          <el-descriptions-item label="主演" class="info-item">{{ mediaList.actor }}</el-descriptions-item>
          <el-descriptions-item label="类型" class="info-item">{{ mediaList.mediaTag }}</el-descriptions-item>
          <el-descriptions-item label="地区" class="info-item">{{ mediaList.region }}</el-descriptions-item>
          <el-descriptions-item label="上映时间" class="info-item">{{ mediaList.releaseDate }}</el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>

    <!-- 电影简介 -->
    <el-row class="movie-intro-row">
      <el-col :span="24">
        <el-card class="movie-intro-card" shadow="hover">
          <h2 class="section-title">简介</h2>
          <div class="movie-intro-content">
            {{ mediaList.description || '暂无简介' }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 剧集播放 -->
    <el-row class="movie-episodes-row">
      <el-col :span="24">
        <el-card class="movie-episodes-card" shadow="hover">
          <h2 class="section-title">剧集播放</h2>
          <el-space wrap class="episode-buttons">
            <el-button
              v-for="(item, index) in mediaList.episodesList"
              :key="index"
              @click="toPlay(item)"
              type="primary"
              size="small"
              class="episode-button"
            >
              <el-icon><Picture /></el-icon>
              {{ item.episodesName }}
            </el-button>
          </el-space>
        </el-card>
      </el-col>
    </el-row>

    <!-- 视频播放子组件 -->
    <PlayVideo v-if="PlayerVisible" />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import MediaAPIResources from '@/api/media.service.js'
import { useRoute } from 'vue-router'
import PlayVideo from './components/PlayVideo.vue'
import { Picture } from '@element-plus/icons-vue'

// 接收 router 传参
let mediaId = useRoute().query.id
// 媒体列表
let mediaList = ref([])

onMounted(() => {
  search()
})

// 查询
function search() {
  let query = {
    mediaId: mediaId
  }
  MediaAPIResources.findMediaAndEpisodes(query).then((res) => {
    mediaList.value = res.data[0]
  })
}

// 视频播放子组件
let PlayerVisible = ref(false)
let PlayForm = ref({})
provide('PlayerVisible', PlayerVisible)
provide('PlayForm', PlayForm)
function toPlay(obj) {
  PlayerVisible.value = true
  PlayForm.value = obj
}
</script>

<style scoped>
.movie-detail-container {
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.movie-header-row {
  margin-bottom: 40px;
}

.movie-cover-col {
  display: flex;
  justify-content: center;
}

.movie-cover {
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.movie-cover:hover {
  transform: scale(1.03);
}

.error-cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #e9ecef;
  border-radius: 12px;
}

.error-text {
  margin-top: 12px;
  font-size: 16px;
  color: #666;
}

.movie-title-section {
  margin-bottom: 24px;
}

.movie-title {
  font-size: 36px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 12px;
}

.movie-score {
  font-size: 18px;
}

.movie-basic-info {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.info-item {
  font-size: 16px;
  color: #495057;
}

.movie-intro-row {
  margin-bottom: 40px;
}

.movie-intro-card {
  padding: 24px;
  border-radius: 8px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #212529;
  margin-bottom: 16px;
}

.movie-intro-content {
  font-size: 16px;
  line-height: 1.8;
  color: #495057;
}

.movie-episodes-row {
  margin-bottom: 40px;
}

.movie-episodes-card {
  padding: 24px;
  border-radius: 8px;
}

.episode-buttons {
  gap: 12px;
}

.episode-button {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.episode-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.2);
}
</style>