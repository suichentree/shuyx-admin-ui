
import Mock from 'mockjs' //引入mockjs

const userinfo = Mock.mock('/mock/api/shuyx-user/user/pagelist',(req)=>{
	return {
        "code": 200,
        "data": {
            "total": 5,
            "list": [
                {
                    "userId": 1,
                    "orgId": 1,
                    "positionId": null,
                    "userName": "xiaoming",
                    "passWord": "1dsds",
                    "gender": 0,
                    "birthday": "2024-01-08T16:00:00.000+00:00",
                    "avatar": null,
                    "email": "xiaoming2",
                    "phone": "13256565858",
                    "status": 0,
                    "createTime": "2024-01-10T05:18:02.000+00:00",
                    "updateTime": null,
                    "org": {
                        "orgId": 1,
                        "parentId": null,
                        "orgName": "shuyx科技集团",
                        "orgPath": null,
                        "status": 0,
                        "createTime": null,
                        "updateTime": null,
                        "children": null
                    },
                    "position": {
                        "positionId": null,
                        "positionName": null,
                        "positionCode": null,
                        "status": 0,
                        "createTime": null,
                        "updateTime": null
                    },
                    "pageNum": null,
                    "pageSize": null,
                    "beginTime": null,
                    "endTime": null
                },
                {
                    "userId": 2,
                    "orgId": null,
                    "positionId": null,
                    "userName": "xiaoming2",
                    "passWord": "ddddddddd",
                    "gender": 0,
                    "birthday": "2023-12-31T16:00:00.000+00:00",
                    "avatar": null,
                    "email": "18271801652@163.com",
                    "phone": "13256565858",
                    "status": 0,
                    "createTime": "2024-01-07T01:10:03.000+00:00",
                    "updateTime": null,
                    "org": {
                        "orgId": null,
                        "parentId": null,
                        "orgName": null,
                        "orgPath": null,
                        "status": 0,
                        "createTime": null,
                        "updateTime": null,
                        "children": null
                    },
                    "position": {
                        "positionId": null,
                        "positionName": null,
                        "positionCode": null,
                        "status": 0,
                        "createTime": null,
                        "updateTime": null
                    },
                    "pageNum": null,
                    "pageSize": null,
                    "beginTime": null,
                    "endTime": null
                },
                {
                    "userId": 5,
                    "orgId": 5,
                    "positionId": null,
                    "userName": "xiaohei",
                    "passWord": "xiaohei",
                    "gender": 0,
                    "birthday": "2024-01-07T16:00:00.000+00:00",
                    "avatar": null,
                    "email": "18271801652@163.com",
                    "phone": "13256565858",
                    "status": 0,
                    "createTime": "2024-01-07T01:10:10.000+00:00",
                    "updateTime": null,
                    "org": {
                        "orgId": 5,
                        "parentId": null,
                        "orgName": "襄阳分公司",
                        "orgPath": null,
                        "status": 0,
                        "createTime": null,
                        "updateTime": null,
                        "children": null
                    },
                    "position": {
                        "positionId": null,
                        "positionName": null,
                        "positionCode": null,
                        "status": 0,
                        "createTime": null,
                        "updateTime": null
                    },
                    "pageNum": null,
                    "pageSize": null,
                    "beginTime": null,
                    "endTime": null
                },
                {
                    "userId": 13,
                    "orgId": 2,
                    "positionId": 1,
                    "userName": "xiaohong",
                    "passWord": "xiaohong",
                    "gender": 1,
                    "birthday": "2024-01-01T16:00:00.000+00:00",
                    "avatar": null,
                    "email": "xiaohong",
                    "phone": "18271856558",
                    "status": 0,
                    "createTime": "2024-01-14T06:58:47.000+00:00",
                    "updateTime": null,
                    "org": {
                        "orgId": 2,
                        "parentId": null,
                        "orgName": "湖北总公司",
                        "orgPath": null,
                        "status": 0,
                        "createTime": null,
                        "updateTime": null,
                        "children": null
                    },
                    "position": {
                        "positionId": 1,
                        "positionName": "java工程师",
                        "positionCode": null,
                        "status": 0,
                        "createTime": null,
                        "updateTime": null
                    },
                    "pageNum": null,
                    "pageSize": null,
                    "beginTime": null,
                    "endTime": null
                },
                {
                    "userId": 14,
                    "orgId": 1,
                    "positionId": 1,
                    "userName": "xiaoai",
                    "passWord": "xiaoai",
                    "gender": 1,
                    "birthday": "2024-01-01T16:00:00.000+00:00",
                    "avatar": null,
                    "email": "xiaoai",
                    "phone": "152",
                    "status": 0,
                    "createTime": "2024-01-14T11:20:27.000+00:00",
                    "updateTime": null,
                    "org": {
                        "orgId": 1,
                        "parentId": null,
                        "orgName": "shuyx科技集团",
                        "orgPath": null,
                        "status": 0,
                        "createTime": null,
                        "updateTime": null,
                        "children": null
                    },
                    "position": {
                        "positionId": 1,
                        "positionName": "java工程师",
                        "positionCode": null,
                        "status": 0,
                        "createTime": null,
                        "updateTime": null
                    },
                    "pageNum": null,
                    "pageSize": null,
                    "beginTime": null,
                    "endTime": null
                }
            ],
            "pageNum": 1,
            "pageSize": 10,
            "size": 5,
            "startRow": 1,
            "endRow": 5,
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
})

export default {
	userinfo
}


