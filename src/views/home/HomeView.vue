<script setup></script>

<template>
  <el-row>
    <el-col :span="6">
      <el-statistic title="注册用户" :value="562" >
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <ChatLineRound />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row>
  <div>
    <el-card shadow="never"> 
      <h2>SHUYX ADMIN UI </h2>
      <p>这个UI框架主要是为了提高自己前端的技术能力而搭建的。以后要写个人项目的话,这个搭建好的前端工程也可以拿来复用。</p>
      <p>这个工程是纯前端的，不需要请求后端接口数据。这样可以方便后续复用这个前端工程。</p>
      <p>前端技术栈：Vue3 + element-plus + javascript</p>
      <template #footer>当前版本: v1.0.0</template>
    </el-card>
  </div>
</template>
<script setup>
</script>
<style scoped>
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

