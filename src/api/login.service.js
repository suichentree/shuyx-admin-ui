import axiosService from '@/api/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //登录
    login(queryData) {
        return axiosService.request({
            url: '/shuyx-user/user/login',
            method: 'POST',
            params: Object.assign({}, queryData),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
    }
  }
  
export default APIResources