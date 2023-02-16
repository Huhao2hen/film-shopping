<template>
  <section class="center-wrap">
    <div class="seat-step">
      <ul style="padding: 0">
        <li :class="step1" ref="step1">1.选择影片、影院以及场次</li>
        <li :class="step2" ref="step2">2.选座，填手机号</li>
        <li :class="step3" ref="step3">3.确认订单，支付</li>
        <li :class="step4" ref="step4">4.支付成功，影院取票观影</li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  step1: String,
  step2: String,
  step3: String,
  step4: String
})
</script>

<style lang="less" scoped>
.center-wrap {
  width: 1000px;
  min-width: 1000px;
  height: 60px;
  margin: 0 auto;
  font-size: 14px;
  .seat-step {
    ul {
      display: flex;
      li {
        margin-top: 10px;
        margin-bottom: 10px;
        line-height: 40px;
        display: block;
        width: 250px;
        text-align: center;
      }
    }
    .down {
      color: #26bb7e;
      border-bottom: 2px solid #26bb7e;
    }
    .current {
      color: #eb002a;
      border-bottom: 2px solid #eb002a;
    }
    .future {
      color: #999;
      border-bottom: 2px solid #ccc;
    }
  }
}
</style>
