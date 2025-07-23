<template>
  <!-- 统计卡片-->
  <el-row :gutter="20" style="padding: 20px 16px;">
    <el-col :span="24" :xs="24" :sm="12" :md="6" :lg="6">
      <el-card 
        :body-style="{ padding: '16px 20px' }" 
        shadow="always" 
        class="stat-card"
      >
        <el-statistic :value="268500" :value-style="{ color: 'var(--el-color-primary)', fontWeight: '600' }">
          <template #title>
            <div class="stat-title">
              <el-icon :size="20"> <ChatLineRound /> </el-icon>
              <span>总用户数</span>
            </div>
          </template>
        </el-statistic>
      </el-card>
    </el-col>
    <el-col :span="24" :xs="24" :sm="12" :md="6" :lg="6">
      <el-card 
        :body-style="{ padding: '16px 20px' }" 
        shadow="always" 
        class="stat-card"
      >
        <el-statistic :value="120" :value-style="{ color: '#409eff', fontWeight: '600' }">
          <template #title>
            <div class="stat-title">
              <el-icon :size="20"> <DocumentCopy /> </el-icon>
              <span>总菜单数</span>
            </div>
          </template>
        </el-statistic>
      </el-card>
    </el-col>
    <el-col :span="24" :xs="24" :sm="12" :md="6" :lg="6">
      <el-card 
        :body-style="{ padding: '16px 20px' }" 
        shadow="always" 
        class="stat-card"
      >
        <el-statistic :value="50" :value-style="{ color: '#67c23a', fontWeight: '600' }">
          <template #title>
            <div class="stat-title">
              <el-icon :size="20"> <Calendar/> </el-icon>
              <span>总职位数</span>
            </div>
          </template>
        </el-statistic>
      </el-card>
    </el-col>
    <el-col :span="24" :xs="24" :sm="12" :md="6" :lg="6">
      <el-card 
        :body-style="{ padding: '16px 20px' }" 
        shadow="always" 
        class="stat-card"
      >
        <el-statistic :value="20" :value-style="{ color: '#e6a23c', fontWeight: '600' }">
          <template #title>
            <div class="stat-title">
              <el-icon :size="20"> <Grid/> </el-icon>
              <span>总机构数</span>
            </div>
          </template>
        </el-statistic>
      </el-card>
    </el-col>
  </el-row>

  <!-- 系统信息卡片 -->
  <div style="padding: 0 16px;">
    <el-card shadow="never">
      <h2 style="color: var(--el-text-color-primary); margin-bottom: 12px;">SHUYX ADMIN UI</h2>
      <p style="color: var(--el-text-color-regular); line-height: 1.8; margin-bottom: 8px;">
        这个UI框架主要是为了提高自己前端的技术能力而搭建的。以后要写个人项目的话，这个搭建好的前端工程也可以拿来复用。
      </p>
      <p style="color: var(--el-text-color-regular); line-height: 1.8;">前端技术栈：Vue3 + element-plus + javascript</p>
      <template #footer>
        <div style="color: var(--el-text-color-secondary); font-size: 14px;">当前版本: v1.0.1</div>
      </template>
    </el-card>
  </div>

  <div class="echarts-box">
    <div id="myEcharts" :style="{ width: '900px', height: '250px' }"></div>
    <div id="myEcharts2" :style="{ width: '900px', height: '250px' }"></div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 引用echart
let echart = echarts
onMounted(() => {
  initChart()
  initChart2()
})

function initChart() {
  let chart = echart.init(document.getElementById('myEcharts'))
  // 把配置和数据放这里
  chart.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    xAxis: {
      type: 'category',
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ]
    },
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 4321, 4129],
        type: 'line',
        smooth: true
      }
    ]
  })
  window.onresize = function () {
    //自适应大小
    chart.resize()
  }
}

function initChart2() {
  let chart = echart.init(document.getElementById('myEcharts2'))
  // 把配置和数据放这里
  chart.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  })
  window.onresize = function () {
    //自适应大小
    chart.resize()
  }
}

</script>

<style scoped>
/* 统计卡片样式优化 */
.stat-card {
  border-radius: 8px;
  transition: all 0.3s;
}
.stat-card:hover {
  transform: translateY(-2px); /* 悬停微浮效果 */
}
.stat-title {
  display: flex;
  align-items: center;
  gap: 8px; /* 图标与文字间距 */
}
</style>