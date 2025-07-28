<template>
  <!-- 整合优化后的顶部卡片 -->
    <el-card shadow="always" class="top-card">
      <div class="card-header">
        <img :src="LogoImg" class="logo" />
        <div class="header-text">
          <h2>SHUYX ADMIN UI</h2>
          <p>高性能 / 精致 / 优雅 </p>
          <p>基于 Vue3 + Element-Plus + JS 的个人网站管理模板</p>
          <div>当前版本: v1.1.0</div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="card-divider"></div>

      <!--描述-->
      <div class="card-content">
        <p class="desc">
          这个前端工程主要为提升个人前端技术能力而搭建的。未来开发项目时,这套已搭建完成的前端工程可直接复用。
        </p>
        <div class="tech-stack">
          <el-tag type="info" effect="light" v-for="tech in techList" :key="tech">
            {{ tech }}
          </el-tag>
        </div>
      </div>
    </el-card>

  <!-- 依赖项展示 -->
    <el-card shadow="always" header="dependencies" class="deps-card">
      <el-descriptions border :column="getColumnCount">
        <el-descriptions-item 
          v-for="(value, key) in data.dependencies" 
          :key="key" 
          :label="key"
        >
          <!-- 移除a标签，直接显示版本号 -->
          {{ value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="always" header="devDependencies" class="deps-card">
      <el-descriptions border :column="getColumnCount">
        <el-descriptions-item 
          v-for="(value, key) in data.devDependencies" 
          :key="key" 
          :label="key"
        >
          <!-- 移除a标签，直接显示版本号 -->
          {{ value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import LogoImg from '@/assets/logo.png'
import packageJson from '../../../package.json'

const data = ref(packageJson)

// 技术栈列表（可以从package.json提取或手动维护）
const techList = ref([
  'Vue3', 'Element Plus', 'Vite', 'Pinia', 'ECharts', 'Axios'
])

// 响应式计算依赖项列数（小屏幕1列，中等屏幕2列，大屏幕3列）
const getColumnCount = computed(() => {
  const width = window.innerWidth
  if (width < 768) return 1
  if (width < 1200) return 2
  return 3
})
</script>

<style scoped>
/* 顶部卡片优化 */
.top-card {
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  color: #fff;
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 24px;
  transition: all 0.3s ease;
}
.top-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.2);
}
.card-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}
.logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.card-divider {
  height: 1px;
  background: rgba(253, 245, 245, 0.2);
  margin: 24px 0;
}
.card-content .desc {
  line-height: 1.8;
  margin-bottom: 16px;
  opacity: 0.9;
}
.tech-stack {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* 卡片优化 */
.deps-card {
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 24px 24px;
  transition: all 0.3s;
}
.deps-card:hover {
  transform: translateY(-2px);
}


/* 小屏幕适配 */
@media (max-width: 768px) {
  .top-card {
    padding: 24px;
  }
  .card-header {
    flex-direction: column;
    text-align: center;
  }
  .deps-card {
    overflow-x: auto; /* 小屏横向滚动 */
  }
  .el-descriptions {
    min-width: 500px; /* 避免内容挤压 */
  }
}
</style>