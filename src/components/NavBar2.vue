<template>
    <van-nav-bar :title='name' fixed>
        <template #left v-if="!isback" >
            <van-icon name="arrow-left" size="28" @click="goBack" />
        </template>
        <template #right v-if="ismenu">
            <van-icon name="ellipsis" size="28" />
        </template>
    </van-nav-bar>
</template>

<script>
import  { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
    name:'NavBar1',
    props:{
        name: {
        type: String,
        default: ''
        },
        back: {
        type: String,
        default: ''
        },
        noback: {
        type: Boolean,
        default: false
        },
        ismenu:{
        type: Boolean,
        default: true
        }
    },
    emits: ['callback'],
    setup(props, ctx) {
        const isback = ref(props.noback)
        const router = useRouter()
        const goBack = () => {
            if (!props.back) {
                router.go(-1)
            } else {
                router.push({ path: props.back })
            }
            ctx.emit('callback')
        }
        return {
            goBack,
            isback
        }
    }
}
</script>

<style lang="less" scoped>
    .van-icon{
        color:#fff;
        text-align: center;
    }
    .van-nav-bar{
        background-color: transparent;
    }
    .van-badge__wrapper{
        background: #666;
        border-radius: 50%;
        width:30px;
        height:30px;
    }
</style>