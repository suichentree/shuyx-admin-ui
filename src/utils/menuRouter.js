/**
 * menuRouter.js文件主要用于将后台传过来的用户菜单信息，转换为可以被vue-router使用的动态路由信息。
 */

//导入Layout视图组件
const LayoutView = () => import("@/layouts/LayoutView.vue");

//全局获取views目录中所有的.vue文件信息
const modules = import.meta.glob('@/views/**/*.vue')

// loadView方法：用于把数据库中存储的菜单页面信息转换为实际的.vue文件信息
// 例如 数据库中某个菜单A的页面信息为 /src/views/system/user/UserView.vue 。
// 步骤如下：
// 0. 菜单A的页面信息作为参数传入到loadView方法中。
// 1. 然后开始遍历 modules对象（即遍历views目录中所有的.vue文件信息对象）
// 2. 在遍历过程中，会把/src/views/system/user/UserView.vue 与 所有的.vue文件进行匹配。
// 3. 如果匹配上了，说明找到了菜单A的对应.vue文件。并将菜单A对应的.vue文件信息返回。
// 注意：这里需要提前规定。在数据库中的菜单页面信息必须是该页面在前端工程中的具体路径。例如/src/views/system/user/UserView.vue
const loadView = (view) => {
  let res = undefined;
  for (let path in modules) {
    if (path === view) {
      res = modules[path];
    }
  }
  return res;
}

// 构建动态路由数组。用于把后台传过来的用户菜单信息，转换为可以被vue-router使用的路由信息。
function buildRouter(userMenuInfo){
    //路由数组
    let router = []
    //遍历后台传过来的用户菜单信息
    userMenuInfo.forEach(menuObj => {
      //新建一个router元素
      let routerObj = {
        name: undefined,  //路由名称
        path: undefined,  //路由路径
        component: undefined, //路由对应的组件
        icon: undefined,  //图标
        isLink: false,   //是否外链
        hidden: false,    //路由是否隐藏
        children:[]       //路由的子路由数组
      }
      routerObj.name = menuObj.menuName
      routerObj.path = menuObj.menuPath
      routerObj.icon = menuObj.icon
      //菜单默认是不隐藏的。如果菜单可见为1，表示该菜单不可以在侧边栏展示，需要隐藏。
      if(menuObj.visible == 1){
        routerObj.hidden = true
      }
      //如果菜单类型为0（目录），则该router元素中的component为LayoutView
      //如果菜单类型不为0（非目录），则该router元素中的component为菜单页面匹配的.vue文件信息
      if(menuObj.menuType == 0){
        routerObj.component = LayoutView
      }else{
        routerObj.component = loadView(menuObj.menuPage)
      }
      //isLink属性默认为false。如果菜单是外链（为1）,设置isLink属性为true。
      if(menuObj.isLink == 1){
        routerObj.isLink = true
      }
      //如果菜单有子菜单，递归访问buildRouter方法，传入子菜单对象
      if(menuObj.children && menuObj.children.length){
        routerObj.children = buildRouter(menuObj.children)
      }
      //如果菜单没有子菜单,就把路由元素添加到路由数组中
      router.push(routerObj)
    })
    //最后返回路由数组，这个路由数组就是可以被vue-router使用的路由信息
    return router
}

//导出
export default buildRouter