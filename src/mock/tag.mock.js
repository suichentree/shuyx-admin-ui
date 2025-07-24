export default [
  //分页查询
  {
    url: '/api/shuyx-media/tag/pagelist', // 接口路径
    method: 'POST', // 请求方法
    response: () => {
      // 模拟响应数据
      return {
          "code": 200,
          "data": {
            "total": 14,
            "list": [
              {
                "tagId": 2,
                "tagName": "剧情",
                "tagType": "MediaStyle"
              },
              {
                "tagId": 3,
                "tagName": "恐怖",
                "tagType": "MediaStyle"
              },
              {
                "tagId": 4,
                "tagName": "悬疑",
                "tagType": "MediaStyle"
              },
              {
                "tagId": 5,
                "tagName": "犯罪",
                "tagType": "MediaStyle"
              },
              {
                "tagId": 6,
                "tagName": "2024",
                "tagType": "MediaTime"
              },
              {
                "tagId": 7,
                "tagName": "2023",
                "tagType": "MediaTime"
              },
              {
                "tagId": 8,
                "tagName": "2022",
                "tagType": "MediaTime"
              },
              {
                "tagId": 9,
                "tagName": "大陆",
                "tagType": "MediaRegion"
              },
              {
                "tagId": 10,
                "tagName": "香港",
                "tagType": "MediaRegion"
              },
              {
                "tagId": 11,
                "tagName": "美国",
                "tagType": "MediaRegion"
              }
            ],
            "pageNum": 1,
            "pageSize": 10,
            "size": 10,
            "startRow": 1,
            "endRow": 10,
            "pages": 2,
            "prePage": 0,
            "nextPage": 2,
            "isFirstPage": true,
            "isLastPage": false,
            "hasPreviousPage": false,
            "hasNextPage": true,
            "navigatePages": 8,
            "navigatepageNums": [
              1,
              2
            ],
            "navigateFirstPage": 1,
            "navigateLastPage": 2
          },
          "message": "请求成功"
        }
    },
  },
  // 新增
  {
    url: '/api/shuyx-media/tag/add',
    method: 'POST', 
    response: () => {
      return {
          "code": 200,
          "message": "请求成功"
      }
    },
  },
  // 更新
  {
    url: '/api/shuyx-media/tag/update',
    method: 'POST',
    response: () => {
      return {
          "code": 200,
          "message": "请求成功"
      }
    },
  },
  // 删除
  {
    url: '/api/shuyx-media/tag/delete',
    method: 'DELETE',
    response: () => {
      return {
          "code": 200,
          "message": "请求成功"
      }
    },
  },
  // 条件查询
  {
    url: '/api/shuyx-media/tag/findBy',
    method: 'POST',
    response: () => {
      return{
                "code": 200,
                "data": [
                    {
                        "tagId": 2,
                        "tagName": "剧情",
                        "tagType": "MediaStyle"
                    },
                    {
                        "tagId": 3,
                        "tagName": "恐怖",
                        "tagType": "MediaStyle"
                    },
                    {
                        "tagId": 4,
                        "tagName": "悬疑",
                        "tagType": "MediaStyle"
                    },
                    {
                        "tagId": 5,
                        "tagName": "犯罪",
                        "tagType": "MediaStyle"
                    },
                    {
                        "tagId": 6,
                        "tagName": "2024",
                        "tagType": "MediaTime"
                    },
                    {
                        "tagId": 7,
                        "tagName": "2023",
                        "tagType": "MediaTime"
                    },
                    {
                        "tagId": 8,
                        "tagName": "2022",
                        "tagType": "MediaTime"
                    },
                    {
                        "tagId": 9,
                        "tagName": "大陆",
                        "tagType": "MediaRegion"
                    },
                    {
                        "tagId": 10,
                        "tagName": "香港",
                        "tagType": "MediaRegion"
                    },
                    {
                        "tagId": 11,
                        "tagName": "美国",
                        "tagType": "MediaRegion"
                    },
                    {
                        "tagId": 12,
                        "tagName": "2021",
                        "tagType": "MediaTime"
                    },
                    {
                        "tagId": 13,
                        "tagName": "日本",
                        "tagType": "MediaRegion"
                    },
                    {
                        "tagId": 14,
                        "tagName": "喜剧",
                        "tagType": "MediaStyle"
                    },
                    {
                        "tagId": 15,
                        "tagName": "科幻",
                        "tagType": "MediaStyle"
                    },
                    {
                        "tagId": 16,
                        "tagName": "111",
                        "tagType": "MediaRegion"
                    }
                ],
                "message": "请求成功"
            }
    },
  },
  //根据mediaId查询媒体所属的标签
  {
    url: '/api/shuyx-media/tag/findByMediaId',
    method: 'GET',
    response: () => {
      return{
            "code": 200,
            "data": [
                {
                    "tagId": 2,
                    "tagName": "剧情",
                    "tagType": "MediaStyle"
                },
                {
                    "tagId": 7,
                    "tagName": "2023",
                    "tagType": "MediaTime"
                },
                {
                    "tagId": 10,
                    "tagName": "香港",
                    "tagType": "MediaRegion"
                }
            ],
            "message": "请求成功"
        }
    },
  },

];

