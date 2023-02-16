<template>
  <div class="login">
    <div class="box">
      <i class="el-icon-close" @click="close_login">
        <svg class="icon" width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774>
          <path fill="currentColor" d="M195.2 195.2a64 64 0 0190.496 0L512 421.504 738.304 195.2a64 64 0 0190.496 90.496L602.496 512 828.8 738.304a64 64 0 01-90.496 90.496L512 602.496 285.696 828.8a64 64 0 01-90.496-90.496L421.504 512 195.2 285.696a64 64 0 010-90.496z" />
        </svg>
      </i>
      <div class="content">
        <div class="nav">
          <span class="active">请选择支付方式</span>
        </div>
        <el-form :model="payForm" class="loginForm" ref="loginRef">
          <el-form-item label="支付方式">
            <el-radio-group v-model="payForm.resource">
              <el-radio label="支付宝" checked />
              <el-radio label="微信" />
            </el-radio-group>
          </el-form-item>
          <img src="@/assets/image/pay.png" alt="" style="width: 150px; height: 150px; transform: translateX(50px)" />
          <el-button type="primary" size="large" @click="pay(loginRef)">支付</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { userLogin, userRegister } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import emitter from '../util/mitt'

const props = defineProps({
  order: Object
})
const order = props.order 
console.log('pay',order)
const store = new useStore()
const router = useRouter()
const payForm = reactive({
  resource: ''
})

const close_login = () => {
  store.commit('setPayDialogState', false)
}
const loginRef = ref('loginRef')

const pay = async formEl => {
  ElMessage.success('支付成功')
  store.commit('setPayDialogState', false)
  router.replace('/paysuccess')
  store.commit('setOrderInfo',order)
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}

.box {
  width: 400px;
  height: 420px;
  background-color: white;
  border-radius: 10px;
  position: relative;
  top: calc(50vh - 210px);
  left: calc(50vw - 200px);
}

.el-icon-close {
  position: absolute;
  font-weight: bold;
  font-size: 20px;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.el-icon-close:hover {
  color: darkred;
}

.content {
  position: absolute;
  top: 40px;
  width: 280px;
  left: 60px;
}

.nav {
  font-size: 20px;
  height: 38px;
  border-bottom: 2px solid #909399;
}

.nav > span {
  margin: 0 20px 0 35px;
  color: #909399;
  user-select: none;
  cursor: pointer;
  padding-bottom: 10px;
  border-bottom: 2px solid #909399;
}

.nav > span.active {
  color: #409eff;
  border-bottom: 3px solid #409eff;
  padding-bottom: 9px;
}

.loginForm {
  .el-input,
  .el-button {
    margin-top: 40px;
  }
}
.registerForm {
  .el-input,
  .el-button {
    margin-top: 30px;
  }
  .el-select {
    width: 100%;
    margin-top: 20px;
  }
}

.el-button {
  width: 100%;
  font-size: 18px;
}
</style>
