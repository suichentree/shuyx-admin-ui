<template>
  <el-dialog
    v-model="DialogVisible"
    :title="PlayForm.episodesName"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <div>
      <video :src="'http://localhost:39000/media-episodes-bucket/'+PlayForm.episodesUrl" loop controls style="width:100%;height:100%;object-fit:cover;" >
        您的浏览器不支持 HTML5 video 标签。
      </video>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref,onMounted,inject } from 'vue'

//接收父组件传递的数据
let DialogVisible = inject('PlayerVisible')
let PlayForm = inject('PlayForm')

onMounted(()=>{
  console.log("PlayForm",PlayForm.value)
})


</script>
<style scoped></style>
