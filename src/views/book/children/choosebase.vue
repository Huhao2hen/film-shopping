<template>
  <seatStep step1="current" step2="future" step3="future" step4="future"></seatStep>
  <section class="choosecinema">
    <h3>选座购票</h3>
    <div class="selectbar">
      <div class="item">
        <div class="label">
          <div>{{ pageNeedShow === 'cinema' ? '选择影院' : '选择电影' }}</div>
        </div>
        <div class="tag" @click="handlTagChange" v-if="pageNeedShow === 'cinema'">
          <span :class="index == tcurrent ? 'current' : ''" :data-index="index" v-for="(item, index) in cinemas" :key="item.id">{{ item.cinemaName }}</span>
        </div>
        <div class="tag" @click="handlTagChange" v-if="pageNeedShow === 'movie'">
          <span :class="index == tcurrent ? 'current' : ''" :data-index="index" v-for="(item, index) in movies" :key="item.id">{{ item.movieName }}</span>
        </div>
      </div>
      <div class="item">
        <div class="label">
          <div>选择时间</div>
        </div>
        <div class="tag" @click="handlDateChange">
          <span :class="index == dcurrent ? 'current' : ''" :data-index="index" v-for="(item, index) in showDateList">{{ item }}</span>
        </div>
      </div>
    </div>
  </section>

  <div class="cinemabar-wrap" v-if="pageNeedShow === 'cinema'">
    <h4>{{ cinemas[tcurrent]?.cinemaName }}</h4>
    <span>{{cinemas[tcurrent]?.specifiedAddress}}</span>
  </div>
  <div class="moviebar-wrap" v-else>
    <img :src="movies[tcurrent]?.moviePoster" alt=""/>
    <p><h4>{{movies[tcurrent]?.movieName}}</h4></p>
    <p>播放时长: {{movies[tcurrent]?.movieLong}}</p>
    <p>电影类型: {{movies[tcurrent]?.movieType}}</p>
  </div>

  <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
    <el-table-column prop="showTime" label="放映时间" width="250px" />
    <el-table-column prop="hallName" label="放映厅" width="250px" />
    <el-table-column prop="price" label="现价/影院价（元）" width="250px" />
    <el-table-column prop="address" label="选座购票" width="250px">
      <template #default="scope">
        <router-link to="/chooseseat">
          <el-button size="normal" round type="danger" @click="handleBook(scope.$index, scope.row)">选座购票</el-button>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, toRef } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import seatStep from '@/components/seatStep'

const route = useRoute()
const store = new useStore()
const pageNeedShow = computed(() => store.state.schedule.needShow)
const cinemas = computed(() => store.state.schedule.cinemas)
const movies = computed(() => store.state.schedule.movies)
const scheduleList = computed(() => store.state.schedule.scheduleList)
const showDateList = ref()
const tableData = ref()
let tcurrent = ref(0)
let dcurrent = ref(0)

async function load(params) {
  if (pageNeedShow.value === 'cinema') {
    await store.dispatch('setCinemaList', route.params.id)
    showDateList.value = Array.from(new Set(scheduleList.value.map(item => item.showDate)))
    tableData.value = scheduleList.value.filter(item => item.cinemaId === cinemas.value[0].id && item.showDate === showDateList.value[0])
  } else if (pageNeedShow.value === 'movie') {
    await store.dispatch('setMovieList', route.params.id)
    showDateList.value = Array.from(new Set(scheduleList.value.map(item => item.showDate)))
    tableData.value = scheduleList.value.filter(item => item.movieId === movies.value[0].id && item.showDate === showDateList.value[0])
  }
}
load()

const handlTagChange = e => {
  if (e.target.getAttribute('data-index') !== null && e.target.getAttribute('data-index') != tcurrent.value) {
    tcurrent.value = e.target.getAttribute('data-index')
    updateTableData()
  }
}

const handlDateChange = e => {
  if (e.target.getAttribute('data-index') !== null && e.target.getAttribute('data-index') != dcurrent.value) {
    dcurrent.value = e.target.getAttribute('data-index')
    updateTableData()
  }
}

function updateTableData() {
  if (pageNeedShow.value === 'cinema') {
    tableData.value = scheduleList.value.filter(item => item.cinemaId === cinemas.value[tcurrent.value].id && item.showDate === showDateList.value[dcurrent.value])
  } else {
    tableData.value = scheduleList.value.filter(item => item.movieId === movies.value[tcurrent.value].id && item.showDate === showDateList.value[dcurrent.value])
  }
}

const handleBook = (index, row) => {
  if (store.state.isLogin === true) {
    if (pageNeedShow.value === 'cinema') {
      let cinemaInfo = cinemas.value.filter(item => item.id === row.cinemaId)[0]
      store.commit('setCinemaInfo', cinemaInfo)
    } else {
      let movieInfo = movies.value.filter(item => item.id === row.movieId)[0]
      store.commit('setMovieInfo', movieInfo)
    }
    store.commit('setScheduleInfo', row)
  }
}

onBeforeRouteLeave((to, from) => {
  if (to.path.indexOf('chooseseat') > -1) {
    if (store.state.isLogin === true) {
      return true
    } else {
      ElNotification({
        title: '警告',
        message: '请先登录您的账号',
        type: 'warning'
      })
      return false
    }
  } else {
    if (store.state.schedule.tagList !== []) {
      store.commit('clearSchedule')
    }
  }
})

// onBeforeUnmount(() => {})
</script>

<style lang="less" scoped>
.none {
  display: none;
}
.cinemabar-wrap {
  display: flex;
  text-align: center;
  align-items: center;
  color: #606266;
  h4 {
    margin-right: 40px;
  }
}
.moviebar-wrap{
  img{
    float: left;
    width: 120px;
    height: 160px;
  }
  p{
    text-indent: 2em;
    font-size: 14px;
    color: #606266;;
  }
  
}
.choosecinema {
  width: 100%;
  h3 {
    border-bottom: 1px solid #dcdfe6;
    font-weight: 400;
  }
  .selectbar {
    min-height: 100px;
    border: 1px solid #e4e7ed;
    .item {
      min-height: 50px;
      display: flex;
      .label {
        height: 100%;
        width: 10%;
        line-height: 50px;
        text-align: center;
        background-color: #c0c4cc;
        color: #606266;
        font-size: 14px;
      }
      .tag {
        display: flex;
        align-items: center;

        span {
          height: 70%;
          border-radius: 30px;
          color: #606266;
          font-size: 14px;
          margin-left: 20px;
          padding: 0 8px;
          display: inline-flex;
          align-items: center;
        }
        span:hover {
          background-color: #ecf5ff;
          color: #409eff;
        }
        .current {
          background-color: #ecf5ff;
          color: #409eff;
        }
      }
    }
  }
}
</style>
