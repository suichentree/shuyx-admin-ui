export default [
  //分页查询
  {
    url: '/api/shuyx-user/dict/pagelist',
    method: 'POST',
    response: () => {
      // 模拟响应数据
      return{
        code: 200,
        data: {
          records: [
            {
              dictId: 1,
              dictName: "用户性别",
              dictCode: "user_gender",
              dictLabel: "男",
              dictValue: "0",
              remark: "111222",
              createTime: "2024-04-02T00:13:30.000+08:00",
              updateTime: "2024-04-02T00:22:54.000+08:00"
            },
            {
              dictId: 2,
              dictName: "用户性别",
              dictCode: "user_gender",
              dictLabel: "女",
              dictValue: "1",
              remark: "1123",
              createTime: "2024-04-02T00:27:46.000+08:00",
              updateTime: "2024-04-02T00:27:46.000+08:00"
            },
            {
              dictId: 3,
              dictName: "用户状态",
              dictCode: "user_status",
              dictLabel: "正常",
              dictValue: "0",
              remark: "0为正常状态",
              createTime: "2024-04-02T00:30:19.000+08:00",
              updateTime: "2024-04-02T00:30:19.000+08:00"
            },
            {
              dictId: 4,
              dictName: "用户状态",
              dictCode: "user_status",
              dictLabel: "禁用",
              dictValue: "1",
              remark: "1为禁用",
              createTime: "2024-04-02T00:30:53.000+08:00",
              updateTime: "2024-04-02T00:30:53.000+08:00"
            },
            {
              dictId: 6,
              dictName: "菜单状态",
              dictCode: "menu_status",
              dictLabel: "正常",
              dictValue: "0",
              remark: null,
              createTime: "2024-04-03T10:03:10.000+08:00",
              updateTime: "2024-04-03T10:03:10.000+08:00"
            },
            {
              dictId: 7,
              dictName: "菜单状态",
              dictCode: "menu_status",
              dictLabel: "禁用",
              dictValue: "1",
              remark: null,
              createTime: "2024-04-03T10:03:32.000+08:00",
              updateTime: "2024-04-03T10:03:32.000+08:00"
            },
            {
              dictId: 8,
              dictName: "媒体标签类型",
              dictCode: "media_tag_type",
              dictLabel: "媒体风格",
              dictValue: "MediaStyle",
              remark: "是指媒体风格对应的标签",
              createTime: "2024-04-09T22:23:00.000+08:00",
              updateTime: "2024-04-14T13:01:41.000+08:00"
            },
            {
              dictId: 9,
              dictName: "媒体标签类型",
              dictCode: "media_tag_type",
              dictLabel: "媒体上映时间",
              dictValue: "MediaTime",
              remark: null,
              createTime: "2024-04-09T22:23:52.000+08:00",
              updateTime: "2024-04-14T12:54:05.000+08:00"
            },
            {
              dictId: 10,
              dictName: "媒体标签类型",
              dictCode: "media_tag_type",
              dictLabel: "媒体上映地区",
              dictValue: "MediaRegion",
              remark: null,
              createTime: "2024-04-09T22:24:35.000+08:00",
              updateTime: "2024-04-14T12:54:08.000+08:00"
            },
            {
              dictId: 11,
              dictName: "媒体类型",
              dictCode: "media_type",
              dictLabel: "电影",
              dictValue: "Movie",
              remark: null,
              createTime: "2024-04-09T23:32:04.000+08:00",
              updateTime: "2024-04-09T23:32:04.000+08:00"
            }
          ],
          total: 14,
          size: 10,
          current: 1,
          orders: [],
          optimizeCountSql: true,
          searchCount: true,
          countId: null,
          maxLimit: null,
          pages: 2
        },
        message: "请求成功"
      }
    }
  },
  // 条件查询
  {
    url: '/api/shuyx-user/dict/findBy',
    method: 'POST', 
    response: () => {
      return{
        code: 200,
        data: [
          {
            dictId: 1,
            dictName: "用户性别",
            dictCode: "user_gender",
            dictLabel: "男",
            dictValue: "0",
            remark: "111222",
            createTime: "2024-04-02T00:13:30.000+08:00",
            updateTime: "2024-04-02T00:22:54.000+08:00"
          },
          {
            dictId: 2,
            dictName: "用户性别",
            dictCode: "user_gender",
            dictLabel: "女",
            dictValue: "1",
            remark: "1123",
            createTime: "2024-04-02T00:27:46.000+08:00",
            updateTime: "2024-04-02T00:27:46.000+08:00"
          },
          {
            dictId: 3,
            dictName: "用户状态",
            dictCode: "user_status",
            dictLabel: "正常",
            dictValue: "0",
            remark: "0为正常状态",
            createTime: "2024-04-02T00:30:19.000+08:00",
            updateTime: "2024-04-02T00:30:19.000+08:00"
          },
          {
            dictId: 4,
            dictName: "用户状态",
            dictCode: "user_status",
            dictLabel: "禁用",
            dictValue: "1",
            remark: "1为禁用",
            createTime: "2024-04-02T00:30:53.000+08:00",
            updateTime: "2024-04-02T00:30:53.000+08:00"
          },
          {
            dictId: 6,
            dictName: "菜单状态",
            dictCode: "menu_status",
            dictLabel: "正常",
            dictValue: "0",
            remark: null,
            createTime: "2024-04-03T10:03:10.000+08:00",
            updateTime: "2024-04-03T10:03:10.000+08:00"
          },
          {
            dictId: 7,
            dictName: "菜单状态",
            dictCode: "menu_status",
            dictLabel: "禁用",
            dictValue: "1",
            remark: null,
            createTime: "2024-04-03T10:03:32.000+08:00",
            updateTime: "2024-04-03T10:03:32.000+08:00"
          },
          {
            dictId: 8,
            dictName: "媒体标签类型",
            dictCode: "media_tag_type",
            dictLabel: "媒体风格",
            dictValue: "MediaStyle",
            remark: "是指媒体风格对应的标签",
            createTime: "2024-04-09T22:23:00.000+08:00",
            updateTime: "2024-04-14T13:01:41.000+08:00"
          },
          {
            dictId: 9,
            dictName: "媒体标签类型",
            dictCode: "media_tag_type",
            dictLabel: "媒体上映时间",
            dictValue: "MediaTime",
            remark: null,
            createTime: "2024-04-09T22:23:52.000+08:00",
            updateTime: "2024-04-14T12:54:05.000+08:00"
          },
          {
            dictId: 10,
            dictName: "媒体标签类型",
            dictCode: "media_tag_type",
            dictLabel: "媒体上映地区",
            dictValue: "MediaRegion",
            remark: null,
            createTime: "2024-04-09T22:24:35.000+08:00",
            updateTime: "2024-04-14T12:54:08.000+08:00"
          },
          {
            dictId: 11,
            dictName: "媒体类型",
            dictCode: "media_type",
            dictLabel: "电影",
            dictValue: "Movie",
            remark: null,
            createTime: "2024-04-09T23:32:04.000+08:00",
            updateTime: "2024-04-09T23:32:04.000+08:00"
          },
          {
            dictId: 12,
            dictName: "媒体类型",
            dictCode: "media_type",
            dictLabel: "动漫",
            dictValue: "Anime",
            remark: null,
            createTime: "2024-04-09T23:32:52.000+08:00",
            updateTime: "2024-04-09T23:32:52.000+08:00"
          },
          {
            dictId: 13,
            dictName: "媒体类型",
            dictCode: "media_type",
            dictLabel: "电视剧",
            dictValue: "TV",
            remark: null,
            createTime: "2024-04-09T23:33:20.000+08:00",
            updateTime: "2024-04-09T23:33:20.000+08:00"
          },
          {
            dictId: 14,
            dictName: "角色状态",
            dictCode: "role_status",
            dictLabel: "正常",
            dictValue: "0",
            remark: null,
            createTime: "2024-04-10T00:18:43.000+08:00",
            updateTime: "2024-04-10T00:18:43.000+08:00"
          },
          {
            dictId: 15,
            dictName: "角色状态",
            dictCode: "role_status",
            dictLabel: "禁用",
            dictValue: "1",
            remark: null,
            createTime: "2024-04-10T00:18:55.000+08:00",
            updateTime: "2024-04-10T00:18:55.000+08:00"
          }
        ],
        message: "请求成功"
      }
    },
  },
];

