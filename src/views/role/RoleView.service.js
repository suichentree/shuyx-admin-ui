import axiosService from '@/utils/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //查询全部
    rolelist(queryData) {
        return axiosService.request({
            url: '/shuyx-user/role/rolelist',
            method: 'GET',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //查询树形列表
    roleTreelist(){
        return axiosService.request({
            url: '/shuyx-user/role/roleTreelist',
            method: 'GET',
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //添加
    addRole(queryData){
        return axiosService.request({
            url: '/shuyx-user/role/addRole',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //更新
    updateRole(queryData){
        return axiosService.request({
            url: '/shuyx-user/role/updateRole',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //删除
    deleteRole(queryData) {
        return axiosService.request({
            url: '/shuyx-user/role/deleteRole',
            method: 'DELETE',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
  }
  
export default APIResources