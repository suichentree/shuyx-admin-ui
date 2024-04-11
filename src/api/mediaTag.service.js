import axiosService from '@/api/request';		//引入 request.js 中的axiosService

// 针对特定资源，创建资源访问对象
const APIResources = {
    //批量更新或新增媒体标签
    saveOrUpdateBatch(queryData) {
        return axiosService.request({
            url: '/shuyx-media/mediaTag/saveOrUpdateBatch',
            method: 'POST',
            data: Object.assign({},queryData),
            headers: { 'Content-Type': 'application/json' }
        })
    },
    //条件查询
    findBy(queryData) {
        return axiosService.request({
            url: '/shuyx-media/mediaTag/findBy',
            method: 'POST',
            data: Object.assign({},queryData),
            headers: { 'Content-Type': 'application/json' }
        })
    }
  }
  
export default APIResources