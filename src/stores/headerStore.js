
import { ref } from 'vue'
import { defineStore } from 'pinia'

//导航栏信息store
export const useHeaderStore = defineStore('headerStore', () => {
  //侧边栏是否伸展
  const sideIsExpand = ref(false)
  //改变侧边栏伸展方法
  function changeSideExpand(){
    sideIsExpand.value = !sideIsExpand.value
  }
  return {sideIsExpand,changeSideExpand}
})
