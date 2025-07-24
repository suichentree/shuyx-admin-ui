<template>
  <!-- 查询条件 -->
  <el-card shadow="hover" :body-style="{ padding: '0px' }" class="search-card">
    <div class="card-header">
      <el-row justify="space-between">
        <el-col :span="2">
          <el-tag type="info">查询条件</el-tag>
        </el-col>
        <el-col :span="6" style="text-align: right">
          <el-button type="primary" @click="search" class="search-button">
            <el-icon><Search /></el-icon> 搜索
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="card-content">
      <el-form :model="queryform" label-position="right" class="search-form">
        <el-form-item label="媒体类型:" class="form-item">
          <el-space wrap class="tag-space">
            <div v-for="i in mediaTypeDict" :key="i" @click="handClick0(i)" class="tag-item">
              <el-tag size="small" :effect="queryform.mediaType === i.value ? 'dark' : 'plain'" class="tag">
                {{ i.label }}
              </el-tag>
            </div>
          </el-space>
        </el-form-item>
        <el-form-item label="媒体风格:" class="form-item">
          <el-space wrap class="tag-space">
            <div v-for="i in StyleTagArray" :key="i" @click="handClick1(i)" class="tag-item">
              <el-tag size="small" :effect="queryform.styleType === i.tagId ? 'dark' : 'plain'" class="tag">
                {{ i.tagName }}
              </el-tag>
            </div>
          </el-space>
        </el-form-item>
        <el-form-item label="媒体上映时间:" class="form-item">
          <el-space wrap class="tag-space">
            <div v-for="i in DateTagArray" :key="i" @click="handClick2(i)" class="tag-item">
              <el-tag size="small" type="success" :effect="queryform.releaseDate === i.tagId ? 'dark' : 'plain'" class="tag">
                {{ i.tagName }}
              </el-tag>
            </div>
          </el-space>
        </el-form-item>
        <el-form-item label="媒体上映地区:" class="form-item">
          <el-space wrap class="tag-space">
            <div v-for="i in RegionTagArray" :key="i" @click="handClick3(i)" class="tag-item">
              <el-tag size="small" type="warning" :effect="queryform.region === i.tagId ? 'dark' : 'plain'" class="tag">
                {{ i.tagName }}
              </el-tag>
            </div>
          </el-space>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <!-- 查询结果 -->
  <el-space wrap style="padding: 20px 0px;" class="movie-list">
    <div v-for="i in mediaList" :key="i.mediaId" @click="showMovie(i.mediaId)" class="movie-item">
      <div class="movie-card">
        <el-image
          :src="'http://localhost:39000/media-cover-bucket/' + i.mediaCover"
          fit="cover"
          style="height: 300px; width: 200px; border-radius: 8px;"
          class="movie-cover"
        >
          <template #error>
            <div class="error-cover">
              <!-- 修正图标引用 -->
              <el-icon><IconPicture /></el-icon>
              暂无图片
            </div>
          </template>
        </el-image>
        <!-- 添加间隔线 -->
        <div class="separator"></div>
        <div class="movie-info">
          <el-row justify="space-between" class="movie-title-row">
            <el-col :span="20" class="movie-title">{{ i.mediaName }}</el-col>
            <el-col :span="4" style="text-align: right" class="movie-score">
              <el-rate v-model="i.mediaScore" disabled show-score text-color="#ff9900" />
            </el-col>
          </el-row>
          <el-col :span="24" class="movie-tags">{{ i.mediaTag }}</el-col>
        </div>
      </div>
    </div>
  </el-space>
  <!-- 分页 -->
  <el-row class="row-bg" justify="center">
    <el-col :span="12">
      <el-pagination
        @change="changePageData"
        v-model:current-page="pageData.pageNum"
        v-model:page-size="pageData.pageSize"
        :page-sizes="pageData.pageSizes"
        background
        layout="total, prev, pager, next, jumper"
        :total="pageData.total"
        class="pagination"
      />
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Picture as IconPicture, Search } from '@element-plus/icons-vue'
import MediaAPIResources from '@/api/media.service.js'
import TagAPIResources from '@/api/tag.service.js'
import { useRouter } from 'vue-router'
import { useDictStore } from '@/stores/dictStore.js'

