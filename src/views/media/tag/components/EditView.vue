<template>
  <el-dialog
    v-model="DialogVisible"
    width="30%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <template #header>
      <span>编辑</span>
    </template>
    <el-form :inline="true" :model="form" :rules="rules" ref="formRef">
      <el-row>
        <el-col :span="24">
          <el-form-item label="标签名称" prop="tagName">
            <el-input v-model="form.tagName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="标签分类" prop="tagType">
            <el-select v-model="form.tagType" placeholder="Select" style="width: 200px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span>{{ item.label }}</span>
                <span>{{ item.value }}</span
                >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref,inject,getCurrentInstance } from 'vue'
import APIResources from '@/api/tag.service.js'
import { ElMessage } from 'element-plus'
//this
let { proxy } = getCurrentInstance()

//表单对象
let formRef = ref()

//接收父组件传递的数据
let DialogVisible = inject('EditDialogVisible')
let form = inject('EditForm')

//表单校验规则
let rules = ref({
  tagName: [{ required: true, message: '请输入', trigger: 'blur' }],
  tagType: [{ required: true, message: '请选择', trigger: 'blur' }]
})

//标签类型字典
import { useDictStore } from '@/stores/dictStore.js'
let options = ref([])
options.value = useDictStore().getBykey('media_tag_type')

//点击确定操作
function submit() {
  //表单校验
  proxy.$refs.formRef.validate((valid) => {
    //若校验成功
    if (valid) {
      //调用接口
      APIResources.update(form.value).then((res) => {
        if(res.code == 200){
          ElMessage.success('更新成功')
          cancel()
        }
      })
    }
  })
}

//取消操作
function cancel() {
  formRef.value.resetFields()
  DialogVisible.value = false
}
</script>
<style scoped></style>
