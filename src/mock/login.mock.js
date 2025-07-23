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
];

