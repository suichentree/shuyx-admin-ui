<template>
  <!--查询条件-->
  <el-card shadow="never" :body-style="{ padding: '0px'}">
    <div style="padding: 10px">
      <el-row justify="space-between">
        <el-col :span="2">
          <el-tag>查询条件</el-tag>
        </el-col>
        <el-col :span="6" style="text-align: right">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div style="padding: 10px">
      <el-form :model="queryform" label-position="right"  class="query-form">
        <el-form-item label="媒体类型:">
          <el-space wrap>
            <div v-for="i in mediaTypeDict" :key="i" @click="handClick0(i)">
              <el-tag size="small" :effect="queryform.mediaType === i.value ? 'dark' : 'plain'">{{
                i.label
              }}</el-tag>
            </div>
          </el-space>
        </el-form-item>
        <el-form-item label="媒体风格:">
          <el-space wrap>
            <div v-for="i in StyleTagArray" :key="i" @click="handClick1(i)">
              <el-tag size="small" :effect="queryform.styleType === i.tagId ? 'dark' : 'plain'">{{
                i.tagName
              }}</el-tag>
            </div>
          </el-space>
        </el-form-item>
        <el-form-item label="媒体上映时间:">
          <el-space wrap>
            <div v-for="i in DateTagArray" :key="i" @click="handClick2(i)">
              <el-tag
                size="small"
                type="success"
                :effect="queryform.releaseDate === i.tagId ? 'dark' : 'plain'"
                >{{ i.tagName }}</el-tag
              >
            </div>
          </el-space>
        </el-form-item>
        <el-form-item label="媒体上映地区:">
          <el-space wrap>
            <div v-for="i in RegionTagArray" :key="i" @click="handClick3(i)">
              <el-tag
                size="small"
                type="warning"
                :effect="queryform.region === i.tagId ? 'dark' : 'plain'"
                >{{ i.tagName }}</el-tag
              >
            </div>
          </el-space>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <!--查询结果-->
  <!-- 查询结果 -->
  <div style="display: flex; flex-wrap: wrap; gap: 16px; padding: 10px 0;">  <!-- 替换原el-space为flex容器 -->
    <div v-for="i in mediaList" :key="i" @click="showMovie(i.mediaId)">
      <!-- 统一卡片容器（调整margin为0，使用外层gap控制间距） -->
      <div style="
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: #fff;
        width: 180px;  
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      ">
        <!-- 图片区域 -->
        <div style="padding: 4px;">
          <el-image
            :src="'http://localhost:39000/media-cover-bucket/'+i.mediaCover"
            fit="fill"
            style="height: 270px; width: 100%;"
          >
            <template #error>
              <div style="
                height: 100%; 
                width: 100%; 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center;
                background: #f9f9f9; 
                border-radius: 4px;
              ">
                <el-icon style="font-size: 20px; color: #999;">
                  <IconPicture />
                </el-icon>
                <div style="margin-top: 6px; color: #666; font-size: 12px;">暂无图片</div>
              </div>
            </template>
          </el-image>
        </div>
        <!-- 文字区域 -->
        <el-row justify="space-between" style="padding: 0 6px 8px 6px; margin-top: 4px;">
          <el-col :span="20" style="font-size: 14px;">{{ i.mediaName }}</el-col>
          <el-col :span="4" style="text-align: right; font-size: 14px;">{{ i.mediaScore }}</el-col>
          <el-col :span="24" class="mediaTag" style="font-size: 12px;">{{ i.mediaTag }}</el-col>
        </el-row>
      </div>
    </div>
  </div>
  <!--分页-->
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
        />
      </el-col>
    </el-row>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import MediaAPIResources from '@/api/media.service.js'
import TagAPIResources from '@/api/tag.service.js'
import { useRouter } from 'vue-router'
let router = useRouter()

onMounted(() => {
  searchTag()
  search()
})

//查询全部标签并进行分组
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

//媒体类型字典数组
import { useDictStore } from '@/stores/dictStore.js'
let mediaTypeDict = ref([
  {
    label:'全部',
    value:undefined
  }
])
mediaTypeDict.value.push(...useDictStore().getBykey('media_type'))

//风格标签数组
let StyleTagArray = ref([{ tagId: 0, tagName: '全部', tagType: 'MediaStyle' }])
//时间标签数组
let DateTagArray = ref([{ tagId: 0, tagName: '全部', tagType: 'MediaTime' }])
//地区标签数组
let RegionTagArray = ref([{ tagId: 0, tagName: '全部', tagType: 'MediaRegion' }])

//查询表单相关
let queryform = ref({
  mediaType:undefined,
  styleType: 0,
  releaseDate: 0,
  region: 0
})

//点击媒体类型标签
function handClick0(item) {
  queryform.value.mediaType = item.value
}
//点击媒体风格标签
function handClick1(item) {
  queryform.value.styleType = item.tagId
}
//点击媒体上映时间标签
function handClick2(item) {
  queryform.value.releaseDate = item.tagId
}
//点击媒体上映地区标签
function handClick3(item) {
  queryform.value.region = item.tagId
}


//分页配置数据
let pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 100
})

//分页查询
let mediaList = ref([])
function search() {
  let tagIds = [queryform.value.styleType, queryform.value.releaseDate, queryform.value.region]
  //修饰数组
  tagIds = tagIds.filter((item) => {
    return item != 0
  })
  let a = {
    tagIds:tagIds,
    mediaType:queryform.value.mediaType
  }
  MediaAPIResources.pageFindMediaByTag(a,pageData.value).then((res) => {
    mediaList.value = res.data.list
    pageData.value.total = res.data.total
  })
}

//显示电影详细
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
.el-card {
  --el-card-padding: 1px;
}

/* 新增查询表单行间距控制 */
.query-form .el-form-item {
  margin-bottom: 8px; /* 原默认间距约22px，调整为8px缩小间隔 */
}

/* 文字超出溢出样式 */
.mediaTag {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(121, 124, 127);
  padding: 2px;
}
</style>
