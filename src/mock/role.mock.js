export default [
  //查询树形列表
  {
    url: '/api/shuyx-user/role/roleTreelist', // 接口路径
    method: 'GET', // 请求方法
    response: () => {
      // 模拟响应数据
      return{
            code: 200,
            data: [
                {
                    roleId: 1,
                    parentId: 0,
                    roleCode: "super-admin",
                    roleName: "超级管理员角色",
                    status: "0",
                    createTime: "2024-01-10T16:07:19.000+08:00",
                    updateTime: "2024-01-10T16:07:19.000+08:00",
                    children: [
                        {
                            roleId: 4,
                            parentId: 1,
                            roleCode: "normal-admin",
                            roleName: "普通管理员角色",
                            status: "0",
                            createTime: "2024-01-10T16:24:01.000+08:00",
                            updateTime: "2024-01-10T16:24:01.000+08:00",
                            children: []
                        },
                        {
                            roleId: 11,
                            parentId: 1,
                            roleCode: "normal-work",
                            roleName: "普通员工角色",
                            status: "0",
                            createTime: "2024-04-16T16:39:15.000+08:00",
                            updateTime: "2024-04-16T16:39:15.000+08:00",
                            children: []
                        }
                    ]
                }
            ],
            message: "请求成功"
        }
    },
  },
  // 添加角色
  {
    url: '/api/shuyx-user/role/addRole',
    method: 'POST',
    response: () => {
      return {
        "code": 200,
        "message": "请求成功"
      }
    },
  },
  // 更新角色
  {
    url: '/api/shuyx-user/role/updateRole',
    method: 'POST',
    response: () => {
      return {
        code: 200,
        message: "请求成功"
      }
    },
  },
  // 删除角色
  {
    url: '/api/shuyx-user/role/deleteRole',
    method: 'DELETE',
    response: () => {
      return {
        code: 200,
        message: "请求成功"
      }
    },
  },
  //查询所有菜单和角色可使用菜单
  {
    url: '/api/shuyx-user/menu/selectRoleMenuInfo',
    method: 'GET',
    response: () => {
      return {
        code: 200,
        message: "请求成功",
        data: {
            roleMenuIds: [2,3,4,8,9,10,24,16,20,23,31,17,18,21,25,26,27,28,34,30,32,33,35,36,37],
            menuTreeData: [{
                                menuId: 2,
                                menuName: "系统管理",
                                parentId: 0,
                                menuPath: "/system",
                                menuPage: null,
                                menuType: 0,    
                                visible: 0,
                                isLink: 0,
                                status: "0",
                                icon: "Setting",
                                createTime: "2024-01-10T01:21:14.000+08:00",
                                updateTime: "2024-01-10T01:21:19.000+08:00",
                                children: [
                                    {
                                        menuId: 3,
                                        menuName: "用户管理",
                                        parentId: 2,
                                        menuPath: "/system/user",
                                        menuPage: "/src/views/system/user/UserView.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "UserFilled",
                                        createTime: "2024-01-10T01:42:18.000+08:00",
                                        updateTime: "2024-01-10T01:42:18.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 4,
                                        menuName: "菜单管理",
                                        parentId: 2,
                                        menuPath: "/system/menu",
                                        menuPage: "/src/views/system/menu/MenuView.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Collection",
                                        createTime: "2024-01-10T13:59:05.000+08:00",
                                        updateTime: "2024-01-10T13:59:05.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 8,
                                        menuName: "组织机构管理",
                                        parentId: 2,
                                        menuPath: "/system/org",
                                        menuPage: "/src/views/system/org/OrgView.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "OfficeBuilding",
                                        createTime: "2024-01-15T16:52:54.000+08:00",
                                        updateTime: "2024-01-15T16:52:54.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 9,
                                        menuName: "职位管理",
                                        parentId: 2,
                                        menuPath: "/system/position",
                                        menuPage: "/src/views/system/position/PositionView.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Avatar",
                                        createTime: "2024-01-15T16:53:34.000+08:00",
                                        updateTime: "2024-01-15T16:53:34.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 10,
                                        menuName: "角色管理",
                                        parentId: 2,
                                        menuPath: "/system/role",
                                        menuPage: "/src/views/system/role/RoleView.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Avatar",
                                        createTime: "2024-01-15T16:54:21.000+08:00",
                                        updateTime: "2024-01-15T16:54:21.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 24,
                                        menuName: "字典管理",
                                        parentId: 2,
                                        menuPath: "/system/dict",
                                        menuPage: "/src/views/system/dict/DictView.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Collection",
                                        createTime: "2024-04-01T23:25:45.000+08:00",
                                        updateTime: "2024-04-01T23:25:45.000+08:00",
                                        children: []
                                    }
                                ]
                            },
                            {
                                menuId: 16,
                                menuName: "媒体管理",
                                parentId: 0,
                                menuPath: "/media",
                                menuPage: null,
                                menuType: 0,
                                visible: 0,
                                isLink: 0,
                                status: "0",
                                icon: "Platform",
                                createTime: "2024-02-27T23:18:51.000+08:00",
                                updateTime: "2024-02-27T23:18:51.000+08:00",
                                children: [
                                    {
                                        menuId: 20,
                                        menuName: "标签维护",
                                        parentId: 16,
                                        menuPath: "/media/tag",
                                        menuPage: "/src/views/media/tag/TagView.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Document",
                                        createTime: "2024-03-06T02:20:37.000+08:00",
                                        updateTime: "2024-03-06T02:20:37.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 23,
                                        menuName: "剧集维护",
                                        parentId: 16,
                                        menuPath: "/media/epsiodes",
                                        menuPage: "/src/views/media/episodes/EpisodesView.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Coin",
                                        createTime: "2024-03-21T02:01:01.000+08:00",
                                        updateTime: "2024-03-21T02:01:01.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 31,
                                        menuName: "信息维护",
                                        parentId: 16,
                                        menuPath: "/media/resource",
                                        menuPage: null,
                                        menuType: 0,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Camera",
                                        createTime: "2024-04-10T00:02:12.000+08:00",    
                                        updateTime: "2024-04-10T00:02:12.000+08:00",
                                        children: [
                                            {
                                                menuId: 17,
                                                menuName: "媒体展示",
                                                parentId: 31,
                                                menuPath: "/media/resource/show",
                                                menuPage: "/src/views/media/resource/ResourceShow.vue",
                                                menuType: 1,
                                                visible: 0,
                                                isLink: 0,
                                                status: "0",
                                                icon: "Camera",
                                                createTime: "2024-02-27T23:19:35.000+08:00",
                                                updateTime: "2024-02-27T23:19:35.000+08:00",
                                                children: []
                                            },
                                            {
                                                menuId: 18,
                                                menuName: "媒体详情",
                                                parentId: 31,
                                                menuPath: "/media/resource/info",
                                                menuPage: "/src/views/media/resource/ResourceInfo.vue",
                                                menuType: 1,
                                                visible: 1,
                                                isLink: 0,
                                                status: "0",
                                                icon: "Film",
                                                createTime: "2024-03-03T00:39:06.000+08:00",
                                                updateTime: "2024-03-03T00:39:06.000+08:00",
                                                children: []
                                            },
                                            {
                                                menuId: 21,
                                                menuName: "媒体列表",
                                                parentId: 31,
                                                menuPath: "/media/resource/list",
                                                menuPage: "/src/views/media/resource/ResourceView.vue",
                                                menuType: 1,
                                                visible: 0,
                                                isLink: 0,
                                                status: "0",
                                                icon: "Cellphone",
                                                createTime: "2024-03-06T08:14:55.000+08:00",
                                                updateTime: "2024-03-06T08:14:55.000+08:00",
                                                children: []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                menuId: 25,
                                menuName: "监控管理",
                                parentId: 0,
                                menuPath: "/monitor",
                                menuPage: null,
                                menuType: 0,
                                visible: 0,
                                isLink: 0,
                                status: "0",
                                icon: "Aim",
                                createTime: "2024-04-03T00:15:10.000+08:00",
                                updateTime: "2024-04-03T00:15:10.000+08:00",
                                children: [
                                    {
                                        menuId: 26,
                                        menuName: "Nacos监控",
                                        parentId: 25,
                                        menuPath: "http://localhost:38848/nacos/index.html#/login",
                                        menuPage: null,
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 1,
                                        status: "0",
                                        icon: "DataLine",
                                        createTime: "2024-04-03T00:20:42.000+08:00",
                                        updateTime: "2024-04-03T00:20:42.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 27,
                                        menuName: "MinIO监控",
                                        parentId: 25,
                                        menuPath: "http://localhost:39001/login",
                                        menuPage: null,
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 1,
                                        status: "0",
                                        icon: "DataLine",
                                        createTime: "2024-04-03T10:49:59.000+08:00",
                                        updateTime: "2024-04-03T10:49:59.000+08:00",
                                        children: []
                                    }
                                ]
                            },
                            {
                                menuId: 28,
                                menuName: "博客管理",
                                parentId: 0,
                                menuPath: "/blog/index",
                                menuPage: "/src/views/blog/BlogView.vue",
                                menuType: 1,
                                visible: 0,
                                isLink: 0,
                                status: "0",
                                icon: "Memo",
                                createTime: "2024-04-05T22:36:06.000+08:00",
                                updateTime: "2024-04-05T22:36:06.000+08:00",
                                children: []
                            },
                            {
                                menuId: 34,
                                menuName: "个人管理",
                                parentId: 0,
                                menuPath: "/personal",
                                menuPage: null,
                                menuType: 0,
                                visible: 0,
                                isLink: 0,
                                status: "0",
                                icon: "User",
                                createTime: "2024-04-15T21:44:09.000+08:00",
                                updateTime: "2024-04-15T21:44:09.000+08:00",
                                children: [
                                    {
                                        menuId: 30,
                                        menuName: "用户信息",   
                                        parentId: 34,
                                        menuPath: "/personal/userinfo",
                                        menuPage: "/src/views/personal/userinfo/UserInfo.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Avatar",
                                        createTime: "2024-04-09T00:04:14.000+08:00",
                                        updateTime: "2024-04-09T00:04:14.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 32,
                                        menuName: "文件管理",
                                        parentId: 34,
                                        menuPath: "/personal/file",
                                        menuPage: "/src/views/personal/file/FileView.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Folder",
                                        createTime: "2024-04-14T19:25:53.000+08:00",
                                        updateTime: "2024-04-14T19:25:53.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 33,
                                        menuName: "通讯录管理",
                                        parentId: 34,
                                        menuPath: "/personal/contactbook",
                                        menuPage: "/src/views/personal/contactBook/ContactBookView.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Document",
                                        createTime: "2024-04-15T20:06:00.000+08:00",
                                        updateTime: "2024-04-15T20:06:00.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 35,
                                        menuName: "用户头像",
                                        parentId: 34,
                                        menuPath: "/personal/avatar",
                                        menuPage: "/src/views/personal/userAvatar/UserAvatar.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Microphone",
                                        createTime: "2024-04-16T00:48:20.000+08:00",
                                        updateTime: "2024-04-16T00:48:20.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 36,
                                        menuName: "用户密码",
                                        parentId: 34,
                                        menuPath: "/personal/password",
                                        menuPage: "/src/views/personal/userPassword/UserPassword.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Key",
                                        createTime: "2024-04-16T01:12:50.000+08:00",
                                        updateTime: "2024-04-16T01:12:50.000+08:00",
                                        children: []
                                    },
                                    {
                                        menuId: 37,
                                        menuName: "导入文档",
                                        parentId: 34,
                                        menuPath: "/personal/importFile",
                                        menuPage: "/src/views/personal/file/ImportFile.vue",
                                        menuType: 1,
                                        visible: 0,
                                        isLink: 0,
                                        status: "0",
                                        icon: "Apple",
                                        createTime: "2024-04-19T15:06:23.000+08:00",
                                        updateTime: "2024-04-19T15:06:23.000+08:00",
                                        children: []    
                                    }
                                ]
                            }
                        ]
        },
      }
    },
  },
  // 更新角色可使用菜单
  {
    url: '/api/shuyx-user/menu/updateRoleMenuInfo',
    method: 'POST',
    response: () => {
      return {
        code: 200,
        message: "请求成功"
      }
    },
  },
  // 查询角色下的用户分页信息
  {
    url: '/api/shuyx-user/user/selectUserListByRoleId',
    method: 'POST',
    response: () => {
      return {
                    "code": 200,
                    "data": {
                        "total": 2,
                        "list": [
                            {
                                "userId": 1,
                                "orgId": null,
                                "positionId": null,
                                "userName": "xiaoming",
                                "passWord": null,
                                "gender": null,
                                "birthday": null,
                                "avatar": null,
                                "email": null,
                                "phone": null,
                                "status": "0",
                                "createTime": null,
                                "updateTime": null
                            },
                            {
                                "userId": 178,
                                "orgId": null,
                                "positionId": null,
                                "userName": "admin",
                                "passWord": null,
                                "gender": null,
                                "birthday": null,
                                "avatar": null,
                                "email": null,
                                "phone": null,
                                "status": "0",
                                "createTime": null,
                                "updateTime": null
                            }
                        ],
                        "pageNum": 1,
                        "pageSize": 10,
                        "size": 2,
                        "startRow": 1,
                        "endRow": 2,
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
  // 查询不属于该角色下的用户分页信息
  {
    url: '/api/shuyx-user/user/selectUserListByNoRoleId',
    method: 'POST',
    response: () => {
      return{
                "code": 200,
                "data": {
                    "total": 1,
                    "list": [
                        {
                            "userId": 2,
                            "orgId": null,
                            "positionId": null,
                            "userName": "xiaoming2",
                            "passWord": null,
                            "gender": null,
                            "birthday": null,
                            "avatar": null,
                            "email": null,
                            "phone": null,
                            "status": "0",
                            "createTime": null,
                            "updateTime": null
                        }
                    ],
                    "pageNum": 1,
                    "pageSize": 10,
                    "size": 1,
                    "startRow": 1,
                    "endRow": 1,
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
  // 将角色与用户绑定
  {
    url: '/api/shuyx-user/user/addUserRole',
    method: 'POST',
    response: () => {
      return{
            "code": 200,
            "message": "请求成功"
        }
    },
  },
  // 解除角色与用户的绑定
  {
    url: '/api/shuyx-user/user/deleteUserRole',
    method: 'POST',
    response: () => {
      return{
            "code": 200,
            "message": "请求成功"
        }
    },
  },
];

