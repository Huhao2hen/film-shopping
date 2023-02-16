<template>
  <section class="banner">
    <div class="container">
      <div class="cell-left">
        <img :src="movieInfo.moviePoster" />
      </div>
      <div class="cell-middle">
        <h1>{{ movieInfo.movieName }}</h1>
        <div>类型: {{ movieInfo.movieType }}</div>
        <div>时长: {{ movieInfo.movieLong }}</div>
        <div>上映时间: {{ movieInfo.showTime }}</div>
        <div>导演: {{ movieInfo.movieDirector }}</div>
        <div class="actors"></div>
        <router-link :to="'/choosebase/' + movieInfo.id"><el-button type="danger">购票</el-button></router-link>
      </div>
      <div class="cell-right"></div>
    </div>
  </section>
  <div style="width: 1200px; margin: 100px auto">
    <h3>演员表</h3>
    <p style="text-indent: 2em; color: #606266">{{ store.state.movie.movieInfo.movieActors }}</p>
    <h3>电影简介</h3>
    <p style="text-indent: 2em; color: #606266">{{ store.state.movie.movieInfo.movieAbs }}</p>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { getMovie } from '@/api/movie.js'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'
import router from '../../../router'

const route = new useRoute()
const store = new useStore()
const movieInfo = computed(() => store.state.movie.movieInfo)

onBeforeRouteLeave((to, from) => {
  if (to.path.indexOf('choosebase')) {
    store.commit('setNeedShow', 'cinema')

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
  } else if (to.path.indexOf('detail')) {
    console.log('detail页面跳转detail')
  }
  // return true
})
// onBeforeRouteLeave((to, from) => {
//   if (to.path.indexOf('chooseseat') > -1) {
//     if (store.state.isLogin === true) {
//       return true
//     } else {
//       ElNotification({
//         title: '警告',
//         message: '请先登录您的账号',
//         type: 'warning'
//       })
//       return false
//     }
//   } else {
//     if (store.state.schedule.tagList !== []) {
//       store.commit('clearSchedule')
//     }
//   }
// })

store.dispatch('setInfo', route.params.id)
</script>

<style lang="less" scoped>
.banner {
  margin: -20px;
  height: 376px;
  background-image: url(https://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:5788b470/banner_bg.f7fd103e3b8c16b6f449cce43fc57f45.png);
  background-size: 100% 100%;
  .container {
    display: flex;
    justify-content: center;

    .cell-left {
      width: 300px;
      height: 370px;
      position: relative;
      img {
        position: absolute;
        bottom: -40px;
        width: 260px;
        height: 100%;
        box-shadow: 6px 12px 3px 3px #eee;
      }
    }
    .cell-middle {
      width: 300px;
      padding-top: 40px;
      h1 {
        color: #fff;
      }
      div {
        margin: 10px 0;
        color: white;
      }
      .actors {
        width: 300px; /*限制元素宽度*/
        line-height: 30px;
        overflow: hidden; /*文本超出隐藏*/
        display: -webkit-box; /*盒子模型微弹性伸缩模型*/
        -webkit-box-orient: vertical; /*伸缩盒子的子元素垂直排列*/
        -webkit-line-clamp: 3; /*文本显示3行*/
      }
      .el-button {
        background-color: #df2d2d;
        margin-top: 85px;
        width: 80%;
        height: 40px;
        font-size: 16px;
      }
    }
    .cell-right {
      width: 300px;
      margin-top: 40px;
      margin-left: 50px;
      text-indent: 2em;
      color: white;
      line-height: 30px;
      overflow: hidden; /*文本超出隐藏*/
      display: -webkit-box; /*盒子模型微弹性伸缩模型*/
      -webkit-box-orient: vertical; /*伸缩盒子的子元素垂直排列*/
      -webkit-line-clamp: 11; /*文本显示3行*/
    }
    div {
      margin: 0 10px;
    }
  }
}
</style>
