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
  
];

