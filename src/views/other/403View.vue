<template>
  <el-result title="403" sub-title="抱歉，您无权访问此页面。">
    <template #icon>
      <el-image
        :src="image"
      />
    </template>
  </el-result>
</template>
<script setup>
import image from '@/assets/403.svg'
</script>
<style>
</style>
