<template>
  <el-space fill wrap>
    <el-card v-for="i in 10" :key="i" :body-style="{ padding: '0px' }">
      <el-row>
        <el-col :span="10" style="padding: 0px 5px;">
          <h3>default</h3>
          <div>
            <el-text>
              <el-icon><UserFilled /></el-icon>
              suichentree
              <el-icon><Timer /></el-icon>
              2024/03/18
            </el-text>
          </div>
          <div>
            <el-text>
              <el-icon><PriceTag /></el-icon>
              java
              <el-icon><PriceTag /></el-icon>
              java
              
            </el-text>
          </div>
        </el-col>
        <el-col :span="14">
          <el-image
            style="height:150px; width: 100%;"
            src="http://116.62.199.48:9000/weblog/c89cc6b66f0341c0b7854771ae063eac.jpg"
            fit="cover"
          />
        </el-col>
      </el-row>
    </el-card>
    <!--分页-->
    <el-pagination background layout="prev, pager, next, jumper" :total="1000" />
  </el-space>
</template>
<script setup></script>
<style></style>
