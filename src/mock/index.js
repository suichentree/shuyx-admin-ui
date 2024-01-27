import Mock from 'mockjs' //引入mockjs
import loginInfo from "./mockdata/login.mock"
import userinfo from "./mockdata/user.mock"
import roleinfo from "./mockdata/role.mock"
import orginfo from "./mockdata/org.mock"
import positioninfo from "./mockdata/position.mock"
import menuinfo from "./mockdata/menu.mock"

//mockjs全局设置
Mock.setup({
	timeout: 200 - 400 //设置延时200-400ms
})

export default Mock