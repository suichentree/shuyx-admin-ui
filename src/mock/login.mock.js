export default [
  //登录
  {
    url: '/api/shuyx-user/auth/login', // 接口路径
    method: 'POST', // 请求方法
    response: () => {
      // 模拟响应数据
      return {
          code: 200,
          data: "Bearer eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZXhwIjoxNzUzMjg2MTA5LCJ1c2VySWQiOiIxNzgifQ.GH5Z0Ez1ibqO6hPU37jWSsFBJgIuPvaZtYbQn7NkEMU",
          message: "请求成功"
      };
    },
  },
  // 获取验证码
  {
    url: '/api/shuyx-user/auth/verifycode',
    method: 'GET', 
    response: () => {
      return {
          code: 200,
          data: {
              verifyCode: "1234",
              userName: "admin"
          },
          message: "请求成功"
      };
    },
  },
  //注销
  {
    url: '/api/shuyx-user/auth/logout',
    method: 'POST',
    response: () => {
      return {
          code: 200,
          message: "请求成功"
      };
    },
  },
  //注册账号
  {
    url: '/api/shuyx-user/auth/register',
    method: 'POST',
    response: () => {
      return {
            "code": 200,
            "data": {
                "userId": 179,
                "orgId": null,
                "positionId": null,
                "userName": "admin123",
                "passWord": "$2a$10$oX1qSaP6DuQ/8AwHv1GL..PfHuk.LwuiCUZvDO7bqm3Awx5kr59B.",
                "gender": "0",
                "birthday": "2025-07-01",
                "avatar": null,
                "email": null,
                "phone": null,
                "status": "0",
                "createTime": "2025-07-24T00:03:31.838+08:00",
                "updateTime": "2025-07-24T00:03:31.838+08:00"
            },
            "message": "请求成功"
        }
    },
  },
];

