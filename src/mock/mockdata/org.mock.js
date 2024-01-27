
import Mock from 'mockjs' //引入mockjs

const orginfo = Mock.mock('/mock/api/shuyx-user/org/orgTreelist',(req)=>{
	return {
        "code": 200,
        "data": [
            {
                "orgId": 1,
                "parentId": 0,
                "orgName": "shuyx科技集团",
                "orgPath": "1/",
                "status": 0,
                "createTime": "2024-01-08T05:56:11.000+00:00",
                "updateTime": "2024-01-08T05:56:11.000+00:00",
                "children": [
                    {
                        "orgId": 2,
                        "parentId": 1,
                        "orgName": "湖北总公司",
                        "orgPath": "1/2/",
                        "status": 0,
                        "createTime": "2024-01-08T09:39:10.000+00:00",
                        "updateTime": "2024-01-08T09:39:10.000+00:00",
                        "children": [
                            {
                                "orgId": 4,
                                "parentId": 2,
                                "orgName": "武汉分公司",
                                "orgPath": "1/2/4/",
                                "status": 0,
                                "createTime": "2024-01-09T15:49:05.000+00:00",
                                "updateTime": "2024-01-09T15:49:08.000+00:00",
                                "children": [
                                    {
                                        "orgId": 7,
                                        "parentId": 4,
                                        "orgName": "武汉开发部门",
                                        "orgPath": "1/2/4/7/",
                                        "status": 1,
                                        "createTime": "2024-01-08T17:55:17.000+00:00",
                                        "updateTime": "2024-01-08T17:55:17.000+00:00",
                                        "children": []
                                    },
                                    {
                                        "orgId": 10,
                                        "parentId": 4,
                                        "orgName": "武汉销售部门",
                                        "orgPath": "1/2/4/10/",
                                        "status": 0,
                                        "createTime": "2024-01-10T05:57:24.000+00:00",
                                        "updateTime": "2024-01-10T05:57:24.000+00:00",
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "orgId": 5,
                                "parentId": 2,
                                "orgName": "襄阳分公司",
                                "orgPath": "1/2/5/",
                                "status": 0,
                                "createTime": "2024-01-08T17:46:07.000+00:00",
                                "updateTime": "2024-01-08T17:46:07.000+00:00",
                                "children": []
                            }
                        ]
                    },
                    {
                        "orgId": 3,
                        "parentId": 1,
                        "orgName": "广东总公司",
                        "orgPath": "1/3/",
                        "status": 0,
                        "createTime": "2024-01-08T17:43:38.000+00:00",
                        "updateTime": "2024-01-08T17:43:38.000+00:00",
                        "children": [
                            {
                                "orgId": 9,
                                "parentId": 3,
                                "orgName": "广州分公司",
                                "orgPath": "1/3/9/",
                                "status": 0,
                                "createTime": "2024-01-09T07:06:45.000+00:00",
                                "updateTime": "2024-01-09T07:06:45.000+00:00",
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
	orginfo
}


