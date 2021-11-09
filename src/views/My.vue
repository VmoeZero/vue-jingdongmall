<template>
    <div class="wrap">
        <div class="my">
            <div class="my-wrap">
                <nav-bar :name="'我的京东'" :ismenu="'ture'" />
                <div class="content">
                    <div class="content-linear">
                        <div class="my-header">
                            <div class="my-header-wrap">
                                <div class="user_info">
                                    <div class="avatar">
                                        <div class="avatar-wrap">
                                            <div class="user_image">
                                                <img src="https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="personal">
                                        <div class="name-wrap">
                                            <div><span class="user_name">{{ user.nickName }}</span></div>
                                        </div>
                                        <div class="hor-tips">
                                            <div class="notice">乐享值</div>
                                            <div class="notice">小白信用</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="account">
                                    <div class="account-wrap">
                                        <van-icon class="account-icon" name="setting-o" @click="goTo('/setting')"/>
                                    </div>
                                </div>
                                <div class="mycell-list">
                                    <div class="mycell-item">
                                        <div class="mycell-item-val">
                                            <span class="mycell-item-val-text">3</span>
                                        </div>
                                        <span class="mycell-item-key">商品收藏</span>
                                    </div>
                                    <div class="mycell-item">
                                        <div class="mycell-item-val">
                                            <span class="mycell-item-val-text">7</span>
                                        </div>
                                        <span class="mycell-item-key">店铺收藏</span>
                                    </div>
                                    <div class="mycell-item">
                                        <div class="mycell-item-val">
                                            <span class="mycell-item-val-text">12</span>
                                        </div>
                                        <span class="mycell-item-key">我的足迹</span>
                                    </div>
                                </div>
                                <div class="plus">
                                </div>
                            </div>
                        </div>
                        <div class="my-order">
                            <div class="my-order-wrap">
                                <div class="order-list">
                                    <div class="order-item order-unpay">
                                        <span class="order-item-text">待付款</span>
                                    </div>
                                    <div class="order-item order-unrecieve">
                                        <span class="order-item-text">待收货</span>
                                    </div>
                                    <div class="order-item order-consult">
                                        <span class="order-item-text">退换/售后</span>
                                    </div>
                                    <div class="order-item order-allorders">
                                        <span class="order-item-text order-main">全部订单</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="my-paybg">
                            <div class="paybg-item">
                                <div class="paybg-item-val">
                                    <div class="paybg-item-val-num">0</div>
                                </div>
                                <span class="paybg-item-key">优惠券</span>
                            </div>
                            <div class="paybg-item">
                                <div class="paybg-item-val">
                                    <div class="paybg-item-val-num">7,000</div>
                                </div>
                                <span class="paybg-item-key">白条额度</span>
                            </div>
                            <div class="paybg-item">
                                <div class="paybg-item-val">
                                    <div class="paybg-item-val-num">1,800</div>
                                </div>
                                <span class="paybg-item-key">京豆</span>
                            </div>
                            <div class="paybg-item">
                                <div class="paybg-item-val">
                                    <div class="paybg-item-val-num">0</div>
                                </div>
                                <span class="paybg-item-key">红包</span>
                            </div>
                            <div class="paybg-item paybg-all">
                                <div class="paybg-item-val paybg-item-all"></div>
                                <span class="paybg-item-key">我的资产</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <com-footer />
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { getUserInfo } from '../service/user'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar1.vue'
import ComFooter from '../components/ComFooter.vue'
export default {
    name:'My',
    components:{
        NavBar,
        ComFooter
    },
    setup() {
        const router = useRouter()
        const state = reactive({
            user: {},
            loading: true
        })

        onMounted( async () => {
            const { data } = await getUserInfo()
            state.user = data
            state.loading = false
        })

        const goTo = (r, query) => {
            router.push({ path: r, query: query || {} })
        }

        return {
            ...toRefs(state),
            goTo
        }
    }
}
</script>

<style lang="less" scoped>
@import '../style/my.less';
</style>