<template>
  <el-dialog
    v-model="DialogVisible"
    width="50%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <template #header>
      <span>新增</span>
    </template>
    <el-form :model="addform" :rules="rules" ref="addformRef">
          <el-form-item label="上级菜单" prop="parentId">
            <el-tree-select
              @change="toChange"
              ref="treeSelectRef"
              :props="{ value: 'menuId', label: 'menuName', children: 'children' }"
              v-model="addform.parentId"
              :data="menuTreeList"
              check-strictly
              :render-after-expand="false"
              placeholder="请选择"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item v-if="addform.parentId != undefined">
            <el-alert type="success" :closable="false">
              <template #title>
                上级菜单路径: {{ parentNode.menuPath }}
              </template>
            </el-alert>
          </el-form-item>
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="addform.menuName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="addform.menuType">
              <el-radio :value="0">目录</el-radio>
              <el-radio :value="1">菜单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单路径" prop="menuPath">
            <template #label>
              <span>
                  <el-tooltip placement="top">
                    <template #content>访问菜单的路由地址。<br /> 例如: '/system/user' 就是访问系统管理下的用户管理菜单的路由地址。<br /> 注意：如果该菜单有上级菜单，那么该菜单的菜单路径的前缀必须是上级菜单的菜单路径。</template>
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  菜单路径
              </span>
            </template>
            <el-input v-model="addform.menuPath" placeholder="请输入" clearable/>
          </el-form-item>
          <el-form-item label="菜单页面" prop="menuPage"  v-if="addform.menuType == 1">
            <template #label>
              <span>
                  <el-tooltip placement="top">
                    <template #content>该菜单在前端工程中的具体页面路径。<br /> 例如 /src/views/system/user/UserView.vue 是用户管理菜单在前端工程中的页面文件路径。</template>
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  菜单页面
              </span>
            </template>
            <el-select v-model="addform.menuPage" placeholder="请选择" clearable style="width: 200px">
              <el-option
                v-for="obj in PageOptions"
                :key="obj.value"
                :label="obj.label"
                :value="obj.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="菜单图标" prop="icon">
            <el-select v-model="addform.icon" placeholder="请选择" clearable style="width: 200px">
              <el-option v-for="item in iconList" :key="item.value" :label="item.label" :value="item.value">
                <el-icon ><component :is="item.value"></component></el-icon>
                <span>{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否外链" prop="isLink">
            <template #label>
              <span>
                  <el-tooltip placement="top">
                    <template #content>外链是指外部页面的链接地址。点击外链菜单会打开外部页面。<br /> 注意：若菜单是外链，那么菜单路径必须是以http://开头 </template>
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  是否外链
              </span>
            </template>
            <el-radio-group v-model="addform.isLink">
              <el-radio value="0">不是</el-radio>
              <el-radio value="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单侧边栏" prop="visible">
            <el-radio-group v-model="addform.visible">
              <el-radio :value="0">可见</el-radio>
              <el-radio :value="1">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单状态" prop="status">
            <el-radio-group v-model="addform.status">
              <el-radio :value="0">正常</el-radio>
              <el-radio :value="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button type="primary" @click="add">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, inject, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import APIResources from '@/api/menu.service.js'

//菜单页面数组
import menuPageArray from '@/utils/menuPage'
const PageOptions = ref(menuPageArray)

//菜单图标相关
import { QuestionFilled } from '@element-plus/icons-vue'
import icons from "@/utils/iconsArray"
const iconList = ref(icons)

//this
const { proxy } = getCurrentInstance()

//接收父组件传递的数据
const DialogVisible = inject('AddDialogVisible')
const menuTreeList = inject('menuTreeList')

//表单校验规则
const rules = ref({
  parentId: [{ required: true, message: '请选择', trigger: 'blur' }],
  menuName: [{ required: true, message: '请输入', trigger: 'blur' }],
  menuPath: [{ required: true, message: '请输入', trigger: 'blur' }],
  menuType: [{ required: true, message: '请选择', trigger: 'blur' }],
  icon: [{ required: true, message: '请输入', trigger: 'blur' }],
  visible: [{ required: true, message: '请选择', trigger: 'blur' }],
  isLink: [{ required: true, message: '请选择', trigger: 'blur' }],
  status: [{ required: true, message: '请选择', trigger: 'blur' }]
})

//表单对象
const addformRef = ref()
const addform = ref({
  menuName: undefined,
  parentId: undefined,
  menuPath: undefined,
  menuPage: undefined,
  menuType: 0,
  icon: undefined,
  isLink: 0,
  visible: 0,
  status: 0
})

let treeSelectRef = ref()
let parentNode = ref({}) 
function toChange(){
  //获取上级菜单信息
  parentNode.value = treeSelectRef.value.getCurrentNode()
}

//添加
function add() {
  //表单校验
  proxy.$refs.addformRef.validate((valid) => {
    //若校验成功
    if (valid) {
      //调用接口
      APIResources.addMenu(addform.value).then((res) => {
        if (res.code == 200) {
          ElMessage.success('添加成功')
          cancel()
        } else {
          ElMessage.error('Code: ' + res.code + ',Message: ' + res.message)
        }
      })
    }
  })
}

//取消
function cancel() {
  addformRef.value.resetFields()
  DialogVisible.value = false
}
</script>
<style scoped>
</style>
