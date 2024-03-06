<template>
  <el-row :gutter="20">
    <el-col :span="8">
        <el-image  style="height: 400px;width: 100%;"
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" fit="fill" />
    </el-col>
    <el-col :span="16">
      <el-descriptions title="无间道" :column="1" border>
        <el-descriptions-item label="导演">kooriookami</el-descriptions-item>
        <el-descriptions-item label="主演">大鹏 / 白客 / 庄达菲 / 王迅 / 孙艺洲 / 李乃文 / 欧阳奋强 / 童漠男 / 大木 / 晃晃 / 衣云鹤 / 杨磊 / 孔连顺 / 李栋 / 王学东 / 展开...</el-descriptions-item>
        <el-descriptions-item label="类型">
          剧情 / 喜剧 / 人性
        </el-descriptions-item>
        <el-descriptions-item label="地区">大陆</el-descriptions-item>
        <el-descriptions-item label="上映时间">2023-12-29(中国大陆)</el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
  <el-row style="padding:10px 0px">
    <el-col :span="24">
      <el-descriptions title="电影简介" :column="1">
        <el-descriptions-item>
            在一个配件厂兢兢业业许多年的钳工胡建林（大鹏 饰），偶然接到一纸调令，命他马上到集团总公司赴任。淳朴老实的建林还以为作为年年先进的他成为了集团树立奖掖优秀员工的典型，殊不知这却是一场阴差阳错走后门拖关系的狸猫换太子。人事经理马杰（白客 饰）虽然很快发现了这场乌龙，但为了避免遭到处罚，只能将错就错，想方设法保住这位不速之客。而在这一过程中，胡建林也因扑朔迷离的身份受到集团上下的种种揣测，他的层级也意外地一次又一次提升。与此同时，集团正处于大裁员的风雨飘摇时刻，而展现公司面貌的年会召开在即。
处在漩涡中心的胡建林，终于发现了一系列诡异事件背后的玄机……
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
    <el-col :span="24">
      <h3>电影播放</h3>
      <VideoPlayer
        src="https://vjs.zencdn.net/v/oceans.mp4"
        poster="https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=600y500"
        controls
        :loop="true"
        :volume="0.6"
      />
    </el-col>
  </el-row>
</template>
<script setup>
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

</script>
<style scoped>

</style>
