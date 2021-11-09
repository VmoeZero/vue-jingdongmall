<template>
    <div class="wrap">
        <nav-bar />
        <div class="product-main">
            <div class="mod-swiper">
                <van-swipe class="mod-swiper-list">
                    <van-swipe-item class="mod-swiper-item" v-for="(item, index) in detail.goodsCarouselList" :key="index">
                        <img :src="item" alt="">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="product-info">
                <div class="product-wrap">
                    <div class="price-wrap">
                        <span class="price-text">
                            ¥<em>{{ detail.sellingPrice || '' }}</em>
                            <span class="price-text-mini">.00</span>
                        </span>
                        <span class="col-right">
                            <span class="col-icon-share iconfont">&#xe68e;</span>
                            <span class="col-info">收藏</span>
                        </span>
                        <span class="col-right">
                            <span class="col-icon-cheaper iconfont">&#xe60a;</span>
                            <span class="col-info">降价提醒</span>
                        </span>
                    </div>
                </div>
                <div class="title-wrap">
                    <h1 class="title-product-name">{{ detail.goodsName || '' }}</h1>
                </div>
            </div>
            <div class="item-floor">
                <div class="mod-discount">
                    <span class="title">优惠</span>
                    <div class="content">
                        <div class="discount_coupon">
                            <span class="coupon">满100减10</span>
                        </div>
                        <div class="discount_prom">
                            <div class="prom-item">
                                <div class="prom-tag">
                                    <em class="prom-tag-bg">满减</em>
                                </div>
                                <div class="prom-line"><span>满200元减20元，满300元减30元，满500元减50元，满1000元减100元，满3000元减310元</span></div>
                            </div>
                        </div>
                    </div>
                    <van-icon name="weapp-nav" class="icon-list" />
                </div>
                <div class="mod-baitiao">
                    <span class="title">白条</span>
                    <div class="baitiao-list">
                        <div class="baitiao-item">分期享折扣</div>
                    </div>
                    <van-icon name="weapp-nav" class="icon-list" />
                </div>
            </div>
            <div class="product-fixbar">
                <div class="fixbar">
                    <van-tabs class="fixbar-item" v-model="productActive">
                        <van-tab title="商品介绍"></van-tab>
                        <van-tab title="规格参数"></van-tab>
                        <van-tab title="售后服务"></van-tab>
                    </van-tabs>
                </div>
            </div>
            <div class="product-detail">
                <div class="product-content" v-html="detail.goodsDetailContent || ''"></div>
            </div>
        </div>
        <van-action-bar>
            <van-action-bar-icon icon="shop-o" text="店铺" />
            <van-action-bar-icon icon="chat-o" text="客服" />
            <van-action-bar-icon icon="cart-o" :badge="!count ? '' : count" @click="goTo()" text="购物车" />
            <van-action-bar-button type="warning" @click="handleAddCart" text="加入购物车" />
            <van-action-bar-button type="danger" @click="goToCart" text="立即购买" />
        </van-action-bar>
    </div>
</template>

<script>
import { reactive, onMounted, computed, toRefs, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getDetail } from '../service/goods'
import { addCart } from '../service/shopcart'
import { Toast } from 'vant'
import { prefix } from '../common/js/utils'
import NavBar from '../components/NavBar2.vue'
export default {
    name:'Product',
    components:{
        NavBar
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()

        const state = reactive({
            detail: {
                goodsCarouselList: []
            }
        })

        onMounted(async() => {
            const { id } = route.params
            const { data } = await getDetail(id)
            data.goodsCarouselList = data.goodsCarouselList.map(i => prefix(i))
            state.detail = data
            store.dispatch('updataCart')
        })

        nextTick(() => {
        const content = document.querySelector('.product-main')
        content.scrollTop = 0
        })

        const goTo = () => {
            router.push({ path: '/cart' })
        }

        const handleAddCart = async () => {
            const { resultCode } = await addCart({ goodsCount: 1, goodsId: state.detail.goodsId })
            if (resultCode == 200 ) Toast.success('添加成功')
            store.dispatch('updateCart')
        }

        const goToCart = async () => {
            await addCart({ goodsCount: 1, goodsId: state.detail.goodsId })
            store.dispatch('updateCart')
            router.push({ path: '/cart' })
        }

        const goBack = () => {
            router.go(-1)
        }

        const count = computed(() => {
            console.log(111, store.state.cartCount)
            return store.state.cartCount
        })

        return {
            ...toRefs(state),
            goBack,
            goTo,
            handleAddCart,
            goToCart,
            count
        }
    }
}
</script>

<style lang="less" scoped>
@import '../style/product.less';
</style>