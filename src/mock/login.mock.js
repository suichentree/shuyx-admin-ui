export default [
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
];

