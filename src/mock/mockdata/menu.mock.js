
import Mock from 'mockjs' //引入mockjs

const menuinfo = Mock.mock('/mock/api/shuyx-user/menu/menuTreelist',(req)=>{
	return {
        "code": 200,
        "data": [
            {
                "menuId": 2,
                "menuName": "系统管理",
                "parentId": 0,
                "menuPath": "/system",
                "menuPage": null,
                "menuType": 0,
                "status": 0,
                "icon": "Setting",
                "createTime": "2024-01-09T17:21:14.000+00:00",
                "updateTime": "2024-01-09T17:21:19.000+00:00",
                "children": [
                    {
                        "menuId": 3,
                        "menuName": "用户管理",
                        "parentId": 2,
                        "menuPath": "/system/user",
                        "menuPage": "/src/views/system/user/UserView.vue",
                        "menuType": 1,
                        "status": 0,
                        "icon": "UserFilled",
                        "createTime": "2024-01-09T17:42:18.000+00:00",
                        "updateTime": "2024-01-09T17:42:18.000+00:00",
                        "children": []
                    },
                    {
                        "menuId": 4,
                        "menuName": "菜单管理",
                        "parentId": 2,
                        "menuPath": "/system/menu",
                        "menuPage": "/src/views/system/menu/MenuView.vue",
                        "menuType": 1,
                        "status": 0,
                        "icon": "Collection",
                        "createTime": "2024-01-10T05:59:05.000+00:00",
                        "updateTime": "2024-01-10T05:59:05.000+00:00",
                        "children": []
                    },
                    {
                        "menuId": 8,
                        "menuName": "组织机构管理",
                        "parentId": 2,
                        "menuPath": "/system/org",
                        "menuPage": "/src/views/system/org/OrgView.vue",
                        "menuType": 1,
                        "status": 0,
                        "icon": "OfficeBuilding",
                        "createTime": "2024-01-15T08:52:54.000+00:00",
                        "updateTime": "2024-01-15T08:52:54.000+00:00",
                        "children": []
                    },
                    {
                        "menuId": 9,
                        "menuName": "职位管理",
                        "parentId": 2,
                        "menuPath": "/system/position",
                        "menuPage": "/src/views/system/position/PositionView.vue",
                        "menuType": 1,
                        "status": 0,
                        "icon": "Avatar",
                        "createTime": "2024-01-15T08:53:34.000+00:00",
                        "updateTime": "2024-01-15T08:53:34.000+00:00",
                        "children": []
                    },
                    {
                        "menuId": 10,
                        "menuName": "角色管理",
                        "parentId": 2,
                        "menuPath": "/system/role",
                        "menuPage": "/src/views/system/role/RoleView.vue",
                        "menuType": 1,
                        "status": 0,
                        "icon": "Avatar",
                        "createTime": "2024-01-15T08:54:21.000+00:00",
                        "updateTime": "2024-01-15T08:54:21.000+00:00",
                        "children": []
                    }
                ]
            }
        ],
        "message": "请求成功"
    }
})

export default {
	menuinfo
}




