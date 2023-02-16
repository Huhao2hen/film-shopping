<template>
  <el-container class="page">
    <el-header class="nav"><top></top></el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  <component :is="store.state.loginPopup ? login : ''"></component>
</template>

<script setup>
import top from '@/views/home/top/top'
import login from '@/views/home/login/login'
import { useStore } from 'vuex'
const store = new useStore()
</script>

<style lang="less" scoped>
.nav {
  position: fixed;
  width: 1536px;
  padding: 0px !important;
  z-index: 2;
}
.page {
  width: 100%;
}
.el-main {
  width: 100%;
  background-color: white;
  margin-top: 60px;
  min-height: 660px;
  // box-shadow: 0 0 5px 5px #ccc;
}
</style>
