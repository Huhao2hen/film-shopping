<template>
  <seatStep step1="down" step2="current" step3="future" step4="future"></seatStep>
  <section class="chooseseat">
    <div class="seatMap">
      <div class="seatTitle">
        <div class="bc"></div>
        <div class="title">银幕中央</div>
      </div>
      <div class="seats" @click="handleSeat">
        <span :class="{ 'seat-cell': seat == 3, 'seat-sold': seat == 2, 'seat-check': seat == 1, 'seat-empty': seat == 0 }" v-for="(seat, index) in arr" :key="index" :data-seat-index="index" :data-seat-type="seat"> </span>
        <!-- <div class="row-id-container"></div> -->
      </div>
      <div class="seatChooseInfo">
        <ul class="clearfix">
          <li><span class="hasSeat"></span>可选座位</li>
          <li><span class="soldSeat"></span>已售座位</li>
          <li><span class="checkSeat"></span>已选择座位</li>
        </ul>
      </div>
    </div>
    <div class="orederInfo">
      <div class="seatMovie">
        <div class="picBox">
          <a href=""><img :src="currentMovieInfo.moviePoster" /></a>
        </div>
        <div class="boxInfo">
          <h3>{{ currentMovieInfo.movieName }}</h3>
          <p>片长：{{ currentMovieInfo.movieLong }}</p>
          <p>类型：{{ currentMovieInfo.movieType }}</p>
        </div>
        <div class="seatContent">
          <span>
            <label>影院：</label>
            <strong>{{ currentCinemaInfo.cinemaName }}</strong>
          </span>
          <span>
            <label>影厅：</label>
            <strong>{{ scheduleInfo.hallName }}</strong>
          </span>
          <span>
            <label>场次：</label>
            <!-- <a href="javascript:"><s></s>更换场次</a> -->
            <em>{{ scheduleInfo.showDate }} {{ scheduleInfo.showTime }}</em>
          </span>
          <span>
            <label>票价：</label>
            <strong>￥{{ scheduleInfo.price }} / 张</strong>
          </span>
          <el-divider border-style="dashed" />
          <span class="line">
            <label>座位:</label>
            <span class="" v-if="!dynamicTags.length"> 您最多选择4个座位</span>
            <div class="">
              <el-tag v-for="tag in dynamicTags" :key="tag" :disable-transitions="false" size="large" type="danger" closable @close="handleClose(tag)">
                {{ tag }}
              </el-tag>
            </div>
            <p class="" v-if="!dynamicTags.length">点击 <em style="color: red"> 左侧座位图 </em> 选择座位，再次点击取消</p>
            <p class="" v-if="dynamicTags.length">
              已选择<em>{{ dynamicTags.length }}</em
              >个座位，再次点击座位可以取消
            </p>
          </span>
          <span class="total">
            <label>总计:</label>
            <span style="color: red"> ¥ {{ totalPrice }} </span>
          </span>
        </div>
        <el-divider border-style="dashed" />
        <div class="seatForm">
          <span>接收电子码的手机号(11位)</span>
          <input v-model="telephone" @blur="checkTel" placeholder="请输入接收电子码的手机号" class="telphone" maxlength="11" clearable />
          <el-button type="danger" class="btn" @click="toConfirm">确认信息，下单</el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import seatStep from '@/components/seatStep'
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import { indexToSeat, seatToIndex, deleteSeatCache, getSeatCache } from '@/util/seatFormat'
import router from '../../../router'
const store = new useStore()
const arr = ref(new Array(144).fill(3))
const chooseSeatInfo = reactive({
  selectedCount: 0,
  selectedArr: []
})
const telephone = ref(store.state.userMsg.phone)
const currentMovieInfo = computed(() => store.state.movie.movieInfo)
const currentCinemaInfo = computed(() => store.state.cinema.cinemaInfo)
const dynamicTags = ref([])
const scheduleInfo = computed(() => store.state.schedule.scheduleInfo)
const totalPrice = computed(() => parseFloat(scheduleInfo.value.price) * dynamicTags.value.length)
if (scheduleInfo.value.seatInfo != null) {
  let filter = scheduleInfo.value.seatInfo.split(',')
  for (let seat of filter) {
    arr.value[seat] = 2
  }
}

const handleSeat = e => {
  let currentSeatIndex = e.target.getAttribute('data-seat-index')
  if (currentSeatIndex == null) return
  let currentSeatType = e.target.getAttribute('data-seat-type')
  let tag = indexToSeat(currentSeatIndex)
  if (currentSeatType == 3 && chooseSeatInfo.selectedArr.length < 4) {
    chooseSeat(currentSeatIndex, tag)
  } else if (currentSeatType == 1) {
    cancelSeat(currentSeatIndex, tag)
    deleteSeatCache(currentSeatIndex)
  } else if (currentSeatType == 3) {
    deleteSeatCache(currentSeatIndex)
    ElNotification({
      title: '这是一条规定',
      message: '一次性不能购票超过四张',
      position: 'bottom-right'
    })
  }
}

