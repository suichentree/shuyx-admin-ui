<template>
    <el-alert 
      title="通讯录中只显示相同组织机构的成员" 
      type="warning" 
      :closable="false" 
      show-icon
      style="margin-top: 16px; border-radius: 6px; padding: 12px 16px;"
    />

    <!-- 查询条件卡片 -->
    <el-card 
      shadow="always" 
      :body-style="{ padding: '16px 20px' }" 
      style="margin-top: 16px; border-radius: 8px;"
    >
      <el-row justify="space-between" style="margin-bottom: 12px;">
        <el-col :span="12"><el-tag type="info" effect="light">查询条件</el-tag></el-col>
        <el-col :span="12" style="text-align: right">
          <el-button 
            type="primary" 
            @click="search"
            style="padding: 8px 16px; border-radius: 6px;"
          >搜索</el-button>
          <el-button 
            @click="resetQuery"
            style="padding: 8px 16px; border-radius: 6px; margin-left: 8px;"
          >重置</el-button>
        </el-col>
      </el-row>
      <el-form :inline="true" :model="queryform" ref="queryformRef">
        <el-form-item label="用户名称" prop="userName">
          <el-input 
            v-model="queryform.userName" 
            placeholder="请输入用户名称" 
            clearable 
            style="border-radius: 6px; width: 240px;"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 查询结果卡片 -->
    <el-card 
      shadow="always" 
      :body-style="{ padding: '16px 20px' }" 
      style="margin-top: 16px; border-radius: 8px;"
    >
      <el-row justify="space-between" style="margin-bottom: 12px;">
        <el-col :span="12"><el-tag type="info" effect="light">查询结果</el-tag></el-col>
        <el-col :span="12" style="text-align: right">
          <el-button 
            type="primary" 
            @click="get()"
            style="padding: 8px 16px; border-radius: 6px;"
          >获取选中行</el-button>
        </el-col>
      </el-row>

      <!-- 数据表格 -->
      <el-table 
        :data="tableData" 
        border 
        ref="tableRef"
        style="margin: 12px 0; border-radius: 6px; overflow: hidden;"
        :header-cell-style="{ background: '#f8f9fa', color: '#303133' }"
        :row-style="{ height: '48px' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="用户名称" key="userName" prop="userName" show-overflow-tooltip />
        <el-table-column label="手机号码" key="phone" prop="phone" show-overflow-tooltip />
        <el-table-column label="邮箱" key="email" prop="email" show-overflow-tooltip />
        <el-table-column label="所属组织机构" key="orgName" prop="org.orgName" show-overflow-tooltip />
        <el-table-column label="职位" key="positionName" prop="position.positionName" show-overflow-tooltip />
      </el-table>

      <!-- 表格分页 -->
      <el-pagination
        @change="changePageData"
        v-model:current-page="pageData.pageNum"
        v-model:page-size="pageData.pageSize"
        :page-sizes="pageData.pageSizes"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
        style="margin-top: 16px;"
      />
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserAPIResources from '@/api/user.service.js'
import { useUserStore } from '@/stores/userStore';

//用户状态字典
import { useDictStore } from '@/stores/dictStore.js'
let userStatusDict = ref([])
userStatusDict.value = useDictStore().getBykey('user_status')

// onMounted生命周期
onMounted(() => {
  search()
})

//搜索
let queryformRef = ref()
let queryform = ref({
  userName: undefined,
  orgId:useUserStore().userInfo.orgId  //获取当前登录用户的组织机构id
})
let tableData = ref([])
function search() {
  //调用分页查询接口
  UserAPIResources.pagelist(queryform.value, pageData.value).then((res) => {
    tableData.value = res.data.list
    pageData.value.total = res.data.total
  })
}

let tableRef = ref()
function get(){
  console.log(tableRef.value.getSelectionRows());
}


//分页配置数据
let pageData = ref({
  pageNum: 1,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  total: 0
})

//重置按钮操作
function resetQuery() {
  queryformRef.value.resetFields()
}


//分页数据变化
function changePageData() {
  search()
}

</script>

<style scoped>
/* 输入框聚焦效果 */
.el-input:focus, .el-input:hover {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64,158,255,0.1);
}

/* 按钮悬停动画 */
.el-button:not(.is-disabled):hover {
  transform: translateY(-1px);
  transition: transform 0.1s ease;
}

/* 表格行悬停样式 */
.el-table__body tr:hover > td {
  background-color: #f8f9fa !important;
}

/* 标签样式调整 */
.el-tag {
  font-weight: 500;
  padding: 4px 8px;
}
</style>
