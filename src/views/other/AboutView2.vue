<template>
  <!-- 顶部卡片 -->
  <el-card shadow="always" class="about-top-card">
    <div class="about-top-info">
      <img :src="LogoImg" alt="SHUYX ADMIN UI Logo" />
      <div class="about-top-text">
        <h2>SHUYX ADMIN UI</h2>
        <p>高性能 / 精致 / 优雅 的后台管理系统</p>
      </div>
    </div>
    <div style="color: #fff;">
      <p style="color: var(--el-text-color-regular); line-height: 1.8; margin-bottom: 8px;">
        这个UI模板主要是为了提高自己前端的技术能力而搭建的。以后要写个人项目的话，这个搭建好的前端工程也可以拿来复用。
      </p>
      <p style="color: var(--el-text-color-regular); line-height: 1.8;">前端技术栈：Vue3 + element-plus + javascript</p>
      <div style="color: var(--el-text-color-secondary); font-size: 14px;">当前版本: v1.1.0</div>
    </div>
  </el-card>

  <!-- 依赖项展示（响应式优化） -->
  <div class="common-padding">
    <el-card shadow="always" header="dependencies" class="deps-card">
      <el-descriptions border :column="getColumnCount">
        <el-descriptions-item 
          v-for="(value, key) in data.dependencies" 
          :key="key" 
          :label="key"
          class="deps-item"
        >
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
          class="deps-item"
        >
          {{ value }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LogoImg from '@/assets/logo.png'
import packageJson from '../../../package.json'

const data = ref(packageJson)

// 响应式计算依赖项列数（小屏幕1列，中等屏幕2列，大屏幕3列）
const getColumnCount = computed(() => {
  const width = window.innerWidth
  if (width < 768) return 1
  if (width < 1200) return 2
  return 3
})

</script>

<style scoped>
/* 公共内边距 */
.common-padding {
  padding: 0 16px;
  margin-top: 20px;
}

/* 顶部卡片优化 */
.about-top-card {
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%); /* 与Element Plus主色一致 */

  color: #fff;
  border-radius: 8px;
  padding: 32px 24px;
  margin: 0 16px;
  transition: all 0.3s;
}
.about-top-card:hover {
  transform: translateY(-2px); /* 悬停微浮效果 */
}
.about-top-info {
  display: flex;
  align-items: center;
  gap: 24px;
}
.about-top-info img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}
.about-top-text h2 {
  font-size: 24px;
  margin-bottom: 8px;
}
.about-top-text p {
  font-size: 16px;
  opacity: 0.9;
}

/* 依赖项卡片 */
.deps-card {
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 16px 24px;
  transition: all 0.3s;
}
.deps-card:hover {
  transform: translateY(-2px);
}
.deps-item {
  font-size: 14px;
  .el-descriptions-item__label {
    font-weight: 500;
    color: var(--el-text-color-primary);
  }
  .el-descriptions-item__content {
    color: var(--el-text-color-regular);
  }
}
</style>
