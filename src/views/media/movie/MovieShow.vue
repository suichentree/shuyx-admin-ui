<template>
  <!--查询条件-->
  <el-card shadow="never" :body-style="{ padding: '0px' }">
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
      <el-form :model="queryform">
        <el-form-item label="风格:" prop="tagName">
          <el-space wrap>
            <div v-for="i in movieTypeArray" :key="i" @click="handClick1(i)">
              <el-tag size="small" :effect="queryform.movieType === i.tagId ? 'dark' : 'plain'">{{
                i.tagName
              }}</el-tag>
            </div>
          </el-space>
        </el-form-item>
        <el-form-item label="年代:">
          <el-space wrap>
            <div v-for="i in releaseDateArray" :key="i" @click="handClick2(i)">
              <el-tag
                size="small"
                type="success"
                :effect="queryform.releaseDate === i.tagId ? 'dark' : 'plain'"
                >{{ i.tagName }}</el-tag
              >
            </div>
          </el-space>
        </el-form-item>
        <el-form-item label="地区:">
          <el-space wrap>
            <div v-for="i in regionArray" :key="i" @click="handClick3(i)">
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
  <el-space wrap>
    <div v-for="i in mediaList" :key="i" @click="showMovie(i.mediaId)">
      <div style="height: auto; width: 200px">
        <el-image
          src="https://img.zcool.cn/community/01edb95b0cd6fea8012181b049fca0.jpg@1280w_1l_2o_100sh.jpg"
          fit="fill"
        />
        <el-row justify="space-between">
          <el-col :span="20">{{ i.mediaName }}</el-col>
          <el-col :span="4" style="text-align: right">{{ i.mediaScore }}</el-col>
          <el-col :span="24" class="mediaTag">{{ i.mediaTag }}</el-col>
        </el-row>
      </div>
    </div>
  </el-space>
  <!--分页-->
  <div>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MediaAPIResources from '@/api/media.service.js'
import TagAPIResources from '@/api/tag.service.js'
import { useRouter } from 'vue-router'
let router = useRouter()

//媒体列表
let mediaList = ref([])

//电影类型数组
let movieTypeArray = ref([{ tagId: 0, tagName: '全部', tagType: 'Movie' }])
//上映时间数组
let releaseDateArray = ref([{ tagId: 0, tagName: '全部', tagType: 'Time' }])
//地区数组
let regionArray = ref([{ tagId: 0, tagName: '全部', tagType: 'Region' }])

//查询表单相关
let queryform = ref({
  movieType: 0,
  releaseDate: 0,
  region: 0
})

//分页配置数据
let pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 100
})

//------------------
onMounted(() => {
  searchTag()
  search()
})

//查询全部类型，并进行分组
function searchTag() {
  TagAPIResources.findBy().then((res) => {
    let a = res.data
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
  })
}

//分页查询
function search() {
  let tagIds = [queryform.value.movieType, queryform.value.releaseDate, queryform.value.region]
  //修饰数组
  tagIds = tagIds.filter((item) => {
    return item != 0
  })
  MediaAPIResources.pageFindMediaAndTag({ tagIds }, pageData.value).then((res) => {
    mediaList.value = res.data.list
    pageData.value.total = res.data.total
  })
}

//点击电影类型标签
function handClick1(item) {
  queryform.value.movieType = item.tagId
}
//点击电影上映时间标签
function handClick2(item) {
  queryform.value.releaseDate = item.tagId
}
//点击电影上映地区标签
function handClick3(item) {
  queryform.value.region = item.tagId
}

//显示电影详细
function showMovie(obj) {
  router.push({
    path: '/media/movie/info',
    query: {
      id: obj
    }
  })
}

function changePageData() {}
</script>

<style scoped>
.el-card {
  --el-card-padding: 1px;
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
