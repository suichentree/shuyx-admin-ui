import axiosService from '@/api/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //分页查询
    pagelist(queryData,pageData) {
        return axiosService.request({
            url: '/shuyx-user/file/pagelist',
            method: 'POST',
            data: Object.assign({},queryData,pageData),
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //条件查询
    findBy(queryData) {
        return axiosService.request({
            url: '/shuyx-user/file/findBy',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //添加
    add(queryData){
        return axiosService.request({
            url: '/shuyx-user/file/add',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //更新
    update(queryData){
        return axiosService.request({
            url: '/shuyx-user/file/update',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //删除
    delete(queryData) {
        return axiosService.request({
            url: '/shuyx-user/file/delete',
            method: 'DELETE',
            data: queryData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        })
    },
    //上传文件
    uploadFile(queryData){
        return axiosService.request({
            url: '/shuyx-file/ship/upload',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }
  }
  
export default APIResources