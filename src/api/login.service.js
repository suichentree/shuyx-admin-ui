import axiosService from '@/api/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //登录
    login(queryData) {
        return axiosService.request({
            url: '/shuyx-user/auth/login',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //获取验证码
    verifyCode(queryData) {
        return axiosService.request({
            url: '/shuyx-user/auth/verifycode',
            method: 'GET',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //注销登录
    logout(queryData) {
        return axiosService.request({
            url: '/shuyx-user/auth/logout',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    }
  }
  
export default APIResources