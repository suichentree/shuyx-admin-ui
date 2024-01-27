
import Mock from 'mockjs' //引入mockjs

const positioninfo = Mock.mock('/mock/api/shuyx-user/position/pagelist',(req)=>{
	return {
        "code": 200,
        "data": {
            "records": [
                {
                    "positionId": 1,
                    "positionName": "java工程师",
                    "positionCode": "javaEng",
                    "status": 0,
                    "createTime": "2024-01-09T15:31:02.000+00:00",
                    "updateTime": "2024-01-09T15:31:02.000+00:00"
                },
                {
                    "positionId": 3,
                    "positionName": "项目经理",
                    "positionCode": "PM",
                    "status": 0,
                    "createTime": "2024-01-09T15:32:50.000+00:00",
                    "updateTime": "2024-01-09T15:32:50.000+00:00"
                },
                {
                    "positionId": 4,
                    "positionName": "老板",
                    "positionCode": "BOSS",
                    "status": 0,
                    "createTime": "2024-01-09T15:42:40.000+00:00",
                    "updateTime": "2024-01-09T15:42:40.000+00:00"
                },
                {
                    "positionId": 5,
                    "positionName": "销售经理",
                    "positionCode": "SM",
                    "status": 0,
                    "createTime": "2024-01-09T15:43:25.000+00:00",
                    "updateTime": "2024-01-09T15:43:25.000+00:00"
                },
                {
                    "positionId": 6,
                    "positionName": "人事经理",
                    "positionCode": "HM",
                    "status": 0,
                    "createTime": "2024-01-09T15:45:37.000+00:00",
                    "updateTime": "2024-01-09T15:45:37.000+00:00"
                }
            ],
            "total": 5,
            "size": 10,
            "current": 1,
            "orders": [],
            "optimizeCountSql": true,
            "searchCount": true,
            "countId": null,
            "maxLimit": null,
            "pages": 1
        },
        "message": "请求成功"
    }
})

export default {
	positioninfo
}


