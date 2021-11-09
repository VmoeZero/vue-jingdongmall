<template>
    <div class="header-search">
        <div class="header-search-wrap">
            <div class="header-search-hd">
                <div class="search-hd-container">
                    <header class="search-hd-bar">
                        <div class="search-cancebtn">
                            <span class="iconfont">&#xe60d;</span>
                        </div>
                        <div class="search-little"></div>
                        <div v-show="!islogin" class="search-loginbtn">
                            <router-link to="login"><span>登录</span></router-link>
                        </div>
                    </header>
                </div>
                <div class="search-hd-main">
                    <form class="search-hd-form">
                        <div class="search-form-box">
                            <i class="search-form-box-logo iconfont">&#xe61f;</i>
                            <i class="search-form-box-icon iconfont">&#xe615;</i>
                            <div class="search-form-box-input">
                                <input type="text" class="search-form-input1">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ComHeader',
  props:{
      islogin: {
        type: Boolean,
        default: true
    },
  }
}

</script>

<style scoped lang="less">
@import '../common/base.less';
@import '../style/com-header.less';
@import '../style/iconfont.css';
</style>
