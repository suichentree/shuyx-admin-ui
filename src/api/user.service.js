import axiosService from '@/api/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //根据token获取用户信息
    getUserInfoByToken(){
        return axiosService.request({
            url: '/shuyx-user/user/userInfo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //查询全部用户
    pagelist(queryData,pageData) {
        return axiosService.request({
            url: '/shuyx-user/user/pagelist',
            method: 'POST',
            data: Object.assign({},queryData,pageData), //assign方法可以把两个对象合并
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //添加用户
    addUser(queryData) {
        return axiosService.request({
            url: '/shuyx-user/user/addUser',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //查询用户
    selectById(queryData) {
        return axiosService.request({
            url: '/shuyx-user/user/selectById',
            method: 'GET',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //更新用户
    updateUser(queryData) {
        return axiosService.request({
            url: '/shuyx-user/user/updateUser',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //更新用户密码
    updateUserPassword(queryData) {
        return axiosService.request({
            url: '/shuyx-user/user/updateUserPassword',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //删除用户
    deleteUser(queryData) {
        return axiosService.request({
            url: '/shuyx-user/user/deleteUser',
            method: 'DELETE',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
  }
  
export default APIResources