
import { ref } from 'vue'
import { defineStore } from 'pinia'

//用户信息store
export const useUserStore = defineStore('userStore', () => {
  //用户基础信息
  const userInfo = ref({})
  //设置用户信息
  function setUserInfo(obj){
    userInfo.value = obj
  }
  //获取用户信息
  function getUserInfo(){
    return userInfo.value
  }
  return {userInfo,setUserInfo,getUserInfo}
},{persist: true})
