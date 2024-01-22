/**
 * 作用：新建菜单的时候，需要提供菜单页面路径。
 */

//扫描view目录及其子目录中的xxx.vue文件。
const modules = import.meta.glob('@/views/**/*.vue')
//菜单页面数组
const menuPageArray = []
//遍历modules，将每个vue文件的路径添加到菜单页面数组中。
for (let path in modules) {
    let obj = {
        value: path,
        label: path
    }
    menuPageArray.push(obj)
}
//菜单页面数组
export default menuPageArray
