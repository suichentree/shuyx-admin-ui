/**
 * 作用：新建菜单的时候，需要提供菜单图标。
 */

//引入element-plus icon，获取element-plus内置的所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//icon数组
let icons = []
//把图标的名称都添加到icon数组中
for (const [key] of Object.entries(ElementPlusIconsVue)) {
    let p = {
        value: key,
        label: key
    }
    icons.push(p);
}
export default icons
