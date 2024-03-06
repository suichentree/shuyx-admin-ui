import axiosService from '@/api/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //分页查询
    pagelist(queryData,pageData) {
        return axiosService.request({
            url: '/shuyx-media/genre/pagelist',
            method: 'POST',
            data: Object.assign({},queryData,pageData),
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //添加
    addGenre(queryData){
        return axiosService.request({
            url: '/shuyx-media/genre/addGenre',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //更新
    updateGenre(queryData){
        return axiosService.request({
            url: '/shuyx-media/genre/updateGenre',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //删除
    deleteGenre(queryData) {
        return axiosService.request({
            url: '/shuyx-media/genre/deleteGenre',
            method: 'DELETE',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
  }
  
export default APIResources