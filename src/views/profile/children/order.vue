<template>
  <section class="user_order">
    <h3>个人订单</h3>
    <div class="body">
      <div class="cinema" v-for="item in orderList" :key="item.id">
        <div class="name">订单号{{ item.id }}</div>
        <div class="address">座位详情{{ item.orderSeatInfo }}</div>
        <h4 style="position: absolute; top: -15px; right: 0">取票码:{{ item.ticketCode }}</h4>

        <el-button class="buy" type="danger" round @click="handleUnBook(item.id)">退票</el-button>
        <!-- 
          id: "1522555221501386754"
orderDate: 1651840425000
orderPhone: "15352509687"
orderSeatInfo: "5排6座,7排7座,7排9座,8排7座"
orderState: 1
payType: "支付宝"
scheduleId: "9"
ticketCode: "698635"
ticketNum: 4
ticketTotalPrice: 192
userId: "1494273957694562305"
validateFlag: 1
         -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { getOrderList } from '@/api/order'
import { ElMessage } from 'element-plus';
import { mounted, ref } from 'vue'
const orderList = ref([])
const loadPage = () => {
  getOrderList().then(({ data }) => {
    const { records } = data
    orderList.value = records
    console.log(data)
  })
}
loadPage()
const handleUnBook = id => {
  ElMessage.success('符合退票原则,退票成功')
  orderList.value = orderList.value.filter(item => item.id !== id)
}
</script>

<style lang="less" scoped>
.body {
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdfe6;
  .cinema {
    position: relative;
    height: 80px;
    border-bottom: 1px dashed #e4e7ed;
    .name {
      color: #606266;
      margin: 5px 2px;
    }
    .address {
      color: #909399;
      margin: 5px 2px;
    }
    .buy {
      position: absolute;
      right: 30px;
      top: 33%;
    }
  }
}
</style>
