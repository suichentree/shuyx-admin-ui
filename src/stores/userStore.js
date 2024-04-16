
import { ref } from 'vue'
import { defineStore } from 'pinia'

//用户信息store
export const useUserStore = defineStore('userStore', () => {
  //用户基础信息
  let userInfo = ref({
      userId: undefined,
      orgId: undefined,
      positionId: undefined,
      userName: undefined,
      gender: undefined,
      birthday: undefined,
      avatar: undefined,
      email: undefined,
      phone: undefined,
      status: undefined,
      createTime: undefined,
      updateTime: undefined
  })
  //设置用户信息
  function setUserInfo(obj){
    userInfo.value = obj
  }
  return {userInfo,setUserInfo}
},{persist: true})
