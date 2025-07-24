export default [
  //分页标签查询
  {
    url: '/api/shuyx-media/media/pageFindMediaByTag', 
    method: 'POST', 
    response: () => {
      return {
                "code": 200,
                "data": {
                    "total": 12,
                    "list": [
                        {
                            "mediaId": 6,
                            "mediaName": "无间道",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2024/剧情/恐怖",
                            "mediaCover": "1712984725928.adsa.jpg",
                            "director": "无间道",
                            "actor": "无间道",
                            "description": "无间道无间道无间道无间道无间道无间道",
                            "releaseDate": "2024-03-25",
                            "region": "香港",
                            "mediaScore": 9.5,
                            "createTime": "2024-03-06",
                            "updateTime": "2024-04-14T05:42:14.000+00:00"
                        },
                        {
                            "mediaId": 7,
                            "mediaName": "卧龙",
                            "mediaType": "Movie",
                            "mediaTag": "/香港/2021/犯罪",
                            "mediaCover": "1712847173085.ddd.jpg",
                            "director": "卧龙",
                            "actor": "卧龙",
                            "description": "卧龙卧龙卧龙卧龙",
                            "releaseDate": "2024-03-04",
                            "region": "卧龙",
                            "mediaScore": 8.1,
                            "createTime": "2024-03-06",
                            "updateTime": "2024-04-13T06:45:32.000+00:00"
                        },
                        {
                            "mediaId": 9,
                            "mediaName": "杀破狼",
                            "mediaType": "Movie",
                            "mediaTag": "/日本/2021/犯罪",
                            "mediaCover": "1712984752575.ddd.jpg",
                            "director": "杀破狼",
                            "actor": "杀破狼",
                            "description": "杀破狼杀破狼杀破狼杀破狼",
                            "releaseDate": "2024-03-25",
                            "region": "大陆",
                            "mediaScore": 7,
                            "createTime": "2024-03-08",
                            "updateTime": "2024-04-11T13:00:55.000+00:00"
                        },
                        {
                            "mediaId": 11,
                            "mediaName": "你的名字",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2024/科幻",
                            "mediaCover": "1712984771955.adsa.jpg",
                            "director": "你的名字",
                            "actor": "你的名字",
                            "description": "你的名字你的名字你的名字",
                            "releaseDate": "2024-04-01",
                            "region": "日本",
                            "mediaScore": 9.5,
                            "createTime": "2024-03-08",
                            "updateTime": "2024-04-11T12:52:05.000+00:00"
                        },
                        {
                            "mediaId": 12,
                            "mediaName": "醉拳",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2024/科幻",
                            "mediaCover": "1712984778539.cccc.jpeg",
                            "director": "醉拳",
                            "actor": "醉拳",
                            "description": "醉拳醉拳醉拳",
                            "releaseDate": "2024-03-18",
                            "region": "大陆",
                            "mediaScore": 8,
                            "createTime": "2024-03-08",
                            "updateTime": "2024-04-11T12:49:18.000+00:00"
                        },
                        {
                            "mediaId": 13,
                            "mediaName": "少林寺",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2024/犯罪",
                            "mediaCover": "1712990813293.fd.jpeg",
                            "director": "少林寺",
                            "actor": "少林寺",
                            "description": "少林寺少林寺少林寺少林寺",
                            "releaseDate": "2024-03-25",
                            "region": "大陆",
                            "mediaScore": 7,
                            "createTime": "2024-03-08",
                            "updateTime": "2024-04-13T06:44:04.000+00:00"
                        },
                        {
                            "mediaId": 14,
                            "mediaName": "黑社会",
                            "mediaType": "Movie",
                            "mediaTag": "/香港/2023/喜剧",
                            "mediaCover": "1712990764334.fd.jpeg",
                            "director": "黑社会",
                            "actor": "黑社会",
                            "description": "黑社会黑社会黑社会",
                            "releaseDate": "2024-03-04",
                            "region": "香港",
                            "mediaScore": 9,
                            "createTime": "2024-03-08",
                            "updateTime": "2024-04-13T06:40:28.000+00:00"
                        },
                        {
                            "mediaId": 15,
                            "mediaName": "叶问",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2021/喜剧",
                            "mediaCover": "1712987565936.cccc.jpeg",
                            "director": "叶问",
                            "actor": "叶问",
                            "description": "叶问叶问叶问叶问",
                            "releaseDate": "2024-04-08",
                            "region": "香港",
                            "mediaScore": 7,
                            "createTime": "2024-04-09",
                            "updateTime": "2024-04-13T06:40:41.000+00:00"
                        },
                        {
                            "mediaId": 16,
                            "mediaName": "少林寺",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2022/犯罪",
                            "mediaCover": "1712987625559.fd.jpeg",
                            "director": "少林寺",
                            "actor": "少林寺",
                            "description": "少林寺少林寺少林寺",
                            "releaseDate": "2024-04-09",
                            "region": "大陆佛山",
                            "mediaScore": 6,
                            "createTime": "2024-04-09",
                            "updateTime": "2024-04-13T06:40:47.000+00:00"
                        },
                        {
                            "mediaId": 17,
                            "mediaName": "让子弹飞",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2021/科幻",
                            "mediaCover": "1712990821889.fd.jpeg",
                            "director": "让子弹飞",
                            "actor": "让子弹飞",
                            "description": "让子弹飞让子弹飞让子弹飞",
                            "releaseDate": "2024-04-02",
                            "region": "大陆黄山",
                            "mediaScore": 6.3,
                            "createTime": "2024-04-09",
                            "updateTime": "2024-04-13T06:40:53.000+00:00"
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
  //分页查询
  {
    url: '/api/shuyx-media/media/pagelist',
    method: 'POST', 
    response: () => {
      return {
                "code": 200,
                "data": {
                    "total": 12,
                    "list": [
                        {
                            "mediaId": 6,
                            "mediaName": "无间道",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2024/剧情/恐怖",
                            "mediaCover": "1712984725928.adsa.jpg",
                            "director": "无间道",
                            "actor": "无间道",
                            "description": "无间道无间道无间道无间道无间道无间道",
                            "releaseDate": "2024-03-25",
                            "region": "香港",
                            "mediaScore": 9.5,
                            "createTime": "2024-03-06",
                            "updateTime": "2024-04-14T05:42:14.000+00:00"
                        },
                        {
                            "mediaId": 7,
                            "mediaName": "卧龙",
                            "mediaType": "Movie",
                            "mediaTag": "/香港/2021/犯罪",
                            "mediaCover": "1712847173085.ddd.jpg",
                            "director": "卧龙",
                            "actor": "卧龙",
                            "description": "卧龙卧龙卧龙卧龙",
                            "releaseDate": "2024-03-04",
                            "region": "卧龙",
                            "mediaScore": 8.1,
                            "createTime": "2024-03-06",
                            "updateTime": "2024-04-13T06:45:32.000+00:00"
                        },
                        {
                            "mediaId": 9,
                            "mediaName": "杀破狼",
                            "mediaType": "Movie",
                            "mediaTag": "/日本/2021/犯罪",
                            "mediaCover": "1712984752575.ddd.jpg",
                            "director": "杀破狼",
                            "actor": "杀破狼",
                            "description": "杀破狼杀破狼杀破狼杀破狼",
                            "releaseDate": "2024-03-25",
                            "region": "大陆",
                            "mediaScore": 7,
                            "createTime": "2024-03-08",
                            "updateTime": "2024-04-11T13:00:55.000+00:00"
                        },
                        {
                            "mediaId": 11,
                            "mediaName": "你的名字",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2024/科幻",
                            "mediaCover": "1712984771955.adsa.jpg",
                            "director": "你的名字",
                            "actor": "你的名字",
                            "description": "你的名字你的名字你的名字",
                            "releaseDate": "2024-04-01",
                            "region": "日本",
                            "mediaScore": 9.5,
                            "createTime": "2024-03-08",
                            "updateTime": "2024-04-11T12:52:05.000+00:00"
                        },
                        {
                            "mediaId": 12,
                            "mediaName": "醉拳",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2024/科幻",
                            "mediaCover": "1712984778539.cccc.jpeg",
                            "director": "醉拳",
                            "actor": "醉拳",
                            "description": "醉拳醉拳醉拳",
                            "releaseDate": "2024-03-18",
                            "region": "大陆",
                            "mediaScore": 8,
                            "createTime": "2024-03-08",
                            "updateTime": "2024-04-11T12:49:18.000+00:00"
                        },
                        {
                            "mediaId": 13,
                            "mediaName": "少林寺",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2024/犯罪",
                            "mediaCover": "1712990813293.fd.jpeg",
                            "director": "少林寺",
                            "actor": "少林寺",
                            "description": "少林寺少林寺少林寺少林寺",
                            "releaseDate": "2024-03-25",
                            "region": "大陆",
                            "mediaScore": 7,
                            "createTime": "2024-03-08",
                            "updateTime": "2024-04-13T06:44:04.000+00:00"
                        },
                        {
                            "mediaId": 14,
                            "mediaName": "黑社会",
                            "mediaType": "Movie",
                            "mediaTag": "/香港/2023/喜剧",
                            "mediaCover": "1712990764334.fd.jpeg",
                            "director": "黑社会",
                            "actor": "黑社会",
                            "description": "黑社会黑社会黑社会",
                            "releaseDate": "2024-03-04",
                            "region": "香港",
                            "mediaScore": 9,
                            "createTime": "2024-03-08",
                            "updateTime": "2024-04-13T06:40:28.000+00:00"
                        },
                        {
                            "mediaId": 15,
                            "mediaName": "叶问",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2021/喜剧",
                            "mediaCover": "1712987565936.cccc.jpeg",
                            "director": "叶问",
                            "actor": "叶问",
                            "description": "叶问叶问叶问叶问",
                            "releaseDate": "2024-04-08",
                            "region": "香港",
                            "mediaScore": 7,
                            "createTime": "2024-04-09",
                            "updateTime": "2024-04-13T06:40:41.000+00:00"
                        },
                        {
                            "mediaId": 16,
                            "mediaName": "少林寺",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2022/犯罪",
                            "mediaCover": "1712987625559.fd.jpeg",
                            "director": "少林寺",
                            "actor": "少林寺",
                            "description": "少林寺少林寺少林寺",
                            "releaseDate": "2024-04-09",
                            "region": "大陆佛山",
                            "mediaScore": 6,
                            "createTime": "2024-04-09",
                            "updateTime": "2024-04-13T06:40:47.000+00:00"
                        },
                        {
                            "mediaId": 17,
                            "mediaName": "让子弹飞",
                            "mediaType": "Movie",
                            "mediaTag": "/大陆/2021/科幻",
                            "mediaCover": "1712990821889.fd.jpeg",
                            "director": "让子弹飞",
                            "actor": "让子弹飞",
                            "description": "让子弹飞让子弹飞让子弹飞",
                            "releaseDate": "2024-04-02",
                            "region": "大陆黄山",
                            "mediaScore": 6.3,
                            "createTime": "2024-04-09",
                            "updateTime": "2024-04-13T06:40:53.000+00:00"
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
  //添加
  {
    url: '/api/shuyx-media/media/addMedia',
    method: 'POST',
    response: () => {
      return {
          "code": 200,
          "message": "请求成功"
      }
    },
  },
  //更新
  {
    url: '/api/shuyx-media/media/updateMedia',
    method: 'POST',
    response: () => {
      return {
          "code": 200,
          "message": "请求成功"
      }
    },
  },
  //删除
  {
    url: '/api/shuyx-media/media/deleteMedia',
    method: 'DELETE',
    response: () => {
      return {
          "code": 200,
          "message": "请求成功"
      }
    },
  },
  //条件查询
  {
    url: '/api/shuyx-media/media/findBy',
    method: 'POST',
    response: () => {
      return {
          "code": 200,
          "data": [
              {
                  "mediaId": 23,
                  "mediaName": "1",
                  "mediaType": "Movie",
                  "mediaTag": "",
                  "mediaCover": null,
                  "director": "1",
                  "actor": "1",
                  "description": "111",
                  "releaseDate": "2025-07-06",
                  "region": "11",
                  "mediaScore": 6,
                  "createTime": "2025-07-23",
                  "updateTime": "2025-07-23T15:48:59.000+00:00"
              }
          ],
          "message": "请求成功"
      }
    },
  },
];

