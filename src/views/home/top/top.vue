<template>
  <header>
    <!-- logo -->
    <el-row :gutter="20" justify="space-between">
      <el-col :span="2">
        <h1 class="title"><img src="@/assets/image/logo.png" alt="电影首页" class="logo" /></h1>
      </el-col>

      <!-- 导航栏 -->
      <el-col :span="8">
        <el-menu :default-active="$route.path" class="el-menu" mode="horizontal" router>
          <el-menu-item index="/filmrec">首页</el-menu-item>
          <el-menu-item index="/films">电影</el-menu-item>
          <el-menu-item index="/cinema">影院</el-menu-item>
        </el-menu>
      </el-col>

      <!-- 搜索框 -->
      <el-col :span="6">
        <el-popover placement="bottom" :width="344" v-model:visible="isPopup">
          <template #reference>
            <div class="search">
              <el-input
                placeholder="请输入内容"
                clearable
                v-model.trim="searchmsg"
                @keyup="updateSearchPopup"
                @input="
                  () => {
                    if (searchmsg.length) {
                      isPopup = true
                    } else {
                      isPopup = false
                    }
                  }
                "
                @focus="
                  () => {
                    if (searchmsg.length) {
                      isPopup = true
                    } else {
                      isPopup = false
                    }
                  }
                "
                @blur="
                  () => {
                    isPopup = false
                  }
                  "
              >
              <!-- 
              
              -->
                <template #append>
                  <el-button class="iconfont myicon-sousuo" @click="updateSearchPopup"></el-button>
                </template>
              </el-input>
            </div>
          </template>
          <searchPopup :searchList="searchList"></searchPopup>
        </el-popover>
      </el-col>
      <!-- 用户个人信息 -->
      <el-col :span="3" :offset="3" class="user">
        <div class="user">
          <el-dropdown v-if="loginState">
            <span class="el-dropdown-link" @click="userLogin">
              <el-avatar style="vertical-align: middle" :size="40" :src="profile.avatar"></el-avatar>
              <span style="margin-left: 0.3125rem; font-size: 0.9375rem">
                <el-icon style="margin-top: 10px"><arrow-down /></el-icon
              ></span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <router-link to="/information"><el-dropdown-item>个人信息</el-dropdown-item></router-link>
                <router-link to="/order"><el-dropdown-item>我的订单</el-dropdown-item></router-link>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <span v-else class="el-dropdown-link">
            <el-avatar style="vertical-align: middle" :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            <span style="margin-left: 0.3125rem; font-size: 0.9375rem" @click="userLogin">点我登录</span>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import searchPopup from './children/searchPopup.vue'
import { throttle } from '../../../util/throttle'
import { debounce } from '@/util/debounce'
import { useStore } from 'vuex'
import { getMovieSearchList } from '@/api/movie'

const router = useRouter()
const route = useRoute()
const store = useStore()
let searchmsg = ref('')
let searchList = ref([])
let profile = computed(() => store.state.userMsg)
let loginState = computed(() => store.state.isLogin)
let userLogin = () => {
  console.log(store.state.isLogin)
  if (store.state.isLogin === false) {
    store.commit('chageLoginPopup', true)
  }
}
let logout = async () => {
  localStorage.clear()
  sessionStorage.clear()
  profile.value = {}
  if (['/information', '/order', '/profile'].includes(route.path)) {
    await router.replace('/home')
    router.go(0)
  } else {
    router.go(0)
  }
}
let isPopup = ref(false)

async function getSearchList(searchmsg) {
  const { data, code } = await getMovieSearchList(searchmsg)
  if (code === 200) {
    console.log(data);
    return data
  }
}

const d_getSearchList = throttle(getSearchList, 1000)

const updateSearchPopup = async() => {
  if (searchmsg.value.length) {
    searchList.value = await d_getSearchList(searchmsg.value)
    isPopup.value = true
    console.log(searchmsg.value)
  }else{
    isPopup.value = false
  }
}

const inputfocus = () => {
  visible.value = true
}
</script>

<style lang="less" scoped>
header {
  z-index: 10;
  background-color: #fff;
  padding: 0 3.125rem;
  height: 100%;
  box-shadow: 0 3px 2px #f2f6fc;
}
.el-row {
  height: 3.75rem;
  overflow: hidden;
}
.title {
  margin: 0 0;
  display: flex;
  justify-content: center;
}
.logo {
  width: 3.75rem;
  height: 3.75rem;
}
.is-active {
  font-weight: 900;
  font-size: 1.125rem;
}
.search {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.user {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
/deep/.el-input__inner {
  height: 2.625rem;
}
.el-input-group {
  height: 2.5rem;
  line-height: 2.5rem;
}
</style>
