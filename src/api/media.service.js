import axiosService from '@/api/request' //引入 request.js 中的axiosService
const APIResources = {
  //分页查询
  pagelist(queryData, pageData) {
    return axiosService.request({
      url: '/shuyx-media/media/pagelist',
      method: 'POST',
      data: Object.assign({}, queryData, pageData),
      headers: { 'Content-Type': 'application/json' }
    })
  },
  //分页查询
  pageFindMediaAndGenre(queryData, pageData) {
    return axiosService.request({
      url: '/shuyx-media/media/pageFindMediaAndGenre',
      method: 'POST',
      data: Object.assign({}, queryData, pageData),
      headers: { 'Content-Type': 'application/json' }
    })
  },
  //条件查询
  findBy(queryData, pageData) {
    return axiosService.request({
      url: '/shuyx-media/media/findBy',
      method: 'POST',
      data: Object.assign({}, queryData, pageData),
      headers: { 'Content-Type': 'application/json' }
    })
  },
  //添加
  addMedia(queryData) {
    return axiosService.request({
      url: '/shuyx-media/media/addMedia',
      method: 'POST',
      data: queryData,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  //更新
  updateMedia(queryData) {
    return axiosService.request({
      url: '/shuyx-media/media/updateMedia',
      method: 'POST',
      data: queryData,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  //删除
  deleteMedia(queryData) {
    return axiosService.request({
      url: '/shuyx-media/media/deleteMedia',
      method: 'DELETE',
      params: queryData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export default APIResources
