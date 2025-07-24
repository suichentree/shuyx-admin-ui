export default [
  //分页查询
  {
    url: '/api/shuyx-media/episodes/pagelist', // 接口路径
    method: 'POST', // 请求方法
    response: () => {
      // 模拟响应数据
      return {
            "code": 200,
            "data": {
                "total": 4,
                "list": [
                    {
                        "episodesId": 8,
                        "mediaId": 6,
                        "episodesNumber": 2,
                        "episodesName": "第2集",
                        "episodesUrl": "宇多田ヒカル(宇多田光) - 桜流し (ヱヴァＱバージョン)_h0021v2nfib_3_0.mp4",
                        "media": {
                            "mediaId": 6,
                            "mediaName": "无间道",
                            "mediaType": null,
                            "mediaTag": null,
                            "mediaCover": null,
                            "director": null,
                            "actor": null,
                            "description": null,
                            "releaseDate": null,
                            "region": null,
                            "mediaScore": null,
                            "createTime": null,
                            "updateTime": null
                        }
                    },
                    {
                        "episodesId": 22,
                        "mediaId": 6,
                        "episodesNumber": 3,
                        "episodesName": "第3集",
                        "episodesUrl": "1713028980580.心做し REC映像(まじ娘).mp4",
                        "media": {
                            "mediaId": 6,
                            "mediaName": "无间道",
                            "mediaType": null,
                            "mediaTag": null,
                            "mediaCover": null,
                            "director": null,
                            "actor": null,
                            "description": null,
                            "releaseDate": null,
                            "region": null,
                            "mediaScore": null,
                            "createTime": null,
                            "updateTime": null
                        }
                    },
                    {
                        "episodesId": 11,
                        "mediaId": 11,
                        "episodesNumber": 1,
                        "episodesName": "第1集",
                        "episodesUrl": "1711950414585.oceans.mp4",
                        "media": {
                            "mediaId": 11,
                            "mediaName": "你的名字",
                            "mediaType": null,
                            "mediaTag": null,
                            "mediaCover": null,
                            "director": null,
                            "actor": null,
                            "description": null,
                            "releaseDate": null,
                            "region": null,
                            "mediaScore": null,
                            "createTime": null,
                            "updateTime": null
                        }
                    },
                    {
                        "episodesId": 19,
                        "mediaId": 11,
                        "episodesNumber": 2,
                        "episodesName": "第2集",
                        "episodesUrl": "青蛙王子.1984.HD1080p.国粤双语中字.mp4",
                        "media": {
                            "mediaId": 11,
                            "mediaName": "你的名字",
                            "mediaType": null,
                            "mediaTag": null,
                            "mediaCover": null,
                            "director": null,
                            "actor": null,
                            "description": null,
                            "releaseDate": null,
                            "region": null,
                            "mediaScore": null,
                            "createTime": null,
                            "updateTime": null
                        }
                    }
                ],
                "pageNum": 1,
                "pageSize": 10,
                "size": 4,
                "startRow": 1,
                "endRow": 4,
                "pages": 1,
                "prePage": 0,
                "nextPage": 0,
                "isFirstPage": true,
                "isLastPage": true,
                "hasPreviousPage": false,
                "hasNextPage": false,
                "navigatePages": 8,
                "navigatepageNums": [
                    1
                ],
                "navigateFirstPage": 1,
                "navigateLastPage": 1
            },
            "message": "请求成功"
        }
    },
  },
  // 新增
  {
    url: '/api/shuyx-media/episodes/add',
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
    url: '/api/shuyx-media/episodes/delete',
    method: 'POST',
    response: () => {
      return {
          "code": 10002,
          "message": "删除失败，请管理员查询日志信息"
      }
    },
  },
  // 更新
  {
    url: '/api/shuyx-media/episodes/update',
    method: 'POST',
    response: () => {
      return {
          "code": 200,
          "message": "请求成功"
      }
    },
  },
];

