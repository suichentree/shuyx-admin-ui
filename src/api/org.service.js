import axiosService from '@/api/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //查询全部
    orglist(queryData) {
        return axiosService.request({
            url: '/shuyx-user/org/orglist',
            method: 'GET',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //查询树形组织机构列表
    orgTreelist(){
        return axiosService.request({
            url: '/shuyx-user/org/orgTreelist',
            method: 'GET',
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //添加组织机构
    addOrg(queryData){
        return axiosService.request({
            url: '/shuyx-user/org/addOrg',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //添加组织机构
    updateOrg(queryData){
        return axiosService.request({
            url: '/shuyx-user/org/updateOrg',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //删除组织机构
    deleteOrg(queryData) {
        return axiosService.request({
            url: '/shuyx-user/org/deleteOrg',
            method: 'DELETE',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
  }
  
export default APIResources