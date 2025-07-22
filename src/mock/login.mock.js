export default [
  //登录
  {
    url: '/api/shuyx-user/auth/login', // 接口路径
    method: 'POST', // 请求方法
    response: ({ body }) => {
      // 模拟响应数据
      return {
        code: 200,
        message: '登录成功',
        data: {
          token: 'mock_token_123456',
        },
      };
    },
  },
  //验证码
  {
    url: '/api/shuyx-user/auth/verifycode',
    method: 'GET', 
    response: ({ body }) => {
      return {
        code: 200,
        message: '验证码获取成功',
        data: {
          code: 'Ab12Cd',
        },
      };
    },
  },
];

