/**
 * 在request.js 对 axios 进行封装。
 * */ 
import axios from 'axios';		//引入axios
import { ElNotification, ElMessageBox } from 'element-plus'; //引入element-plus的消息通知

// 创建axios实例
const axiosService = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: import.meta.env.VITE_APP_API_BASEURL,
    // 超时时间
    timeout: 10000
})


// axios request 拦截器
axiosService.interceptors.request.use(
	//请求成功的时候
	(config) => {
		//将cookie中的TOKEN内容加入到请求头Authorization中
		let token = document.cookie.match(new RegExp("(^| )TOKEN=([^;]*)(;|$)"))
		if(token){
			config.headers['Authorization'] = "Bearer " + token
		}
		Object.assign(config.headers)
		return config;
	},
	//请求失败的时候
	(error) => {
		return Promise.reject(error);
	}
);

// axios response 拦截器
axiosService.interceptors.response.use(
	//当响应成功的时候
	(response) => {
		//返回响应内容中的data数据
		return response.data;
	},
	//当响应失败的时候，根据不同的失败状态，进行不同的动作
	(error) => {
		if (error.response) {
			if (error.response.status == 404) {
				ElNotification.error({
					title: '请求错误',
					message: "Status:404，正在请求不存在的服务器记录！"
				});
			} else if (error.response.status == 500) {
				ElNotification.error({
					title: '请求错误',
					message: error.response.data.message || "Status:500，服务器发生错误！"
				});
			} else if (error.response.status == 401) {
				ElMessageBox.confirm('当前用户已被登出或无权限访问当前资源，请尝试重新登录后再操作。', '无权限访问', {
					type: 'error',
					closeOnClickModal: false,
					center: true,
					confirmButtonText: '重新登录'
				});
			} else if (error.response.status == 503) {
				ElNotification.error({
					title: '服务不可用。',
					message: error.response.data.message || "Status:503，服务不可用。！"
				});
			} else {
				ElNotification.error({
					title: '请求错误',
					message: error.message || `Response Status:${error.response.status}，未知错误！`
				});
			}
		} else {
			ElNotification.error({
				title: '请求错误',
				message: "请求服务器无响应！"
			});
		}
		return Promise.reject(error.response);
	}
);

export default axiosService;
