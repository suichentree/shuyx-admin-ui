
import { ref } from 'vue'
import { defineStore } from 'pinia'

//移动端信息store
export const useMobileStore = defineStore('mobileStore', () => {
  // 全局状态：是否为移动端（窗口宽度<768px是移动端）
  const isMobile = ref(window.innerWidth < 768)
   // 窗口变化监听函数
  const handleResize = () => {
    isMobile.value = window.innerWidth < 768
  }
  return {isMobile, handleResize}
})
