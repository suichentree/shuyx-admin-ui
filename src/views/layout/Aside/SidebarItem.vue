<template>
  <!--路由是否显示。此处最外层标签不要用div，用div会导致文字无法完全隐藏-->
  <template v-if="!route.hidden">
    <!--若有子路由-->
    <template v-if="hasOneShowingChild(route)">
      <el-sub-menu :index="route.path" teleported>
        <template #title>
          <el-icon ><component :is="route.icon"></component></el-icon>
          <span>{{ route.name }}</span>
        </template>
        <!--嵌套使用 SidebarItem组件-->
        <sidebar-item
          v-for="child in route.children"
          :key="child.path"
          :item="child"
        />
      </el-sub-menu>
    </template>
    <!--若无子路由-->
    <template v-else>
      <el-menu-item :index="route.path" @click="clickMenuItem(route)">
        <template #title>
          <el-icon ><component :is="route.icon"></component></el-icon>
          <span>{{ route.name }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup>
import {ref} from "vue"
import SidebarItem from './SidebarItem.vue'
//导入tagViewStore，获取tagview菜单信息
import { useTagViewStore } from '@/stores/tagViewStore'

const props = defineProps({
  item: Object
})
const route = ref(props.item)

//判断当前路由是否有子路由
//有子路由返回true,无子路由返回false
function hasOneShowingChild(route) {
  if(route.children == undefined){
    return false
  }else{
    if(route.children.length == 0){
      return false
    }
    return true
  }
}

//点击菜单，将菜单信息添加到tagview中
function clickMenuItem(obj) {
  useTagViewStore().addTagViewMenuInfo(obj)
}

</script>
