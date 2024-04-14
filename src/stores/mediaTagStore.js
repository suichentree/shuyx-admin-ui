
import { ref } from 'vue'
import { defineStore } from 'pinia'

//媒体标签store
export const useMediaTagStore = defineStore('mediaTagStore', () => {
    //不同类型的媒体标签数据
    let mediaStyleArray = ref([])  //媒体风格标签
    let mediaReleaseDateArray = ref([]) //媒体上映时间标签
    let mediaRegionArray = ref([])  //媒体上映地区标签
    let isSave = ref(false)
    return {mediaStyleArray,mediaReleaseDateArray,mediaRegionArray,isSave}
},{persist: true})