let router = useRouter()

onMounted(() => {
  searchTag()
  search()
})

// 查询全部标签并进行分组
function searchTag() {
  TagAPIResources.findBy().then((res) => {
    let a = res.data
    a.forEach((obj) => {
      if (obj.tagType === 'MediaStyle') {
        StyleTagArray.value.push(obj)
      }
      if (obj.tagType === 'MediaTime') {
        DateTagArray.value.push(obj)
      }
      if (obj.tagType === 'MediaRegion') {
        RegionTagArray.value.push(obj)
      }
    })
  })
}

// 媒体类型字典数组
let mediaTypeDict = ref([
  {
    label: '全部',
    value: undefined
  }
])
mediaTypeDict.value.push(...useDictStore().getBykey('media_type'))

// 风格标签数组
let StyleTagArray = ref([{ tagId: 0, tagName: '全部', tagType: 'MediaStyle' }])
// 时间标签数组
let DateTagArray = ref([{ tagId: 0, tagName: '全部', tagType: 'MediaTime' }])
// 地区标签数组
let RegionTagArray = ref([{ tagId: 0, tagName: '全部', tagType: 'MediaRegion' }])

// 查询表单相关
let queryform = ref({
  mediaType: undefined,
  styleType: 0,
  releaseDate: 0,
  region: 0
})

// 点击媒体类型标签
function handClick0(item) {
  queryform.value.mediaType = item.value
}
// 点击媒体风格标签
function handClick1(item) {
  queryform.value.styleType = item.tagId
}
// 点击媒体上映时间标签
function handClick2(item) {
  queryform.value.releaseDate = item.tagId
}
// 点击媒体上映地区标签
function handClick3(item) {
  queryform.value.region = item.tagId
}

// 分页配置数据
let pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 100
})

// 分页查询
let mediaList = ref([])
function search() {
  let tagIds = [queryform.value.styleType, queryform.value.releaseDate, queryform.value.region]
  // 修饰数组
  tagIds = tagIds.filter((item) => {
    return item != 0
  })
  let a = {
    tagIds: tagIds,
    mediaType: queryform.value.mediaType
  }
  MediaAPIResources.pageFindMediaByTag(a, pageData.value).then((res) => {
    mediaList.value = res.data.list
    pageData.value.total = res.data.total
  })
}

// 显示电影详细
function showMovie(obj) {
  router.push({
    path: '/media/resource/info',
    query: {
      id: obj
    }
  })
}

function changePageData() {
  search()
}
</script>

<style scoped>
.search-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.card-header {
  padding: 10px;
  background-color: #f9fafc;
  border-bottom: 1px solid #ebeef5;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-content {
  padding: 10px;
}

.search-form {
  display: flex;
  flex-direction: column; /* 让表单元素垂直排列 */
  flex-wrap: wrap;
  gap: 10px;
}

.form-item {
  margin-bottom: 10px;
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
}

.form-item label {
  width: 120px; /* 设置标签宽度 */
  text-align: right;
  margin-right: 10px;
}

.tag-space {
  gap: 8px;
  flex-wrap: wrap; /* 标签容器换行 */
}

.tag-item {
  cursor: pointer;
}

.tag {
  border-radius: 4px;
  transition: all 0.3s;
}

.tag:hover {
  transform: translateY(-2px);
}

.search-button {
  border-radius: 4px;
}

.movie-list {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
}

.movie-item {
  cursor: pointer;
  transition: all 0.3s;
}

.movie-item:hover {
  transform: translateY(-5px);
}

.movie-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.movie-cover {
  display: block;
  margin-bottom: 0;
}

.separator {
  height: 1px;
  background-color: #ebeef5; /* 间隔线颜色 */
  margin: 10px 0;
}

.movie-info {
  padding: 10px;
}

.movie-title-row {
  margin-bottom: 5px;
}

.movie-title {
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.movie-score {
  font-size: 14px;
  color: #ff9900;
}

.movie-tags {
  font-size: 14px;
  color: #909399;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pagination {
  margin-top: 20px;
}
</style>
