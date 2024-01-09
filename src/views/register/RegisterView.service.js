import axiosService from '@/utils/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //注册
    register(queryData){
        return axiosService.request({
            url: '/shuyx-user/user/register',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        }) 
    }
  }
  
export default APIResources