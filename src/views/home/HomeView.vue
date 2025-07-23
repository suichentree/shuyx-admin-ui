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

  <!-- 优化后的图表容器 -->
  <div class="echarts-container">
    <div class="chart-box" id="myEcharts"></div>
    <div class="chart-box" id="myEcharts2"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {
  initChart()
  initChart2()
})

// 折线图优化
function initChart() {
  const chart = echarts.init(document.getElementById('myEcharts'))
  chart.setOption({
    title: {
      text: '用户增长趋势',
      left: 'left',
      textStyle: {
        color: 'var(--el-text-color-primary)', // 与页面标题颜色一致
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(64, 158, 255, 0.9)', // Element Plus主色半透明
      textStyle: { color: '#fff' },
      axisPointer: { type: 'line' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      axisLabel: {
        color: 'var(--el-text-color-regular)', // 与页面正文颜色一致
        fontSize: 12
      },
      axisLine: { lineStyle: { color: '#e6ebf5' } }, // 浅灰色轴线
      splitLine: { show: false } // 隐藏x轴分割线
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'var(--el-text-color-regular)',
        fontSize: 12,
        formatter: '{value} 人' // 添加单位
      },
      axisLine: { lineStyle: { color: '#e6ebf5' } },
      splitLine: { // 添加y轴网格线
        lineStyle: {
          color: '#f0f2f5',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 4321, 4129],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#409eff', // Element Plus主色
          width: 2
        },
        itemStyle: { // 数据点样式
          color: '#409eff',
          borderWidth: 2
        },
        areaStyle: { // 区域填充
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64, 158, 255, 0.1)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0)' }
          ])
        }
      }
    ]
  })
  // 窗口缩放时自适应（优化防抖）
  window.addEventListener('resize', () => chart.resize())
}

// 柱状图优化
function initChart2() {
  const chart = echarts.init(document.getElementById('myEcharts2'))
  chart.setOption({
    title: {
      text: '功能模块使用统计',
      left: 'left',
      textStyle: {
        color: 'var(--el-text-color-primary)',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(103, 194, 58, 0.9)', // 绿色辅助色
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['用户管理','菜单管理','职位管理','机构管理','字典管理','标签管理'],
      axisLabel: {
        color: 'var(--el-text-color-regular)',
        fontSize: 12,
        rotate: 15 // 文字旋转避免重叠
      },
      axisLine: { lineStyle: { color: '#e6ebf5' } },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'var(--el-text-color-regular)',
        fontSize: 12,
        formatter: '{value} 次'
      },
      axisLine: { lineStyle: { color: '#e6ebf5' } },
      splitLine: {
        lineStyle: {
          color: '#f0f2f5',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '使用次数',
        type: 'bar',
        data: [35, 28, 42, 19, 30, 25],
        barWidth: '35%', // 柱子宽度
        itemStyle: {
          color: '#67c23a', // 绿色辅助色
          borderRadius: [4, 4, 0, 0] // 柱子圆角
        }
      }
    ]
  })
  window.addEventListener('resize', () => chart.resize())
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

/* 图表容器样式优化 */
.echarts-container {
  padding: 0 16px;
  margin-top: 20px;
}
.chart-box {
  width: 100%;
  height: 300px; /* 统一高度 */
  background: #fff;
  border-radius: 8px; /* 与统计卡片圆角一致 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 与卡片阴影一致 */
  padding: 16px;
  margin-bottom: 20px;
}
</style>