<template>
  <div class="container">
    <cinemaList></cinemaList>
  </div>
</template>

<script setup>
import cinemaList from './chiildren/cinemaList.vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'

const store = new useStore()
onBeforeRouteLeave((to, from) => {
  if (to.path.indexOf('choosebase')) {
    store.commit('setNeedShow', 'movie')
  }
  return true
})
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
