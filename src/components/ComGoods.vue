<template>
    <van-cell class="goods-wrap" v-for="item in list" :key="item.goodsId">
        <div class="goods" @click=" goToDetail(item)">
            <div class="goods-img">
                <img :src="prefix(item.goodsCoverImg)" alt="">
            </div>
            <div class="goods-info">
                <div class="goods-name">{{ item.goodsName }}</div>
                <div class="goods-row">
                    <div class="goods-prise">
                        ¥
                        <em>{{ item.sellingPrice }}</em>
                        .00
                    </div>
                </div>
                <div class="goods-bottom">
                    <div class="goods-bottom-tags">{{ item.goodsTags||'1000' }} +条评论</div>
                </div>
            </div>
            <div class="goods-back">看相似</div>
        </div>
    </van-cell>
</template>

<script>
export default {
    name:"ComGoods",
    props: {
        list:Array
    },
    methods: {
        goToDetail(item) {
        this.$router.push({ path: `/product/${item.goodsId}` })
        },

        prefix(url){
            if (url && url.startsWith('http')) {
            return url
            } else {
            url = `http://backend-api-01.newbee.ltd${url}`
            return url
            }
        }
    }
}
</script>

<style scoped lang="less">
.goods-wrap{
    padding: .133333rem;
    .goods{
        display: block;
        width: 100%;
        background: #ffffff;
        border-radius: .213333rem;
        overflow: hidden;
        position: relative;
        .goods-img{
            background-color: #fff;
            // width: 4.6rem;
            height: 4.6rem;
            margin-bottom: .133333rem;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
            text-align:center;
            & img{
                height: 100%;
                display: block;
                margin: 0 auto;
                vertical-align: top;
            }
        }
        .goods-info{
            padding: 0 .266667rem .266667rem;
            .goods-name{
                text-align: left;
                line-height: .56rem;
                height: 1.12rem;
                font-size: .373333rem;
                font-family: -apple-system, Helvetica, sans-serif;
                overflow: hidden;
                color: #434343;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                word-break: break-all;
                -webkit-box-orient: vertical;
            }
            .goods-row{
                display: flex;
                height: .8rem;
                .goods-prise{
                    font-style: normal;
                    display: inline-block;
                    font-size: .373333rem;
                    line-height: .8rem;
                    color: #ff4142;
                    & em{
                        font-size: .533333rem;
                        font-style: normal;
                    }
                }
            }
            .goods-bottom{
                display: flex;
                align-items: center;
                width: 70%;
                height: .533333rem;
                flex-wrap: wrap;
                overflow: hidden;
                .goods-bottom-tags{
                    max-width: 100%;
                    color: #999;
                    overflow: hidden;
                    white-space: nowrap;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    font-size: .32rem;
                    margin-right: .013333rem;
                }
            }
        }
        .goods-back{
            position: absolute;
            display: flex;
            right: .266667rem;
            bottom: .266667rem;
            background-color: #f2f2f2;
            color: #232326;
            font-size: .293333rem;
            width: 1.333333rem;
            height: .533333rem;
            align-items: center;
            justify-content: center;
            border-radius: .266667rem;
        }
    }
}
</style>