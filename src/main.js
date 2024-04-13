//引入element-plus icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入vue
import { createApp } from 'vue'
//引入主视图App.vue
import App from './App.vue'
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入vue-router
import router from './router'
//引入pinia
import { createPinia } from 'pinia'
//引入pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)  //pinia使用持久化插件

//创建根组件app
const app = createApp(App)
//elementplus图标注册到根组件app中
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')