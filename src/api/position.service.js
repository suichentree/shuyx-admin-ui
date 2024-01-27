import axiosService from '@/api/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //分页查询
    pagelist(queryData,pageData) {
        return axiosService.request({
            url: '/shuyx-user/position/pagelist',
            method: 'POST',
            data: Object.assign({},queryData,pageData),
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //添加
    addPosition(queryData){
        return axiosService.request({
            url: '/shuyx-user/position/addPosition',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //更新
    updatePosition(queryData){
        return axiosService.request({
            url: '/shuyx-user/position/updatePosition',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //删除
    deletePosition(queryData) {
        return axiosService.request({
            url: '/shuyx-user/position/deletePosition',
            method: 'DELETE',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //根据id查询
    selectById(queryData) {
        return axiosService.request({
            url: '/shuyx-user/position/selectById',
            method: 'GET',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
  }
  
export default APIResources