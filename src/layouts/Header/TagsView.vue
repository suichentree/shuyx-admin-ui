<template>
  <el-scrollbar style="height: auto;padding:2px;border: 0.2px solid rgb(241, 242, 243);">
    <div class="scrollbar-flex-content">
      <el-tag
        v-for="(item,index) in tagViewList"
        :key="item.path"
        style="margin: 2px"
        @close="handleClose(index,item)"
        @click="handClick(item)"
        :effect="currentPath === item.path ? 'dark': 'plain'"
        closable
      >
        {{ item.name }}
      </el-tag>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { computed,ref,watch } from 'vue'
import { useRouter } from "vue-router"
let router = useRouter()

//获取tagView列表数据
import { useTagViewStore } from '@/stores/tagViewStore'
let tagViewList = computed(() => {
  return useTagViewStore().tagViewMenuInfo
})

//监控当前路由path,获取currentPath
let currentPath = ref(null)
watch(() => router.currentRoute.value.fullPath, (to) => {
  currentPath.value = to
},{immediate:true,deep:true})

//关闭tag
function handleClose(index,item) {
  //判断删除的tag是不是当前path的tag
  if(item.path == currentPath.value){
    //如果是，则跳转到最后一个tag路由上
    let length = tagViewList.value.length
    router.push(tagViewList.value[length-1].path)
  }
  //删除tag
  useTagViewStore().deleteTagViewMenuInfo(index)
}

//点击tag，跳转到这个tag路由上
function handClick(item){
  router.push(item.path)
}

</script>

<style scoped>
.scrollbar-flex-content {
  display: flex;
}

/* 标签悬停效果 */
.el-tag:hover {
  transform: translateY(-1px);  /* 微上移动画 */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);  /* 添加阴影 */
}
</style>
