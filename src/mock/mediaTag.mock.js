export default [
  //批量更新或新增媒体标签
  {
    url: '/api/shuyx-media/mediaTag/saveOrUpdateBatch', 
    method: 'POST', 
    response: () => {
      return {
            "code": 200,
            "message": "请求成功"
        }
    },
  },
];

