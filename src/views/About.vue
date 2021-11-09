<template>
  <div class="about">
    <nav-bar :name="'关于我'"></nav-bar>
    <div class="about-body">
      <img class="intro-img" src="../img/about.jpg" alt="">
      <van-divider :style="{ color: '#e2231a', borderColor: '#e2261a', fontSize: '20px', fontWeight: 500 }">简介</van-divider>
      <div>基于Vue3开发的商城系统。个人练手拙作品，待完善，如有bug或改进的地方，欢迎交流。</div>
      <div>作者：钟文宗</div>
      <div>联系邮箱：1712511921@qq.com</div>
      <div>接口提供：backend-api-01.newbee.ltd/api/v1</div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar1'
export default {
  components: {
    NavBar
  },
}
</script>

<style lang="less" scoped>
  .about {
    box-sizing: border-box;
    padding: 20px;
    .intro-img {
      width: 100%;
    }
    .about-body {
      font-size: 16px;
      a {
        color: #007fff;
      }
    }
  }
</style>