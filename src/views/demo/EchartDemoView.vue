<template>
  <div class="echarts-box">
    <div id="myEcharts" :style="{ width: '900px', height: '250px' }"></div>
    <div id="myEcharts2" :style="{ width: '900px', height: '250px' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
/// 声明定义一下echart
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

<style></style>
