import Mock from 'mockjs'
 
const basic_account_type = [
  {
    "remark": null,
    "dictCode": 1280,
    "dictSort": 1,
    "dictLabel": "银行帐号",
    "dictValue": "1",
    "status": "1",
  },
  {
    "remark": null,
    "dictCode": 1281,
    "dictSort": 2,
    "dictLabel": "虚拟子户",
    "dictValue": "2",
    "status": "1",
  }
]

// mock模拟的接口
Mock.mock('/shuyx-user/auth/login', 'POST', function () {
  return {
    "msg": "操作成功",
    "code": 200,
     data: basic_account_type
  }
})