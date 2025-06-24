import { ref} from 'vue'
import { defineStore } from 'pinia'

//tagViewStore
export let useTagViewStore = defineStore('tagViewStore', () => {
   //tagview菜单信息,主要用于存储tagview中展示的菜单
  let tagViewMenuInfo = ref([])
  //添加tagview菜单信息
  function addTagViewMenuInfo(obj){
    let item = {
      path:obj.path,
      name:obj.name
    }
    //判断新加入tag是否已经存在tag数组中，若不存在则加入数组
    if (!tagViewMenuInfo.value.some(obj => obj.path === item.path && obj.name === item.name)) {
      tagViewMenuInfo.value.push(item)
    }
  }
  //删除tagview菜单信息
  function deleteTagViewMenuInfo(index){
    return tagViewMenuInfo.value.splice(index, 1)
  }
  return {tagViewMenuInfo,addTagViewMenuInfo,deleteTagViewMenuInfo}
},{persist: true})
