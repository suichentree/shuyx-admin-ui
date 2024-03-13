<template>
  <div style="width: auto; height: 40px">
    <el-form :inline="true">
      <el-form-item label="我的位置">
        <el-input v-model="local" placeholder="选择地点">
          <template #append>
            <el-button :icon="Search" @click="mylocal"/>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="搜索">
        <el-input v-model="queryform.query" placeholder="选择职位">
          <template #prepend>
            <el-select v-model="queryform.city" placeholder="选择城市" style="width: 100px">
              <el-option label="广州" value="101280100" />
              <el-option label="武汉" value="101200100" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" @click="joblist" />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
  <div id="container"></div>
</template>
<script type="text/javascript">
window._AMapSecurityConfig = {
  securityJsCode: '048317ed86620f203895b5ff4238b325'
}
</script>
<script setup>
import { Search } from '@element-plus/icons-vue'
//引入高德地图组件
import { ref, onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'


let local = ref(undefined)

let queryform = ref({
  city: undefined,
  query: undefined
})

let map = null

onMounted(() => {
  AMapLoader.load({
    key: '495cff9ea5a204fd8f893580f7f0ac01', //申请好的Key
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.ToolBar'] // 先导入需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '2D', //默认为2D地图模式
        zoom: 12, // 初始化地图级别
        center: [113.26,22.98] // 初始化地图中心点位置，位置广州大洲地铁站
      })

      //实例化AMap.ToolBar 伸缩插件
      AMap.plugin('AMap.ToolBar', function () {
        var toolbar = new AMap.ToolBar()
        map.addControl(toolbar)
      })

      //自定义标记点
      let marker = new AMap.Marker({
        position: new AMap.LngLat(113.26,22.98) //标记点所在的经纬度
      })
      map.add(marker) //地图添加标记点
    })
    .catch((e) => {
      console.log(e)
    })
})


onUnmounted(() => {
  map?.destroy()
})




</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: auto;
  height: 95%;
}

.custom-content-marker {
  position: relative;
  width: 25px;
  height: 34px;
}

.custom-content-marker img {
  width: 100%;
  height: 100%;
}

</style>@/views/demo/JobMap.service.js