const handleClose = tag => {
  let currentSeatIndex = seatToIndex(tag)
  cancelSeat(currentSeatIndex, tag)
}

function chooseSeat(currentSeatIndex, tag) {
  arr.value[currentSeatIndex] = 1
  chooseSeatInfo.selectedCount++
  chooseSeatInfo.selectedArr.push(currentSeatIndex)
  dynamicTags.value.push(tag)
}

function cancelSeat(currentSeatIndex, tag) {
  arr.value[currentSeatIndex] = 3
  chooseSeatInfo.selectedCount--
  chooseSeatInfo.selectedArr = chooseSeatInfo.selectedArr.filter(index => index !== currentSeatIndex)
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const checkTel = () => {
  let telRegex = /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/
  let flag = telRegex.test(parseInt(telephone.value))
  if (flag) {
    return true
  } else {
    if (telephone.value === '') {
      ElNotification({
        title: '这是一条提示',
        message: '请输入手机号用来接收电子码',
        type: 'warning',
        position: 'bottom-right'
      })
    } else {
      ElNotification({
        title: '这是一条提示',
        message: '请输入正确的手机号',
        type: 'warning',
        position: 'bottom-right'
      })
    }
    return false
  }
}

const toConfirm = () => {
  if (chooseSeatInfo.selectedCount) {
    if (checkTel()) {
      let seatInfo = getSeatCache()
      let orderInfo = {
        ...chooseSeatInfo,
        seatInfo,
        totalPrice,
        orderPhone: telephone
      }
      store.commit('setOrderInfo', orderInfo)
      router.replace('/confirm')
    }
  } else {
    ElMessage.info('您还未选择座位')
  }
}

onBeforeRouteLeave((to, from) => {
  if (to.path.indexOf('comfirm') > -1 || to.path.indexOf('choose') > -1) {
    if (store.state.isLogin === true) {
      return true
    } else {
      ElNotification({
        title: '这是一条提示',
        message: '请先登录您的账号',
        type: 'warning',
        position: 'bottom-right'
      })
      return false
    }
  } else {
    if (store.state.schedule.tagList !== []) {
      store.commit('clearSchedule')
    }
  }
})
</script>

<style lang="less" scoped>
.chooseseat {
  width: 1000px;
  height: 630px;
  border: 1px solid #e5e5e5;
  display: flex;
  .seatMap {
    width: 700px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .seatTitle {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      .bc {
        text-align: center;
        background-image: url('../../../assets/image/银幕精灵图.png');

        background-position-x: center;
        width: 580px;
        height: 30px;
      }
      .title {
        text-align: center;
        color: #666;
      }
      // overflow: hidden;
    }
    .seats {
      width: 432px;
      span {
        display: inline-block;
        width: 26px;
        height: 25px;
        margin: 0 5px;
      }
      .seat-cell {
        background-image: url('../../../assets/image/seat-cell.png');
      }
      .seat-cell:hover {
        cursor: pointer;
      }
      .seat-sold {
        background-image: url('../../../assets/image/seat-sold.png');
      }
      .seat-check {
        background-image: url('../../../assets/image/seat-check.png');
      }
    }
    .seatChooseInfo {
      li {
        padding: 0 10px 0 30px;
        float: left;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
      }
      span {
        display: inline-block;
        margin-right: 10px;
        width: 26px;
        vertical-align: middle;
      }
      .hasSeat {
        width: 26px;
        height: 25px;
        background: url('../../../assets/image/seat-cell.png') no-repeat;
      }
      .soldSeat {
        width: 26px;
        height: 25px;
        background: url('../../../assets/image/seat-sold.png') no-repeat;
      }
      .checkSeat {
        width: 26px;
        height: 25px;
        background: url('../../../assets/image/seat-check.png') no-repeat;
      }
    }
  }
  .orederInfo {
    width: 300px;
    height: 100%;
    background-color: #fff5f5;
    padding-top: 15px;
    padding-left: 15px;
    .seatMovie {
      .picBox {
        display: inline-block;
        width: 120px;
        height: 160px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .boxInfo {
        float: right;
        width: 150px;
        color: #909399;
        font-size: 14px;
        h3 {
          font-size: 16px;
        }
      }
    }
    .seatContent {
      display: flex;
      flex-direction: column;
      align-items: start;
      font-size: 14px;
      span {
        margin: 5px 0;
        .el-tag {
          margin: 5px 8px;
        }
        label {
          font-size: 12px;
          color: #909399;
        }
      }
    }
    .seatForm {
      font-size: 12px;
      .telphone {
        margin: 10px 0 20px 0;
        width: 200px;
        height: 40px;
        font-size: 18px;
        font-weight: bold;
      }
      .btn {
        width: 160px;
        height: 40px;
        background-color: #e90630;
      }
    }
  }
}
.el-divider {
  margin: 5px 0;
}
</style>
