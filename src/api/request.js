/**
 * request.js 是对 axios 进行封装。
 * */
import axios from 'axios' //引入axios
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus' //引入element-plus的消息通知
import router from '@/router' //引入vue-router

//接口根路径
let baseurl = import.meta.env.VITE_APP_API_BASEURL

// 创建axios实例
const axiosService = axios.create({
  baseURL: baseurl
})

// axios request 拦截器
axiosService.interceptors.request.use(
  //请求成功的时候
  (config) => {
    //将本地存储中的token加入到请求头Authorization中
    let token = window.localStorage.getItem('shuyxWebsiteToken')
    if (token) {
      config.headers['Authorization'] = token
    }
    Object.assign(config.headers)
    return config
  },
  //请求失败的时候
  (error) => {
    return Promise.reject(error)
  }
)

// axios response 拦截器
axiosService.interceptors.response.use(
  //当响应成功的时候。返回响应内容中的data数据
  (response) => {
    //如果响应成功，但是业务办理失败
    if(response.data.code != undefined && response.data.code != 200){
      ElMessage.error('ERROR_Code: ' + response.data.code + ',ERROR_Message: ' + response.data.message)
    }
    //响应成功且业务办理成功。
    return response.data
  },
  //当响应失败的时候，根据不同的失败状态，进行不同的动作
  (error) => {
    if (error.response) {
      if (error.response.status == 404) {
        ElNotification.error({
          title: '请求错误',
          message: 'Status:404，正在请求不存在的服务器记录！'
        })
      } else if (error.response.status == 500) {
        ElNotification.error({
          title: '请求错误',
          message: error.response.data.message || 'Status:500，服务器发生错误！'
        })
      } else if (error.response.status == 401) {
        ElMessageBox.confirm(
          '当前用户已被登出或无权限访问当前资源，请尝试重新登录后再操作。',
          '无权限访问',
          {
            type: 'error',
            closeOnClickModal: false,
            center: true,
            confirmButtonText: '重新登录'
          }
        ).then(() => {
          router.push({ path: '/login' })
        })
      } else if (error.response.status == 503) {
        ElNotification.error({
          title: '服务不可用。',
          message: error.response.data.message || 'Status:503，服务不可用。！'
        })
      } else {
        ElNotification.error({
          title: '请求错误',
          message: error.message || `Response Status:${error.response.status}，未知错误！`
        })
      }
    } else {
      ElNotification.error({
        title: '请求错误',
        message: '请求服务器无响应！'
      })
    }
    return Promise.reject(error.response)
  }
)

export default axiosService
