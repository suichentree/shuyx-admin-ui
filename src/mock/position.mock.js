export default [
  //分页查询
  {
    url: '/api/shuyx-user/position/pagelist', 
    method: 'POST', 
    response: () => {
      return{
        code: 200,
        data: {
          records: [
            {
              positionId: 1,
              positionName: "java工程师",
              positionCode: "javaEng",
              status: "0",
              createTime: "2024-01-09T23:31:02.000+08:00",
              updateTime: "2024-01-09T23:31:02.000+08:00"
            },
            {
              positionId: 3,
              positionName: "项目经理",
              positionCode: "PM",
              status: "0",
              createTime: "2024-01-09T23:32:50.000+08:00",
              updateTime: "2024-01-09T23:32:50.000+08:00"
            },
            {
              positionId: 4,
              positionName: "老板",
              positionCode: "BOSS",
              status: "0",
              createTime: "2024-01-09T23:42:40.000+08:00",
              updateTime: "2024-01-09T23:42:40.000+08:00"
            },
            {
              positionId: 5,
              positionName: "销售经理",
              positionCode: "SM",
              status: "0",
              createTime: "2024-01-09T23:43:25.000+08:00",
              updateTime: "2024-01-09T23:43:25.000+08:00"
            },
            {
              positionId: 6,
              positionName: "人事经理", 
              positionCode: "HM",
              status: "0",
              createTime: "2024-01-09T23:45:37.000+08:00",
              updateTime: "2024-01-09T23:45:37.000+08:00"   
            }
          ],
          total: 5,
          size: 10,
          current: 1,
          orders: [],
          optimizeCountSql: true,
          searchCount: true,
          countId: null,
          maxLimit: null,
          pages: 1
        },
        message: "请求成功"
      }
    },
  },
  // 查询职位信息
  {
    url: '/api/shuyx-user/position/postionlist',
    method: 'GET', 
    response: () => {
      return{
        code: 200,
        data: [
          {
            positionId: 1,
            positionName: "java工程师",
            positionCode: "javaEng",
            status: "0",
            createTime: "2024-01-09T23:31:02.000+08:00",
            updateTime: "2024-01-09T23:31:02.000+08:00"
          },
          {
            positionId: 3,
            positionName: "项目经理",
            positionCode: "PM",
            status: "0",
            createTime: "2024-01-09T23:32:50.000+08:00",
            updateTime: "2024-01-09T23:32:50.000+08:00"
          },
          {
            positionId: 4,
            positionName: "老板",
            positionCode: "BOSS",
            status: "0",
            createTime: "2024-01-09T23:42:40.000+08:00",
            updateTime: "2024-01-09T23:42:40.000+08:00"
          },
          {
            positionId: 5,
            positionName: "销售经理",
            positionCode: "SM",
            status: "0",
            createTime: "2024-01-09T23:43:25.000+08:00",
            updateTime: "2024-01-09T23:43:25.000+08:00"
          },
          {
            positionId: 6,
            positionName: "人事经理",
            positionCode: "HM",
            status: "0",
            createTime: "2024-01-09T23:45:37.000+08:00",
            updateTime: "2024-01-09T23:45:37.000+08:00"
          }
        ],
        message: "请求成功"
      }
    },
  },
  // 新增职位
  {
    url: '/api/shuyx-user/position/addPosition',
    method: 'POST', 
    response: () => {
      return {
          code: 200,
          message: "请求成功"
      }
    },
  },
  // 更新职位
  {
    url: '/api/shuyx-user/position/updatePosition',
    method: 'POST', 
    response: () => {
      return {
          code: 200,
          message: "请求成功"
      }
    },
  },
  // 删除职位
  {
    url: '/api/shuyx-user/position/deletePosition',
    method: 'DELETE',
    response: () => {
      return {
          code: 200,
          message: "请求成功"
      }
    },
  },
  // 查询
  {
    url: '/api/shuyx-user/position/selectById',
    method: 'GET',
    response: () => {
      return {
            "code": 200,
            "data": {
                "positionId": 1,
                "positionName": "java工程师",
                "positionCode": "javaEng",
                "status": "0",
                "createTime": "2024-01-09T23:31:02.000+08:00",
                "updateTime": "2024-01-09T23:31:02.000+08:00"
            },
            "message": "请求成功"
        }
    },
  },
];

