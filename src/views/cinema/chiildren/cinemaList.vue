<template>
  <section class="cineam_list">
    <h3>影院列表</h3>
    <div class="body">
      <div class="cinema" v-for="item in cinemaList" :key="item.id">
        <div class="name">{{ item.cinemaName }}</div>
        <div class="address">{{ item.specifiedAddress }}</div>
        <el-button class="buy" type="danger" round @click="handleBook(item.id)">购票</el-button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { getCinemaList } from '@/api/cinema'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = new useStore()
const cinemaList = ref()
async function load() {
  let { data } = await getCinemaList()
  cinemaList.value = data
}
load()

const handleBook = cinemaId => {
  let cinemaInfo = cinemaList.value.filter(item => (item.id == cinemaId))[0]
  console.log(cinemaInfo)
  store.commit('setCinemaInfo', cinemaInfo)
  router.push(`/choosebase/${cinemaId}`)
}
</script>

<style lang="less" scoped>
.cineam_list {
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
}
</style>
