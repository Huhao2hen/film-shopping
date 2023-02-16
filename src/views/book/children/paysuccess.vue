<template>
  <seatStep step1="down" step2="down" step3="down" step4="current"></seatStep>
  <section class="user_order">
    <h2>支付成功</h2>
    <h4>请收好您的取票码{{ ticketCode }}</h4>
    <div>{{ seccond }}S后跳转首页</div>
  </section>
</template>

<script setup>
import seatStep from '@/components/seatStep'
import { ref, computed } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { payOrder } from '@/api/order'
import { setScheduleSeat } from '@/api/schedule'
import { useStore } from 'vuex'

const router = useRouter()
const store = new useStore()
const orderInfo = computed(() => store.state.order.orderInfo)
const scheduleInfo = computed(() => store.state.schedule.scheduleInfo)
const ticketCode = ref(Math.round(100000 + Math.random() * (990000 - 100000)))
const seccond = ref(3)
let timer1 = setInterval(() => {
  seccond.value = seccond.value - 1
}, 1000)
let timer2 = setTimeout(() => {
  clearInterval(timer1)
  router.replace('/home')
  clearTimeout(timer2)
}, 3 * 1000)

const saveOrder = () => {
  let code = ticketCode.value
  orderInfo.value.ticketCode = code
  scheduleInfo.value.seatInfo = scheduleInfo.value.seatInfo + ',' + orderInfo.value.seatInfo
  payOrder(orderInfo.value).then(data => console.log('paysuccess'))
  setScheduleSeat(scheduleInfo.value)
  console.log(scheduleInfo.value.seatInfo)
}
saveOrder()
console.log(orderInfo.value)
</script>

<style lang="less" scoped></style>
