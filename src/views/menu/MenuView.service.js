import axiosService from '@/utils/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //查询全部
    menulist(queryData) {
        return axiosService.request({
            url: '/shuyx-user/menu/menulist',
            method: 'GET',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //查询树形列表
    menuTreelist(){
        return axiosService.request({
            url: '/shuyx-user/menu/menuTreelist',
            method: 'GET',
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //添加
    addMenu(queryData){
        return axiosService.request({
            url: '/shuyx-user/menu/addMenu',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //添加
    updateMenu(queryData){
        return axiosService.request({
            url: '/shuyx-user/menu/updateMenu',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //删除
    deleteMenu(queryData) {
        return axiosService.request({
            url: '/shuyx-user/menu/deleteMenu',
            method: 'DELETE',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
  }
  
export default APIResources