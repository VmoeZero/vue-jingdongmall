<template>
    <div class="wrap">
        <div class="seting-box">
            <nav-bar :name="'账号设置'" :back="my"/>
            <div class="input-item">
                <div class="input-container">
                    <input type="text" id="nickname" placeholder="修改昵称" v-model="setting.nickName">
                </div>
                <div class="input-container">
                    <input :type="passwordon.type" id="password" placeholder="修改密码" v-model="setting.password">
                    <span class="passwordon iconfont" @click="passwordShow" v-html="passwordon.icon"></span>
                </div>
                <div class="input-button" @click="save">保存</div>
                <div class="input-button" @click="handleLogout">退出登录</div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { setLocal } from '../common/js/utils'
import { EditUserInfo, logout } from '../service/user'
import { Toast } from 'vant'
import md5 from 'js-md5'
import NavBar from '../components/NavBar1.vue'
export default {
    name:'SettingAccount',
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
            setting: {
                nickName:'',
                password:''
            }
        })

        const save = async () => {
            const params = {
                nickName: state.setting.nickName
            }
            if (state.setting.password) {
                params.passwordMd5 = md5(state.setting.password)
            } 
            await EditUserInfo(params)
            Toast.success('保存成功')
        }

        const handleLogout = async() => {
            const { resultCode } = await logout()
            if (resultCode == 200) {
                setLocal('token', '')
                window.location.href = '/home'
            }
        }
        
        return {
            ...toRefs(state),
            save,
            handleLogout
        }
    }
}
</script>

<style lang="less" scoped>
.wrap{
    overflow: hidden;
    height: 100%;
    .seting-box{
        .input-item{
            background-color: #fff;
            text-align: left;
            padding: 25px 25px;
            .input-container{
                margin-top: .533333rem;
                position: relative;
                box-sizing: border-box;
                height: 1.333333rem;
                padding-top: .266667rem;
                padding-bottom: .266667rem;
                overflow: hidden;
                background-color: #fff;
                border-bottom: .026667rem solid #efefef;
                & input{
                    height: .773333rem;
                    width: 100%;
                    outline: none;
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                    line-height: normal;
                    border: 0;
                    font-size: .426667rem;
                }
                .passwordon{
                    position: absolute;
                    right: 0.8rem;
                    top: 12px;
                    font-size: .64rem;
                    color: #ccc;
                }
            }.input-button{
            box-shadow: none;
            margin-top: .8rem;
            width: 100%;
            height: 1.333333rem;
            line-height: 1.333333rem;
            display: block;
            background-color: #efefef;
            border-radius: .666667rem;
            font-size: .426667rem;
            color: #fff;
            background-image: linear-gradient(90deg,#fab3b3,#f1bebe 23%,#f8450f);
            text-align: center;
            }
        }
        
    }
}
</style>