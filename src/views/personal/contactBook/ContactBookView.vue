<template>
    <el-alert 
      title="通讯录中只显示相同组织机构的成员" 
      type="warning" 
      :closable="false" 
      show-icon
    />

    <el-space direction="vertical" :fill="true" style="width: 100%;">
      <!-- 查询条件卡片 -->
      <el-card  shadow="always"  :body-style="{ padding: '0px' }" >
        <div class="card-div">
          <el-row justify="space-between">
            <el-col :span="2"><el-tag type="info">查询条件</el-tag></el-col>
            <el-col :span="6" style="text-align: right">
              <el-button 
                type="primary" 
                @click="search"
              >搜索</el-button>
              <el-button 
                @click="resetQuery"
              >重置</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="card-div">
            <el-form :inline="true" :model="queryform" ref="queryformRef">
              <el-form-item label="用户名称" prop="userName">
                <el-input 
                  v-model="queryform.userName" 
                  placeholder="请输入用户名称" 
                  clearable 
                />
              </el-form-item>
            </el-form>
        </div>
      </el-card>
      <!-- 查询结果卡片 -->
      <el-card shadow="always" :body-style="{ padding: '0px' }" >
        <div class="card-div">
              <el-row justify="space-between">
                <el-col :span="2"><el-tag type="info">查询结果</el-tag></el-col>
                <el-col :span="6" style="text-align: right">
                  <el-button 
                    type="primary" 
                    @click="get()"
                  >获取选中行</el-button>
                </el-col>
              </el-row>
        </div>
        <div class="card-div">
              <!-- 数据表格 -->
                <el-table 
                  :data="tableData" 
                  border 
                  ref="tableRef"
                  :header-cell-style="{ background: '#f8f9fa', color: '#303133' }"
                >
                  <el-table-column type="selection"/>
                  <el-table-column label="用户名称" key="userName" prop="userName" show-overflow-tooltip />
                  <el-table-column label="手机号码" key="phone" prop="phone" show-overflow-tooltip />
                  <el-table-column label="邮箱" key="email" prop="email" show-overflow-tooltip />
                  <el-table-column label="所属组织机构" key="orgName" prop="org.orgName" show-overflow-tooltip />
                  <el-table-column label="职位" key="positionName" prop="position.positionName" show-overflow-tooltip />
                </el-table>
        </div>
        <div class="card-div">
              <!-- 表格分页 -->
              <el-pagination
                @change="changePageData"
                v-model:current-page="pageData.pageNum"
                v-model:page-size="pageData.pageSize"
                :page-sizes="pageData.pageSizes"
                :background="true"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageData.total"
              />
        </div>
      </el-card>
    </el-space>
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
/* 按钮悬停动画 */
.el-button:not(.is-disabled):hover {
  transform: translateY(-1px);
  transition: transform 0.1s ease;
}

/* 卡片内边距样式 */
.card-div {
  padding: 10px; 
}
</style>
