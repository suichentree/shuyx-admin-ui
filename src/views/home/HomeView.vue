<template>
  <el-row :gutter="20" style="padding: 10px 0px">
    <el-col :span="6">
      <el-card>
        <el-statistic title="总用户数" :value="268500">
          <template #suffix>
            <el-icon>
              <ChatLineRound />
            </el-icon>
          </template>
        </el-statistic>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <el-statistic title="总菜单数" :value="268500">
          <template #suffix>
            <el-icon>
              <Male  />
            </el-icon>
          </template>
        </el-statistic>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <el-statistic title="总职位数" :value="268500">
          <template #suffix>
            <el-icon>
              <ChatLineRound />
            </el-icon>
          </template>
        </el-statistic>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <el-statistic title="总机构数" :value="268500">
          <template #suffix>
            <el-icon>
              <ChatLineRound />
            </el-icon>
          </template>
        </el-statistic>
      </el-card>
    </el-col>
  </el-row>
  <div>
    <el-card shadow="never">
      <h2>SHUYX ADMIN UI</h2>
      <p>
        这个UI框架主要是为了提高自己前端的技术能力而搭建的。以后要写个人项目的话,这个搭建好的前端工程也可以拿来复用。
      </p>
      <p>这个工程是纯前端的，不需要请求后端接口数据。这样可以方便后续复用这个前端工程。</p>
      <p>前端技术栈：Vue3 + element-plus + javascript</p>
      <template #footer>当前版本: v1.0.0</template>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ChatLineRound, Male } from '@element-plus/icons-vue'
</script>
<style scoped>
.el-statistic {
  text-align: center;
}
</style>
