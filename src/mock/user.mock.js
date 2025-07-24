export default [
  //根据token获取用户信息
  {
    url: '/api/shuyx-user/user/userInfo', // 接口路径
    method: 'GET', // 请求方法
    response: () => {
      // 模拟响应数据
      return {
          code: 200,
          data: {
              userId: 178,
              orgId: 1,
              positionId: 4,
              userName: "admin",
              passWord: "******",
              gender: "0",
              birthday: "2024-04-03",
              avatar: "1713261936649.8f39fcd0e2ab620fc686f28d36df7e6a.jpg",
              email: "admin@example.com",
              phone: "18271801652",
              status: "0",
              createTime: "2024-04-16T10:05:36.000+08:00",
              updateTime: "2024-04-16T10:05:36.000+08:00"
          },
          message: "请求成功"
      }
    }
  },
  // 查询全部用户
  {
    url: '/api/shuyx-user/user/pagelist',
    method: 'POST', 
    response: () => {
      return{
            code: 200,
            data: {
                total: 7,
                list: [
                    {
                        userId: 1,
                        orgId: 1,
                        positionId: null,
                        userName: "xiaoming",
                        passWord: "$2a$10$n9aYf0EvKAUZzdptsGWTcOQKbI0si.tK3UwvLNfi95vi4v.8SaEUu",
                        gender: "0",
                        birthday: "2024-01-09",
                        avatar: null, 
                        email: "xiaoming2",
                        phone: "13256565858",
                        status: "0",
                        createTime: "2025-07-21T15:23:27.000+08:00",
                        updateTime: null,
                        org: {
                            orgId: 1,
                            parentId: null,
                            orgName: "shuyx科技集团",
                            orgPath: null,
                            status: "0",
                            createTime: null,
                            updateTime: null,
                            children: null
                        },
                        position: {
                            positionId: null,
                            positionName: null,
                            positionCode: null,
                            status: "0",
                            createTime: null,
                            updateTime: null
                        },
                        verifyCode: null,
                        pageNum: null,
                        pageSize: null,
                        beginTime: null,
                        endTime: null
                    },
                    {
                        userId: 2,
                        orgId: null,
                        positionId: null,
                        userName: "xiaoming2",
                        passWord: "ddddddddd",
                        gender: "0",
                        birthday: "2024-01-01",
                        avatar: null,
                        email: "18271801652@163.com",
                        phone: "13256565858",
                        status: "0",
                        createTime: "2024-01-07T09:10:03.000+08:00",
                        updateTime: null,
                        org: {
                            orgId: null,
                            parentId: null,
                            orgName: null,
                            orgPath: null,
                            status: "0",
                            createTime: null,
                            updateTime: null,
                            children: null
                        },
                        position: {
                            positionId: null,
                            positionName: null,
                            positionCode: null,
                            status: "0",
                            createTime: null,
                            updateTime: null
                        },
                        verifyCode: null,
                        pageNum: null,
                        pageSize: null,
                        beginTime: null,
                        endTime: null
                    },
                    {
                        userId: 13,
                        orgId: 2,
                        positionId: 1,
                        userName: "xiaohong",
                        passWord: "xiaohong",
                        gender: "1",
                        birthday: "2024-01-02",
                        avatar: null,
                        email: "xiaohong",
                        phone: "18271856558",
                        status: "0",
                        createTime: "2024-01-14T14:58:47.000+08:00",
                        updateTime: null,
                        org: {
                            orgId: 2,
                            parentId: null,
                            orgName: "湖北总公司",
                            orgPath: null,
                            status: "0",
                            createTime: null,
                            updateTime: null,
                            children: null
                        },
                        position: {
                            positionId: 1,
                            positionName: "java工程师",
                            positionCode: null,
                            status: "0",
                            createTime: null,
                            updateTime: null
                        },
                        verifyCode: null,
                        pageNum: null,
                        pageSize: null,
                        beginTime: null,
                        endTime: null
                    },
                    {
                        userId: 14,
                        orgId: 2,
                        positionId: 3,
                        userName: "xiaoxiao",
                        passWord: "$2a$10$0w0o302cpYHqE.wXbGXsXuYHuPsUzwuEBq.WbfOsmJV5/E.l.798.",
                        gender: "0",
                        birthday: "2024-04-24",
                        avatar: "1713243557562.1809230439CDDAE45736624547385382AB7065745F-001.jpg",
                        email: "xiaoxiao",
                        phone: "165",
                        status: "0",
                        createTime: "2024-04-16T05:08:05.000+08:00",
                        updateTime: null,
                        org: {
                            orgId: 2,
                            parentId: null,
                            orgName: "湖北总公司",
                            orgPath: null,
                            status: "0",
                            createTime: null,
                            updateTime: null,
                            children: null
                        },
                        position: {
                            positionId: 3,
                            positionName: "项目经理",
                            positionCode: null,
                            status: "0",
                            createTime: null,
                            updateTime: null
                        },
                        verifyCode: null,
                        pageNum: null,
                        pageSize: null,
                        beginTime: null,
                        endTime: null
                    },
                    {
                        userId: 16,
                        orgId: 7,
                        positionId: 1,
                        userName: "xiao2",
                        passWord: "xiao2",
                        gender: "0",
                        birthday: "2024-02-06",
                        avatar: null,
                        email: "xiaohei",
                        phone: "182359858",
                        status: "0",
                        createTime: "2024-04-16T04:45:08.000+08:00",
                        updateTime: null,
                        org: {
                            orgId: 7,
                            parentId: null,
                            orgName: "武汉开发部门",
                            orgPath: null,
                            status: "0",
                            createTime: null,
                            updateTime: null,
                            children: null
                        },
                        position: {
                            positionId: 1,
                            positionName: "java工程师",
                            positionCode: null,
                            status: "0",
                            createTime: null,
                            updateTime: null
                        },
                        verifyCode: null,
                        pageNum: null,
                        pageSize: null,
                        beginTime: null,
                        endTime: null
                    },
                    {
                        userId: 17,
                        orgId: 1,
                        positionId: 1,
                        userName: "xiaoai",
                        passWord: "xiaoai",
                        gender: "1",
                        birthday: "2024-02-28",
                        avatar: "1713201022243.user.jpg",
                        email: "xiaoai",
                        phone: "1521226666",
                        status: "0",
                        createTime: "2024-04-16T04:45:43.000+08:00",
                        updateTime: null,
                        org: {
                            orgId: 1,
                            parentId: null,
                            orgName: "shuyx科技集团",
                            orgPath: null,
                            status: "0",
                            createTime: null,
                            updateTime: null,
                            children: null
                        },
                        position: {
                            positionId: 1,
                            positionName: "java工程师",
                            positionCode: null,
                            status: "0",
                            createTime: null,
                            updateTime: null
                        },
                        verifyCode: null,
                        pageNum: null,
                        pageSize: null,
                        beginTime: null,
                        endTime: null
                    },
                    {
                        userId: 178,
                        orgId: 1,
                        positionId: 4,
                        userName: "admin",
                        passWord: "$2a$10$n9aYf0EvKAUZzdptsGWTcOQKbI0si.tK3UwvLNfi95vi4v.8SaEUu",
                        gender: "0",
                        birthday: "2024-04-03",
                        avatar: "1713261936649.8f39fcd0e2ab620fc686f28d36df7e6a.jpg",
                        email: "admin@example.com",
                        phone: "18271801652",
                        status: "0",
                        createTime: "2024-04-16T10:05:36.000+08:00",
                        updateTime: null,
                        org: {
                            orgId: 1,
                            parentId: null,
                            orgName: "shuyx科技集团",
                            orgPath: null,
                            status: "0",
                            createTime: null,
                            updateTime: null,
                            children: null
                        },
                        position: {
                            positionId: 4,
                            positionName: "老板",
                            positionCode: null,
                            status: "0",
                            createTime: null,
                            updateTime: null
                        },
                        verifyCode: null,
                        pageNum: null,
                        pageSize: null,
                        beginTime: null,
                        endTime: null 
                    }
                ],
                pageNum: 1,
                pageSize: 10,
                size: 7,
                startRow: 1,
                endRow: 7,
                pages: 1,
                prePage: 0,
                nextPage: 0,
                isFirstPage: true,
                isLastPage: true,
                hasPreviousPage: false,
                hasNextPage: false,
                navigatePages: 8,
                navigatepageNums: [
                    1
                ],
                navigateFirstPage: 1,
                navigateLastPage: 1
            },
            message: "请求成功"
      }
    }
  },
  //添加用户
  {
    url: '/api/shuyx-user/user/addUser',
    method: 'POST',
    response: () => {
      return {
          code: 200,
          message: "请求成功"
      }
    }
  },
  // 查询用户
  {
    url: '/api/shuyx-user/user/selectById',
    method: 'GET',
    response: () => {
      return{
                "code": 200,
                "data": [
                    {
                        "userId": 178,
                        "orgId": 1,
                        "positionId": 4,
                        "userName": "admin",
                        "passWord": "$2a$10$n9aYf0EvKAUZzdptsGWTcOQKbI0si.tK3UwvLNfi95vi4v.8SaEUu",
                        "gender": "0",
                        "birthday": "2024-04-03",
                        "avatar": "1713261936649.8f39fcd0e2ab620fc686f28d36df7e6a.jpg",
                        "email": "admin@example.com",
                        "phone": "18271801652",
                        "status": "0",
                        "createTime": "2024-04-16T10:05:36.000+08:00",
                        "updateTime": null,
                        "org": {
                            "orgId": 1,
                            "parentId": null,
                            "orgName": "shuyx科技集团",
                            "orgPath": null,
                            "status": "0",
                            "createTime": null,
                            "updateTime": null,
                            "children": null
                        },
                        "position": {
                            "positionId": 4,
                            "positionName": "老板",
                            "positionCode": null,
                            "status": "0",
                            "createTime": null,
                            "updateTime": null
                        },
                        "verifyCode": null,
                        "pageNum": null,
                        "pageSize": null,
                        "beginTime": null,
                        "endTime": null
                    }
                ],
                "message": "请求成功"
            }
    }
  },
  // 更新用户
  {
    url: '/api/shuyx-user/user/updateUser',
    method: 'POST',
    response: () => {
      return{
        code: 200,
        message: "请求成功"
      }
    }
  },
  // 更新用户密码
  {
    url: '/api/shuyx-user/user/updateUserPassword',
    method: 'POST',
    response: () => {
      return{
        code: 200,
        message: "请求成功"
      }
    }
  },
  // 删除用户
  {
    url: '/api/shuyx-user/user/deleteUser',
    method: 'DELETE',
    response: () => {
      return{
        code: 200,
        message: "请求成功"
      }
    }
  }
];

