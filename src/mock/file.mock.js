export default [
  //分页查询
  {
    url: '/api/shuyx-user/file/pagelist',
    method: 'POST', 
    response: () => {
      return {
              "code": 200,
              "data": {
                  "records": [
                      {
                          "fileId": 8,
                          "userId": "14",
                          "fileName": "Aqua Timez - Velonica.mp3",
                          "fileAddress": "1713104152766.Aqua Timez - Velonica.mp3",
                          "fileSize": "10.75",
                          "uploadTime": "2024-04-14T22:15:53.000+08:00",
                          "remark": "1"
                      },
                      {
                          "fileId": 9,
                          "userId": "14",
                          "fileName": "again - YUI.mp3",
                          "fileAddress": "1713105804155.again - YUI.mp3",
                          "fileSize": "10.16",
                          "uploadTime": "2024-04-14T22:43:25.000+08:00",
                          "remark": null
                      },
                      {
                          "fileId": 10,
                          "userId": "14",
                          "fileName": "&Z - 澤野弘之.mp3",
                          "fileAddress": "1713105941370.&Z - 澤野弘之.mp3",
                          "fileSize": "4.35",
                          "uploadTime": "2024-04-14T22:45:42.000+08:00",
                          "remark": null
                      },
                      {
                          "fileId": 11,
                          "userId": "14",
                          "fileName": "全职猎人cover.jpg",
                          "fileAddress": "1713107049930.全职猎人cover.jpg",
                          "fileSize": "0.17",
                          "uploadTime": "2024-04-14T23:04:11.000+08:00",
                          "remark": null
                      },
                      {
                          "fileId": 12,
                          "userId": "14",
                          "fileName": "周杰伦-稻香.rmvb",
                          "fileAddress": "1713111303459.周杰伦-稻香.rmvb",
                          "fileSize": "17.92",
                          "uploadTime": "2024-04-15T00:15:05.000+08:00",
                          "remark": "66"
                      },
                      {
                          "fileId": 13,
                          "userId": "14",
                          "fileName": "和田光司 (わだ こうじ) - Butter-Fly (tri.Version).mp4",
                          "fileAddress": "1713174206231.和田光司 (わだ こうじ) - Butter-Fly (tri.Version).mp4",
                          "fileSize": "76.77",
                          "uploadTime": "2024-04-15T17:43:30.000+08:00",
                          "remark": "33"
                      },
                      {
                          "fileId": 15,
                          "userId": "14",
                          "fileName": "GIGANT.pdf",
                          "fileAddress": "1713178115396.GIGANT.pdf",
                          "fileSize": "532.07",
                          "uploadTime": "2024-04-15T18:48:58.000+08:00",
                          "remark": null
                      }
                  ],
                  "total": 7,
                  "size": 10,
                  "current": 1,
                  "orders": [],
                  "optimizeCountSql": true,
                  "searchCount": true,
                  "countId": null,
                  "maxLimit": null,
                  "pages": 1
              },
              "message": "请求成功"
          }

    },
  },
  //删除
  {
    url: '/api/shuyx-user/file/delete',
    method: 'DELETE',
    response: () => {
      return {
          code: 200,
          message: "请求成功"
      };
    },
  },
];

