<template>
    <div class="wrap">
        <div class="login">
            <div class="login-wrap">
                <nav-bar :name="'京东登录'" :back="'/home'"></nav-bar>
                <div class="login-form">
                    <div class="login-input-container">
                        <input type="text" id="username" placeholder="用户名/邮箱/手机号" v-model="user.username">
                    </div>
                    <div class="login-input-container">
                        <input :type="passwordon.type" id="password" placeholder="请输入密码" v-model="user.password">
                        <span class="passwordon iconfont" @click="passwordShow" v-html="passwordon.icon"></span>
                        <span class="password-forget">忘记密码</span>
                    </div>
                    <div class="login-button" @click="handleLogin">登录</div>
                    <div class="login-other">
                        <span class="login-other-left">手机验证码登录</span>
                        <router-link to="register"><span class="login-other-right">手机快速注册</span></router-link>
                    </div>
                    <div class="login-quick">
                        <h4>其他方式登录</h4>
                        <div class="login-quick-type">
                            <a href="register.html"><img src="../img/login-qq.png" alt="">QQ</a>
                            <a href="register.html"><img src="../img/login-weixin.png" alt="">微信</a>
                            <a href="register.html"><img src="../img/login-apple.png" alt="">苹果</a>
                        </div>
                    </div>
                    <div class="policy-tip">
                        未注册的手机号验证后将自动创建京东账号, 登录即代表您已同意
                        <a href="">京东隐私政策</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Toast } from 'vant'
import { login } from '../service/user'
import { setLocal } from '../common/js/utils'
import NavBar from '../components/NavBar1.vue'
import md5 from 'js-md5'


export default {
    name:'login',
    components:{
        NavBar
    },
    methods: {
        passwordShow() {
            this.passwordon.type=this.passwordon.type=='password'?'text':'password'
            this.passwordon.icon=this.passwordon.icon=='&#xe6bb;'?'&#xe6aa;':'&#xe6bb;'
        }
    },
    setup() {
        const state = reactive({
            passwordon:{
                type: 'password',
                icon: '&#xe6bb;'
            },
            user:{
                username:'',
                password:''
            }
        })
        const handleLogin = async () =>{
            if(!/^1[34578]\d{9}$/.test(state.user.username)){
                Toast.fail('手机格式有误')
                return
            } else if(state.user.password == ''){
                Toast.fail('密码不能为空')
                return
            } else {
                try {
                    const { data } = await login({
                        "loginName": state.user.username,
                        "passwordMd5": md5(state.user.password)
                    })
                    setLocal('token', data);
                    window.location.href = '/'
                }catch(e){
                    Toast.fail('登录失败')
                }
            }
        }
        return{
            ...toRefs(state),
            handleLogin
        }
    }
}
</script>

<style scoped lang="less">
@import '../style/login.less' ;
</style>