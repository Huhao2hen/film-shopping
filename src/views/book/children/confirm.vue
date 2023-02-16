<template>
  <seatStep step1="down" step2="down" step3="current" step4="future"></seatStep>
  <section class="confirm_order">
    <h2>确认订单</h2>
    <div class="order-table">
      <table>
        <tbody>
          <tr class="menu">
            <td class="movie">电影</td>
            <td class="changci">场次</td>
            <td class="seat">票数/座位</td>
            <td class="money">金额小计</td>
            <td class="phone">接收电子码的电话号码</td>
          </tr>
          <tr class="info">
            <td class="movie-wrap">
              <div class="moviebar-wrap">
                <img :src="movieInfo?.moviePoster" alt="" />
                <p>
                <h4>{{ movieInfo?.movieName }}</h4>
                </p>
                <p>播放时长: {{ movieInfo?.movieLong }}</p>
                <p>电影类型: {{ movieInfo?.movieType }}</p>
              </div>
            </td>
            <td class="cinema-wrap">
              <div class="cinema-name">{{ cinemaInfo?.cinemaName }}</div>
              <div class="house">{{ scheduleInfo?.hallName }}</div>
              <div class="time">{{ scheduleInfo?.showDate }} {{ scheduleInfo?.showTime }}</div>
            </td>
            <td class="seat-wrap">
              <div class="count">{{ orderInfo?.selectedCount }}张</div>
              <div class="seat" v-for="item in orderInfo.seatInfo">{{ item }}</div>
            </td>
            <td class="money-wrap">
              <div class="money">
                <div class="main M-main-price" data-money="104">￥{{ orderInfo?.totalPrice }}.00</div>
                <div class="other"></div>
              </div>
            </td>
            <td class="phone-wrap">
              <div class="phone">{{ orderInfo?.orderPhone }}</div>
              <div>1.短信可能会被手机软件拦截，请到该软件中查找短信</div>
              <div>2.若要修改手机号，需要您重新下单</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="price-info">
        <span class="curr-money"> 实付款:<span class="price">￥{{ orderInfo?.totalPrice }}.00</span> </span>
      </div>
      <a class="toSuccess" @click="toSuccess">
        确认订单，立即支付
      </a>
    </div>
  </section>
  <component :order="order" :is="store.state.payDialogState ? payDialog : ''"></component>
</template>

<script setup>
import { computed,reactive } from 'vue';
import seatStep from '@/components/seatStep'
import {clearSeatCache} from '@/util/seatFormat'
import { useStore } from 'vuex';
import { useRouter,onBeforeRouteLeave } from 'vue-router'
import payDialog from '@/components/payDialog'
import {payOrder} from '@/api/order'

const store = new useStore()
const router = useRouter()
const movieInfo = computed(() => store.state.movie.movieInfo)
const cinemaInfo = computed(() => store.state.cinema.cinemaInfo)
const scheduleInfo = computed(() => store.state.schedule.scheduleInfo)
const orderInfo = computed(() => store.state.order.orderInfo)
const order = reactive({
    "userId": store.state.userMsg.id,
    "scheduleId": scheduleInfo.value.id,
    "orderPhone": orderInfo.value.orderPhone,
    "orderDate": +new Date(),
    "ticketNum": orderInfo.value.selectedCount,
    "ticketTotalPrice": orderInfo.value.totalPrice,
    "orderSeatInfo": orderInfo.value.seatInfo.join(','),
    "payType": "支付宝",
    'seatInfo':orderInfo.value.selectedArr.join(',')
    })
let toSuccess = () => {
  console.log(router.path);
  //TODO
  //支付确认
  // payOrder
  store.commit('setPayDialogState',true)
}

onBeforeRouteLeave((to,from)=>{
  if(to.path !== '/paysuccess'){
    
  }
  clearSeatCache()
})
</script>

<style lang="less" scoped>
.confirm_order {
  position: relative;
.timer{

}
.order-table {
    width: 100%;
    text-align: center;
    table {
      width: 100%;
      border-collapse: collapse;
      td {
        border: 0.0625rem solid #e7e7e7;
      }
    }
    .menu {
      height: 3.125rem;
      font-size: 14px;
      background-color: #efefef;
    }
  }
}
.moviebar-wrap {
  margin: 10px;
  img {
    float: left;
    width: 120px;
    height: 160px;
  }
  p {
    // text-indent: 2em;
    margin-left: 6em;
    font-size: 14px;
    color: #606266;
  }
}
.cinema-wrap {
  padding: 0 20px;
  .house {
    margin: 10px 0;
  }
  .time {
    color: red;
    font-size: 20px;
  }
}

.seat-wrap {
  padding: 0 10px;
  color: #9d9d9d;
  .count {
    margin: 10px 0;
  }
  .seat {
    width: 70px;
    height: 30px;
    margin: 5px 0;
    line-height: 30px;
    border: #dddddd solid 1px;
  }
}
.money-wrap {
  padding: 0 10px;
  .money {
    font-size: 24px;
    color: #ee343b;
  }
}
.phone-wrap {
  div {
    color: #9d9d9d;
    font-size: 14px;
    max-width: 220px;
  }
  .phone {
    color: black;
    font-weight: 500;

    margin: 10px 0;
    font-size: 24px;
  }
}
.price-info {
  float: right;
  margin: 10px 0;
  .curr-money {
    font-size: 14px;
    color: #9d9d9d;
    .price {
      font-size: 24px;
      font-weight: 700;
      color: #ee343b;
    }
  }
}
.toSuccess {
  display: block;
  position: absolute;
  right: 0;
  bottom: -100px;
  width: 200px;
  height: 50px;
  color: aliceblue;
  line-height: 50px;
  background-color: #ee343b;
}
</style>
