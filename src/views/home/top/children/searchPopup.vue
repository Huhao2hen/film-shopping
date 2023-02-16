<template>
  <section class="a" v-if="searchList?.length">
    <header><h2>搜索结果</h2></header>
    <main class="searchList">
      <searchPopupItem v-for="item in searchList" :key="item.id" :searchItem="item"></searchPopupItem>
    </main>
  </section>
  <section class="b" v-else>
    <header><h2>本次搜索没有结果...</h2></header>
  </section>
</template>

<script setup>
import searchPopupItem from '@/components/searchPopupItem'
import { watchEffect } from 'vue'

const props = defineProps({
  searchList: Array
})

watchEffect(() => {
  console.log('弹出框', props.searchList)
})
</script>

<style lang="less" scoped>
section {
  max-height: 300px;
  overflow-y: auto;
}
</style>
