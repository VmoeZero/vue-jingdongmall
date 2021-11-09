<template>
    <div class="wrap">
        <div class="setting">
            <div class="setting-wrap">
                <nav-bar :name="'账号设置'" :ismenu="'true'" :back="'my'"/>
                <div class="account-area">
                    <div class="account-section">
                        <div class="account-section-title">
                            <span class="account-section-title-text">管理我的账户</span>
                        </div>
                        <ul class="account-section-list">
                            <li class="account-item">
                                <div class="bottom_left_decoration_points"></div>
                                <div class="top_right_decoration_points"></div>
                                <div class="top_right_decoration_ring"></div>
                                <div class="top_right_decoration_circle"></div>
                                <div class="account-item-tip">当前登录</div>
                                <div class="account-userinfo">
                                    <div class="account-useravator">
                                        <div class="account-useravator-box">
                                            <img class="user_avator" src="https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png">
                                        </div>
                                    </div>
                                    <div class="account-userdetail">
                                        <div class="userdetail-main">
                                            <span>{{ user.nickName }}</span>
                                        </div>
                                        <div class="userdetail-append">
                                            <span>用户名：{{ user.loginName }}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="action-area">
                    <div class="action-section">
                        <ul class="action-manage">
                            <li>
                                <div class="action-itemto" @click="goTO('/address', { from: 'mine' })">
                                    收货地址管理
                                    <span class="action-itemto-tip">管理我的地址</span>
                                </div>
                            </li>
                        </ul>
                        <ul class="action-manage">
                            <li>
                                <div class="action-itemto" @click="goTO('/setting-account')">
                                    账号管理
                                    <span class="action-itemto-tip">管理账号信息</span>
                                </div>
                            </li>
                            <li>
                                <div @click="towait" class="action-itemto">
                                    安全认证
                                    <span class="action-itemto-tip">实名认证信息</span>
                                </div>
                            </li>
                            <li>
                                <a @click="towait" class="action-itemto">
                                    支付安全
                                    <span class="action-itemto-tip">管理支付密码</span>
                                </a>
                            </li>
                        </ul>
                        <ul class="action-manage">
                            <li>
                                <router-link to="about" class="action-itemto">
                                    关于
                                    <span class="action-itemto-tip"></span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { getUserInfo } from '../service/user'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar1.vue'
export default {
    name:'Setting',
    components:{
        NavBar
    },
    methods: {
        towait(){
            Toast.fail('敬请期待')
        }
    },
    setup() {
        const router = useRouter()
        const state = reactive({
            user: {}
        })
        onMounted( async () => {
            const { data } = await getUserInfo()
            state.user = data
        })

        const goTO = (r, query) =>{
            router.push({ path: r, query: query || {} })
        }
        return {
            ...toRefs(state),
            goTO
        }
    }
}
</script>

<style lang="less" scoped>
@import '../style/setting.less';
</style>