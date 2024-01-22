
import { ref } from 'vue'
import { defineStore } from 'pinia'

//导航栏信息store
export const useHeaderStore = defineStore('headerStore', () => {
  //侧边栏是否伸展变量
  const sideIsExpand = ref(false)
  //控制侧边栏伸展变量
  function changeSideExpand(){
    sideIsExpand.value = !sideIsExpand.value
  }
  return {sideIsExpand,changeSideExpand}
})
