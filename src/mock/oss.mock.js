export default [
  //获取分片文件的预签名链接
  {
    url: '/api/shuyx-file/oss/createMultipartUpload', // 接口路径
    method: 'POST', // 请求方法
    response: () => {
      return{
        "code": 200,
        "data": {
            "uploadId": "YTYzZjJkNjAtOGNhNy00MTFlLTk3ZTEtMDhjNzM4YTFlZTcwLjNkZDY4ODI1LWE2ZmMtNDFiMC04Yjg1LWM2Zjk3MGI4NDkxNQ",
            "uploadUrlList": [
                "http://127.0.0.1:39000/media-episodes-bucket/1753285524420.supercell%20-%20My%20Dearest%20TV%E5%8A%A8%E7%94%BB%E7%BD%AA%E6%81%B6%E7%8E%8B%E5%86%A0%E7%89%87%E5%A4%B4%E6%9B%B2.mp4?uploadId=YTYzZjJkNjAtOGNhNy00MTFlLTk3ZTEtMDhjNzM4YTFlZTcwLjNkZDY4ODI1LWE2ZmMtNDFiMC04Yjg1LWM2Zjk3MGI4NDkxNQ&partNumber=1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ymhTRVurqX2yqjJk8htn%2F20250723%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250723T154526Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=7f5ba96d4f6b8609eea9855420f82005817e400634bc215a217c7dcabb81fccf"
            ]
        },
        "message": "请求成功"
      }
    },
  },
  // 合并分片文件
  {
    url: '/api/shuyx-file/oss/mergePartFile',
    method: 'POST', 
    response: () => {
      return {
          "code": 200,
          "data": {
              "fileUrl": "1753285524420.supercell - My Dearest TV动画罪恶王冠片头曲.mp4"
          },
          "message": "请求成功"
      }
    },
  },
  //更新文件
  {
    url: '/api/shuyx-file/oss/updateFile',
    method: 'POST',
    response: () => {
      return {
          "code": 200,
          "data": {
              "fileUrl": "1753285858872.A.I.N.Y. - G.E.M. 邓紫棋.mp3"
          },
          "message": "请求成功"
      }
    },
  },
];

