<template>
    <van-nav-bar :title='name' fixed placeholder>
        <template #left v-if="!isback" >
            <van-icon name="arrow-left" size="22" @click="goBack" />
        </template>
        <template #right v-if="ismenu">
            <van-icon name="ellipsis" size="22" />
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
        default: false
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
        color:#000;
    }
</style>