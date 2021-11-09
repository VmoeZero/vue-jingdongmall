<template>
  <div class="home">
    <com-header :islogin="isLogin" />
    <div class="maincontant">
            <div class="top-swiper">
                <div class="top-swiper-bg"></div>
                <swiper-1 :list="swiperList"></swiper-1>
                <div class="top-swiper-page"></div>
            </div>
            <div class="box-swiper">
                <van-swipe class="box-swiper-wrap" :loop="false">
                    <van-swipe-item class="box-swiper-slider">
                        <div v-for="(item, index) in swiperifto.slice(0,10)" :key="index" @click="tips">
                            <a>
                                <img :src="item.iftoImg" alt="">
                                <span>{{item.iftoName}}</span>
                            </a>
                        </div>
                    </van-swipe-item>
                    <van-swipe-item class="box-swiper-slider">
                        <div v-for="(item, index) in swiperifto.slice(10,swiperifto.length)" :key="index">
                            <a>
                                <img :src="item.iftoImg" alt="">
                                <span>{{item.iftoName}}</span>
                            </a>
                        </div>
                    </van-swipe-item>
                </van-swipe>
                <div class="box-swiper-page"></div>
            </div>
            <div class="seckill">
                <div class="seckill-wrap">
                    <div class="seckill-container">
                        <div class="seckill-title">
                            <a @click="tips">
                                <div class="seckill-title-img">京东秒杀</div>
                                <div class="seckill-title-timer">
                                    <i>0点场</i>
                                    <div class="seckill-title-timedown">
                                        <div class="seckill-timedown">00</div>
                                        <span>:</span>
                                        <div class="seckill-timedown">59</div>
                                        <span>:</span>
                                        <div class="seckill-timedown">59</div>
                                    </div>
                                </div>
                            </a>
                            <a class="seckill-more" @click="tips">
                                更多秒杀
                                <span class="iconfont">&#xe613;</span>
                            </a>
                        </div>
                        <div class="seckill-swiper">
                            <van-swipe class="seckill-wraper" :show-indicators="false" :loop="false">
                                <van-swipe-item class="seckill-slider">
                                    <div class="seckill-slider-item" v-for="(item, index) in seckills.slice(0,6)" :key="index">
                                        <div class="seckill-slider-item-pic">
                                            <a>
                                                <img :src="item.seckillImg">
                                            </a>
                                        </div>
                                        <div class="seckill-slider-item-price">
                                            <span class="seckill-item-newprice">
                                                <em>¥</em>
                                                <span>{{ item.seckillNewprice }}</span>
                                            </span>
                                            <span class="seckill-item-oldprice">
                                                <em>¥</em>
                                                <span>{{ item.seckillOldprice }}</span>
                                                <hr>
                                            </span>
                                        </div>
                                    </div>
                                </van-swipe-item>
                                <van-swipe-item class="seckill-slider">
                                    <div class="seckill-slider-item" v-for="(item, index) in seckills.slice(6,seckills.length)" :key="index">
                                        <div class="seckill-slider-item-pic">
                                            <a :href="item.seckillUrl">
                                                <img :src="item.seckillImg">
                                            </a>
                                        </div>
                                        <div class="seckill-slider-item-price">
                                            <span class="seckill-item-newprice">
                                                <em>¥</em>
                                                <span>{{ item.seckillNewprice }}</span>
                                            </span>
                                            <span class="seckill-item-oldprice">
                                                <em>¥</em>
                                                <span>{{ item.seckillOldprice }}</span>
                                                <hr>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="seckill-slider-all">
                                        <a href="">
                                            <div class="seckill-all">
                                                <i class="iconfont">&#xe641;</i>
                                                <span>查看更多</span>
                                            </div>
                                        </a>
                                    </div>
                                </van-swipe-item>
                            </van-swipe>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lover-floor">
                <div class="feeds-waterfall">
                    <van-list class="feeds-vanlist" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <div class="feeds-left">
                            <com-goods :list="odd(recommends)"></com-goods>
                        </div>
                        <div class="feeds-right">
                            <com-goods :list="even(recommends)"></com-goods>
                        </div>
                    </van-list>
                </div>
            </div>
        </div>
    <com-footer />
  </div>
</template>

<style scoped lang='less'>
@import '../style/home.less';
</style>

<script>
// @ is an alias to /src
import { reactive, toRefs, ref, onMounted } from 'vue'
import { Toast } from 'vant'
import { getHome } from '@/service/home'
import ComHeader from '../components/ComHeader.vue'
import ComFooter from '../components/ComFooter.vue'
import Swiper1 from '../components/Swiper1.vue'
import ComGoods from '../components/ComGoods.vue'
import { getLocal } from '@/common/js/utils'

