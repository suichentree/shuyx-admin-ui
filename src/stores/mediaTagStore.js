
import { ref } from 'vue'
import { defineStore } from 'pinia'

//媒体标签store
export const useMediaTagStore = defineStore('mediaTagStore', () => {
    //不同类型的媒体标签数据
    let movieTypeArray = ref([])  //电影类型标签
    let releaseDateArray = ref([]) //时间类型标签
    let regionArray = ref([])  //地区类型标签
    let isSave = ref(false)
    return {movieTypeArray,releaseDateArray,regionArray,isSave}
},{persist: true})
