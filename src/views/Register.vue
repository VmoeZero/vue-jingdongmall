<template>
    <div class="wrap">
        <div class="register">
            <div class="register-wrap">
                <nav-bar :name="'京东注册'"></nav-bar>
                <div class="register-form">
                    <div class="register-input-container">
                        <div class="register-phonetip">
                            <i>+86</i>
                            <span class="iconfont">&#xe654;</span>
                        </div>
                        <input type="text" id="username" placeholder="请输入手机号" v-model="registe.username">
                    </div>
                    <div class="register-input-container">
                        <input :type="passwordon.type" id="password" placeholder="请设置密码" v-model="registe.password1">
                        <span class="passwordon iconfont" @click="passwordShow" v-html="passwordon.icon"></span>
                    </div>
                    <div class="register-input-container">
                        <input type="password" id="password" placeholder="请重复密码" v-model="registe.password2"> 
                    </div>
                    <div class="register-button" @click="handleRegister">注册</div>
                    <div class="register-other">
                        <a href="login.html">已有账号？返回登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Toast } from 'vant'
import { register } from '../service/user'
import NavBar from '../components/NavBar1.vue'
export default {
    name:'Register',
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
            registe:{
                username:'',
                password1:'',
                password2:''
            }
        }),
        handleRegister = async() => {
            if(!/^1[34578]\d{9}$/.test(state.registe.username)){
                Toast.fail('手机格式有误')
                return
            } else if(state.registe.password1 == ''){
                Toast.fail('请设置密码')
                return
            } else if(state.registe.password2 == ''){
                Toast.fail('请重复密码')
                return
            } else if(state.registe.password1 != state.registe.password2){
                Toast.fail('两次密码输入不一致')
                return
            } else {
                try {
                    await register({
                        "loginName": state.registe.username,
                        "password": state.registe.password1
                    })
                    Toast.success('注册成功')
                    window.location.href = '/login'
                }catch(e){
                    Toast.fail('注册失败')
                }
            }
        }
        return{
            ...toRefs(state),
            handleRegister
        }
    }        
}
</script>

<style lang="less" scoped>
@import '../style/register.less';
</style>