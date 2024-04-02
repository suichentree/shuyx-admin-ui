
import { ref } from 'vue'
import { defineStore } from 'pinia'

//字典数据store
export const useDictStore = defineStore('dictStore', () => {
  //字典数据
  let dictData = ref({})
  //添加字典数据
  function add(obj){
    dictData.value = obj
  }
  //根据key获取字典数据中的某个类型的数组对象
  function getBykey(key){
    return dictData.value[key]
  }
  return {dictData,getBykey,add}
},{persist: true})
