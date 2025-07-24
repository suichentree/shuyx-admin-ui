<template>
  <el-result title="500" sub-title="抱歉，服务器报告错误。">
    <template #icon>
      <el-image
        :src="image"
      />
    </template>
  </el-result>
</template>
<script setup>
import image from '@/assets/500.svg'
</script>
<style>
</style>
