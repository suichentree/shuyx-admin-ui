
import Mock from 'mockjs' //引入mockjs

const roleinfo = Mock.mock('/mock/api/shuyx-user/role/roleTreelist',(req)=>{
	return {
        "code": 200,
        "data": [
            {
                "roleId": 1,
                "parentId": 0,
                "roleName": "超级管理员角色",
                "status": 0,
                "createTime": "2024-01-10T08:07:19.000+00:00",
                "updateTime": "2024-01-10T08:07:19.000+00:00",
                "children": [
                    {
                        "roleId": 4,
                        "parentId": 1,
                        "roleName": "湖北省级管理角色",
                        "status": 0,
                        "createTime": "2024-01-10T08:24:01.000+00:00",
                        "updateTime": "2024-01-10T08:24:01.000+00:00",
                        "children": [
                            {
                                "roleId": 5,
                                "parentId": 4,
                                "roleName": "武汉市市级管理角色",
                                "status": 0,
                                "createTime": "2024-01-11T13:58:55.000+00:00",
                                "updateTime": "2024-01-11T13:58:55.000+00:00",
                                "children": [
                                    {
                                        "roleId": 6,
                                        "parentId": 5,
                                        "roleName": "武昌区区级管理角色",
                                        "status": 0,
                                        "createTime": "2024-01-11T14:00:56.000+00:00",
                                        "updateTime": "2024-01-11T14:00:56.000+00:00",
                                        "children": []
                                    },
                                    {
                                        "roleId": 8,
                                        "parentId": 5,
                                        "roleName": "江夏区区级管理角色",
                                        "status": 0,
                                        "createTime": "2024-01-12T04:42:00.000+00:00",
                                        "updateTime": "2024-01-12T04:42:00.000+00:00",
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "roleId": 9,
                                "parentId": 4,
                                "roleName": "襄阳市市级管理角色",
                                "status": 0,
                                "createTime": "2024-01-14T07:52:38.000+00:00",
                                "updateTime": "2024-01-14T07:52:38.000+00:00",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ],
        "message": "请求成功"
    }
})

export default {
	roleinfo
}


