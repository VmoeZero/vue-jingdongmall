<template>
    <div id="comnav">
        <a @click="this.$router.push({path:'home'})">
            <div class="icon-center">
                <img src="../img/首页.png" alt="">
            </div>
        </a>
        <a @click="this.$router.push({path:'category'})">
            <div class="icon-center">
                <img src="../img/分类.png" alt="">
            </div>
        </a>
        <a @click="this.$router.push({path:'home'})">
            <div class="icon-center">
                <img src="../img/京喜.png" alt="">
            </div>
        </a>
        <a @click="this.$router.push({path:'shopcart'})">
            <div class="icon-center">
                <img src="../img/购物车.png" alt="">
            </div>
        </a>
        <a @click="this.$router.push({path:'my'})">
            <div class="icon-center">
                <img src="../img/未登录.png" alt="">
            </div>
        </a>
    </div>
</template>

<script>
export default {
  name: 'ComFooter'
}
</script>

<style scoped lang='less'>
@import '../style/com-nav.less';
@import '../style/iconfont.css';
</style>
