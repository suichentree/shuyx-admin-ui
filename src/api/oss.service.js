import axiosService from '@/api/request';		//引入 request.js 中的axiosService

// 文件相关请求
const APIResources = {
    //删除文件
    delete(queryData){
        return axiosService.request({
            url: '/shuyx-minio/oss/delete',
            method: 'DELETE',
            params: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //上传文件
    uploadFile(queryData,onUploadProgress){
        return axiosService.request({
            url: '/shuyx-minio/oss/upload',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress:onUploadProgress
        })
    },
    //更新文件
    updateFile(queryData,onUploadProgress){
        return axiosService.request({
            url: '/shuyx-minio/oss/updateFile',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress:onUploadProgress
        })
    },
    //获取分片文件的预签名链接
    createMultipartUpload(queryData){
        return axiosService.request({
            url: '/shuyx-minio/oss/createMultipartUpload',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //合并分片文件
    mergePartFile(queryData){
        return axiosService.request({
            url: '/shuyx-minio/oss/mergePartFile',
            method: 'POST',
            data: queryData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    //下载文件
    download(queryData){
        return axiosService.request({
            url: '/shuyx-minio/oss/download',
            method: 'GET',
            params: queryData,
            responseType: 'blob',
            headers:{ 'Content-Type': 'application/json; application/octet-stream'}
        })
    }
  }
  
export default APIResources