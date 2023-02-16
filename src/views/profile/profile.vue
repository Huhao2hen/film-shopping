<template>
  <div class="container">
    <section class="profile">
      <el-row style="height: 100%">
        <el-col :span="4" class="menu">
          <div class="title">
            <p>个人中心</p>
          </div>
          <el-menu :default-active="$route.path" router>
            <el-menu-item index="/information">
              <el-icon><document /></el-icon>
              <span>基本信息</span>
            </el-menu-item>
            <el-menu-item index="/order">
              <el-icon><setting /></el-icon>
              <span>个人订单</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20" class="body">
          <router-view></router-view>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
</script>

<style lang="less" scoped>
.container{
  width: 1200px;
  margin: 0 auto;
}
.profile {
  width: 100%;
  height: 600px;
  .menu {
    border: 1px solid #dcdfe6;
    .title {
      width: 100%;
      text-align: center;
      height: 50px;
      font-size: 22px;
    }
  }
  .body {
    border: 1px solid #dcdfe6;
    border-left: transparent;
  }
}
.el-menu {
  border: none;
}
</style>
