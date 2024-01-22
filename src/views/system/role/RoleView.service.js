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
    },
    //查询所有菜单和角色可使用菜单
    selectRoleMenuInfo(queryData) {
        return axiosService.request({
            url: '/shuyx-user/menu/selectRoleMenuInfo',
            method: 'GET',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //更新角色可使用菜单
    updateRoleMenuInfo(queryData) {
        return axiosService.request({
            url: '/shuyx-user/menu/updateRoleMenuInfo',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //查询角色下的用户分页信息
    selectUserListByRoleId(queryData,pageData) {
        return axiosService.request({
            url: '/shuyx-user/user/selectUserListByRoleId',
            method: 'POST',
            data: Object.assign({},queryData,pageData),
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //查询不属于该角色下的用户分页信息
    selectUserListByNoRoleId(queryData,pageData) {
        return axiosService.request({
            url: '/shuyx-user/user/selectUserListByNoRoleId',
            method: 'POST',
            data: Object.assign({},queryData,pageData),
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //将角色与用户绑定
    addUserRole(queryData) {
        return axiosService.request({
            url: '/shuyx-user/user/addUserRole',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //解除角色与用户的绑定
    deleteUserRole(queryData) {
        return axiosService.request({
            url: '/shuyx-user/user/deleteUserRole',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'application/json' }
        })
    }
  }
  
export default APIResources