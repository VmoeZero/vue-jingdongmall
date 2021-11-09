<template>
    <div class="wrap">
        <div class = "address-box">
            <nav-bar :name="'收货地址'" :back="address.from == 'create-order' ? '' : '/setting'"/>
            <div class="address-item">
                <van-address-list
                    v-if="address.from != 'mine'"
                    v-model="address.chosenAddressId"
                    :list="address.list"
                    default-tag-text="默认"
                    @add="onAdd"
                    @edit="onEdit"
                    @select="select"
                />
                <van-address-list
                    v-else
                    v-model="address.chosenAddressId"
                    :list="address.list"
                    default-tag-text="默认"
                    @add="onAdd"
                    @edit="onEdit"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { getAddressList } from '../service/address'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '../components/NavBar1.vue'
export default {
    name:'Address',
    components:{
        NavBar
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const state = reactive({
            address:{
                chosenAddressId: '1',
                list: [],
                from: route.query.from
            }
        })

        onMounted(async () => {
            const { data } = await getAddressList()
            if (!data) {
                state.address.list = []
                return
            }
            state.address.list = data.map( item => {
                return {
                    id: item.addressId,
                    name: item.userName,
                    tel: item.userPhone,
                    address:`${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
                    isDefault: !!item.defaultFlag
                }
            })
        })

        const onAdd = () =>{
            router.push({ path: '/address-edit', query: { type: 'add', from: state.address.from }})
        }

        const onEdit = (item) => {
            router.push({ path: 'address-edit', query: { type: 'edit', addressId: item.id, from: state.address.from } })
        }

        const select = (item) => {
            router.push({ path: 'create-order', query: { addressId: item.id, from: state.address.from } })
        }

        return {
            ...toRefs(state),
            onAdd,
            onEdit,
            select
        }
    }
}
</script>

<style lang="less">
.wrap{
    height: 100%;
    overflow: hidden;
    .address-box{
        .van-radio__icon {
        display: none;
        }
        .address-item{

        }
    }
}
</style>