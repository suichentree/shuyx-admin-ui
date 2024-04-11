import axiosService from '@/api/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //分页查询
    pagelist(queryData,pageData) {
        return axiosService.request({
            url: '/shuyx-media/tag/pagelist',
            method: 'POST',
            data: Object.assign({},queryData,pageData),
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //条件查询
    findBy(queryData) {
        return axiosService.request({
            url: '/shuyx-media/tag/findBy',
            method: 'POST',
            data: Object.assign({},queryData),
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //根据mediaId查询媒体所属的标签
    findByMediaId(queryData) {
        return axiosService.request({
            url: '/shuyx-media/tag/findByMediaId',
            method: 'GET',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //添加
    add(queryData){
        return axiosService.request({
            url: '/shuyx-media/tag/add',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //更新
    update(queryData){
        return axiosService.request({
            url: '/shuyx-media/tag/update',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //删除
    delete(queryData) {
        return axiosService.request({
            url: '/shuyx-media/tag/delete',
            method: 'DELETE',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
  }
  
export default APIResources