export default {
  name: 'Home',
  components: {
    ComHeader,
    ComFooter,
    Swiper1,
    ComGoods
  },
  methods: {
      odd: function(Array){
        return Array.filter(item => {
            if(item.goodsId%2!=0) {
            return item
            }
        })
      },
      even: function(Array){
        return Array.filter(item => {
            if(item.goodsId%2==0) {
            return item
            }
        })
      }
  },
  setup () {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const state = reactive({
        isLogin: false,
        loading: true,
        hots: [],
        newGoodses: [],
        recommends: [],
        swiperList: [
            {
                carouselUrl:"https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-mate40.png",
                redirectUrl:"https://juejin.im/book/6844733826191589390"
            },{
                carouselUrl:"https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner1.png",
                redirectUrl:"https://juejin.im/book/6844733826191589390"
            },{
                carouselUrl:"https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner2.png",
                redirectUrl:"https://juejin.im/book/6844733826191589390"
            }
        ],
        swiperifto: [
            {
                iftoImg:require("../img/chaoshi.jpg"),
                iftoUrl:"",
                iftoName:"京东超市"
            },{
                iftoImg:require("../img/diannao.jpg"),
                iftoUrl:"",
                iftoName:"数码电器"
            },{
                iftoImg:require("../img/fushi.jpg"),
                iftoUrl:"",
                iftoName:"京东服饰"
            },{
                iftoImg:require("../img/shenxian.jpg"),
                iftoUrl:"",
                iftoName:"京东生鲜"
            },{
                iftoImg:require("../img/daojia.jpg"),
                iftoUrl:"",
                iftoName:"京东到家"
            },{
                iftoImg:require("../img/jiaofei.jpg"),
                iftoUrl:"",
                iftoName:"充值缴费"
            },{
                iftoImg:require("../img/9.9pin.jpg"),
                iftoUrl:"",
                iftoName:"9.9元拼"
            },{
                iftoImg:require("../img/lingquan.jpg"),
                iftoUrl:"",
                iftoName:"领券"
            },{
                iftoImg:require("../img/jintie.jpg"),
                iftoUrl:"",
                iftoName:"领金贴"
            },{
                iftoImg:require("../img/plushuiyuan.jpg"),
                iftoUrl:"",
                iftoName:"PLUS会员"
            },{
                iftoImg:require("../img/guoji.jpg"),
                iftoUrl:"",
                iftoName:"京东国际"
            },{
                iftoImg:require("../img/paimai.jpg"),
                iftoUrl:"",
                iftoName:"京东拍卖"
            },{
                iftoImg:require("../img/kanbing.jpg"),
                iftoUrl:"",
                iftoName:"看病购药"
            },{
                iftoImg:require("../img/wan3c.jpg"),
                iftoUrl:"",
                iftoName:"玩3C"
            },{
                iftoImg:require("../img/worma.jpg"),
                iftoUrl:"",
                iftoName:"沃尔玛"
            },{
                iftoImg:require("../img/meizhung.jpg"),
                iftoUrl:"",
                iftoName:"美妆馆"
            },{
                iftoImg:require("../img/lvxing.jpg"),
                iftoUrl:"",
                iftoName:"京东旅行"
            },{
                iftoImg:require("../img/ershou.jpg"),
                iftoUrl:"",
                iftoName:"拍拍二手"
            },{
                iftoImg:require("../img/wuliu.jpg"),
                iftoUrl:"",
                iftoName:"物流查询"
            },{
                iftoImg:require("../img/quanbu.jpg"),
                iftoUrl:"",
                iftoName:"全部"
            }
        ],
        seckills: [
            {
                seckillUrl:'/home',
                seckillImg:require('../img/seckill001.jpg'),
                seckillNewprice:'9.9',
                seckillOldprice:'20'
            },{
                seckillUrl:'/home',
                seckillImg:require('../img/seckill002.jpg'),
                seckillNewprice:'38',
                seckillOldprice:'78'
            },{
                seckillUrl:'/home',
                seckillImg:require('../img/seckill003.jpg'),
                seckillNewprice:'6.9',
                seckillOldprice:'14.9'
            },{
                seckillUrl:'/home',
                seckillImg:require('../img/seckill005.jpg'),
                seckillNewprice:'19.8',
                seckillOldprice:'29.9'
            },{
                seckillUrl:'/home',
                seckillImg:require('../img/seckill004.jpg'),
                seckillNewprice:'518',
                seckillOldprice:'788'
            },{
                seckillUrl:'/home',
                seckillImg:require('../img/seckill006.jpg'),
                seckillNewprice:'35',
                seckillOldprice:'39'
            },{
                seckillUrl:'/home',
                seckillImg:require('../img/seckill007.jpg'),
                seckillNewprice:'9.9',
                seckillOldprice:'20'
            },{
                seckillUrl:'/home',
                seckillImg:require('../img/seckill008.jpg'),
                seckillNewprice:'38',
                seckillOldprice:'78'
            },{
                seckillUrl:'/home',
                seckillImg:require('../img/seckill009.jpg'),
                seckillNewprice:'6.9',
                seckillOldprice:'14.9'
            },{
                seckillUrl:'/home',
                seckillImg:require('../img/seckill010.jpg'),
                seckillNewprice:'19.8',
                seckillOldprice:'29.9'
            }
        ],
        goodsList: [
            {
                goodsId:'1',
                goodsUrl:'/home',
                goodsImg:require('../img/goods001.jpg'),
                goodsName:'妙睡宝 五星级酒店软床褥子榻榻米单人床垫子宿舍学生1.2m薄双人1.5米加厚家用床褥垫防滑保护垫被 立高5cm 1.8m床(180*200cm)',
                goodsPrise:'339',
                goodsTags:'1000'
            },{ 
                goodsId:'2',
                goodsUrl:'/home',
                goodsImg:require('../img/goods002.jpg'),
                goodsName:'徐福记 八庄沙琪玛 香酥全蛋味 萨其马 营养早餐休闲零食下午茶点心饼干蛋糕食品 促销装160g*2包',
                goodsPrise:'29',
                goodsTags:'8000'
            },{
                goodsId:'3',
                goodsUrl:'/home',
                goodsImg:require('../img/goods003.jpg'),
                goodsName:'上林春天 岩板餐桌 实木餐桌椅组合现代轻奢简约可伸缩折叠圆桌吃饭桌子套装餐厅家具 雪山白-黑灰框架【轻奢皮椅灰色款】 1.35米一桌六椅',
                goodsPrise:'1880',
                goodsTags:'6000'
            },{
                goodsId:'4',
                goodsUrl:'/home',
                goodsImg:require('../img/goods004.jpg'),
                goodsName:'【俞兆林旗舰官方店】秋装白色纯色棉气质通勤套头修身型长袖T恤女圆领打底打女【官方特价】 典雅白 M',
                goodsPrise:'339',
                goodsTags:'800'
            },{
                goodsId:'5',
                goodsUrl:'/home',
                goodsImg:require('../img/goods005.jpg'),
                goodsName:'HTEEC香港潮牌休闲套装男格子英伦风高端运动时尚百搭衣服跑步2021夏季 黑色 XL',
                goodsPrise:'598',
                goodsTags:'2000'
            },{
                goodsId:'6',
                goodsUrl:'/home',
                goodsImg:require('../img/goods006.jpg'),
                goodsName:'TP-LINK千兆路由器 AC1200无线家用 5G双频WiFi WDR5620千兆 高速路由穿墙 IPv6 内配千兆网线 光纤适用！',
                goodsPrise:'239',
                goodsTags:'3000'
            },{
                goodsId:'7',
                goodsUrl:'/home',
                goodsImg:require('../img/goods007.jpg'),
                goodsName:'玛馥嘉（Marfuga）意大利进口DOP特级初榨橄榄油 孕妇儿童食用油 250ml黑标单瓶装',
                goodsPrise:'239',
                goodsTags:'100'
            },{
                goodsId:'8',
                goodsUrl:'/home',
                goodsImg:require('../img/goods008.jpg'),
                goodsName:'迪士尼（Disney）小学生书包1-3年级男女童双肩米奇韩版休闲儿童背包 SM11752藏青色小号',
                goodsPrise:'189',
                goodsTags:'3000'
            }
        ]
    });
    onMounted(async () => {
      const token = getLocal('token')
      if (token) {
        state.isLogin = true
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      const { data } = await getHome()
      state.newGoodses = data.newGoodses
      state.hots = data.hotGoodses
      state.recommends = data.recommendGoodses
      Toast.clear()
    });
    const onLoad = () => {
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          list.value.push(state.goodsList[list.value.length]);
        }
        loading.value = false;
        if (list.value.length >= 8) {
          finished.value = true;
        }
      }, 1000);
    };
    const tips = () => {
      Toast('敬请期待');
    };
    return {
        ...toRefs(state),
        list,
        tips,
        onLoad,
        loading,
        finished
    }
}
}
</script>
