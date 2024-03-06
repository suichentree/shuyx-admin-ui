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
        <el-form-item label="类型:" prop="genreName">
          <el-space wrap>
            <div v-for="i in movieTypeArray" :key="i" @click="handClick1(i)">
              <el-tag size="small" :effect="queryform.movieType === i.genreId ? 'dark' : 'plain'">{{
                i.genreName
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
                :effect="queryform.releaseDate === i.genreId ? 'dark' : 'plain'"
                >{{ i.genreName }}</el-tag
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
                :effect="queryform.region === i.genreId ? 'dark' : 'plain'"
                >{{ i.genreName }}</el-tag
              >
            </div>
          </el-space>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <!--查询结果-->
  <el-space wrap style="padding: 10px 0px">
    <el-card
      v-for="i in mediaList"
      :key="i"
      :body-style="{ padding: '0px' }"
      @click="showMovie(i)"
    >
      <el-image
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        fit="fill"
      />
      <template #footer>
        <el-row class="row-bg" justify="space-between">
          <el-col :span="20">{{i.mediaName}}</el-col>
          <el-col :span="4" style="text-align: right">3.8</el-col>
        </el-row>
        <el-row class="row-bg" justify="space-between">
          <el-col :span="4">2023</el-col>
          <el-col :span="20" style="text-align: right">黑帮/恐怖</el-col>
        </el-row>
      </template>
    </el-card>
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
import { ref, onMounted, provide } from 'vue'
import MediaAPIResources from '@/api/media.service.js'
import GenreAPIResources from '@/api/genre.service.js'
import router from '@/router'

//查询表单相关
let queryform = ref({
  movieType: 0,
  releaseDate: 0,
  region: 0
})

//媒体列表
let mediaList = ref([])

//电影类型数组
let movieTypeArray = ref([])
provide('movieTypeArray', movieTypeArray)
//上映时间数组
let releaseDateArray = ref([])
provide('releaseDateArray', releaseDateArray)
//地区数组
let regionArray = ref([])
provide('regionArray', regionArray)

//分页配置数据
const pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 100
})

//------------------
onMounted(() => {
  searchGenre()
  search()
})

//查询全部类型，并进行分组
function searchGenre(){
  GenreAPIResources.pagelist().then((res) => {
    let a = res.data
    a.forEach(obj => {
      if(obj.type === 'Movie'){
        movieTypeArray.value.push(obj)
      }
      if(obj.type === 'Time'){
        releaseDateArray.value.push(obj)
      }
      if(obj.type === 'Region'){
        regionArray.value.push(obj)
      }
    });
  })
}

//分页查询
function search() {
  MediaAPIResources.pagelist(queryform.value, pageData.value).then((res) => {
    mediaList.value = res.data.list
    pageData.value.total = res.data.total
  })
}

//点击电影类型标签
function handClick1(item) {
  queryform.value.movieType = item.id
}
//点击电影上映时间标签
function handClick2(item) {
  queryform.value.releaseDate = item.id
}
//点击电影上映地区标签
function handClick3(item) {
  queryform.value.region = item.id
}


//显示电影详细
function showMovie(item) {
  router.push({ path: '/media/movie/info' })
}
</script>
<style scoped>
.el-card {
  --el-card-padding: 5px;
}
</style>
