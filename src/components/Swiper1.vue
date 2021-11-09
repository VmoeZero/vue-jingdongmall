<template>
  <van-swipe class="top-swiper-wrap" :autoplay="3000" indicator-color="red">
    <van-swipe-item class="top-slider" v-for="(image, index) in images" :key="index">
        <a href="">
            <img :src="image">
        </a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'Swiper1',
  setup () {
    const images = [
      require('../img/topsl001.jpg'),
      require('../img/topsl002.jpg'),
      require('../img/topsl003.jpg'),
      require('../img/topsl004.jpg'),
      require('../img/topsl005.jpg'),
      require('../img/topsl006.jpg'),
      require('../img/topsl007.jpg'),
      require('../img/topsl008.jpg')
    ]
    return { images }
  }
}
</script>

<style lang='less' scoped>
.top-swiper-wrap{
  height: 4.986667rem;
  margin: 0;
  padding: 0;
  position: relative;
  min-height: 0;
  .top-slider{
      height: 4.986667rem;
      width: 100%;
      top: 0;
      & a{
          display: block;
          overflow: hidden;
          width: 9.333333rem;
          height: 3.733333rem;
          margin: 0 auto;
          top: 1.20rem;
          position: relative;
          border-radius: .25rem;
          & img{
              width: 100%;
              height: 100%;
              display: block;
              overflow: hidden;
          }
      }
  }
}
</style>
