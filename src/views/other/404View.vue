<template>
  <el-result title="404" sub-title="抱歉，您访问的页面不存在。">
    <template #icon>
      <el-image
        :src="image"
      />
    </template>
  </el-result>
</template>
<script setup>
import image from '@/assets/404.svg'
</script>
<style>
</style>
