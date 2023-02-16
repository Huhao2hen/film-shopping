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
          <span :class="{ active: method === 'isLogin' }" @click="change_method('isLogin')">用户登录</span>
          <span :class="{ active: method === 'isRegister' }" @click="change_method('isRegister')">用户注册</span>
        </div>
        <el-form :model="loginForm" :rules="loginRules" v-if="method === 'isLogin'" class="loginForm" ref="loginRef">
          <el-form-item prop="userLoginName">
            <el-input placeholder="用户名" prefix-icon="user" v-model="loginForm.userLoginName" clearable size="large"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码" prefix-icon="Lock" v-model="loginForm.password" clearable show-password size="large" @keydown.enter="login(loginRef)">
              <el-icon>
                <lock />
              </el-icon>
            </el-input>
          </el-form-item>
          <el-button type="primary" size="large" @click="login(loginRef)">登录</el-button>
        </el-form>
        <el-form :model="registerForm" :rules="registerRules" v-if="method === 'isRegister'" class="registerForm" ref="registerRef">
          <el-form-item prop="userLoginName">
            <el-input placeholder="用户名" prefix-icon="user" v-model="registerForm.userLoginName" clearable @blur="check_mobile" size="large"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码" show-password prefix-icon="lock" v-model="registerForm.password" clearable size="large"></el-input>
          </el-form-item>
          <el-form-item prop="interestMovieTag">
            <el-select v-model="interestTag" multiple placeholder="选择您喜欢的电影类型" size="large" multiple-limit="3">
              <el-option v-for="item in movieType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" size="large" @click="register(registerRef)">注册</el-button>
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

const store = new useStore()
const reset = () => {
  ;(loginForm.userLoginName = ''), (loginForm.password = ''), (registerForm.userLoginName = ''), (registerForm.password = ''), (registerForm.interestMovieTag = '')
  interestTag.value = []
}
let method = ref('isLogin')
let toDo = ref('登录')
const loginForm = reactive({
  userLoginName: '',
  password: ''
})
const registerForm = reactive({
  userLoginName: '',
  password: '',
  interestMovieTag: ''
})
const loginRules = reactive({
  userLoginName: [
    {
      required: true,
      message: '请输入登录用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入登录密码',
      trigger: 'blur'
    }
  ]
})
const registerRules = reactive({
  userLoginName: [
    {
      required: true,
      message: '请输入注册用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入注册密码',
      trigger: 'blur'
    }
  ],
  interestMovieTag: [
    {
      required: true,
      message: '请选择您感兴趣的电影标签',
      trigger: 'blur'
    }
  ]
})
const interestTag = ref([])
const movieType = [
  {
    value: '爱情',
    label: '爱情'
  },
  {
    value: '喜剧',
    label: '喜剧'
  },
  {
    value: '动画',
    label: '动画'
  },
  {
    value: '剧情',
    label: '剧情'
  },
  {
    value: '惊悚',
    label: '惊悚'
  },
  {
    value: '科幻',
    label: '科幻'
  },
  {
    value: '动作',
    label: '动作'
  },
  {
    value: '悬疑',
    label: '悬疑'
  },
  {
    value: '奇幻',
    label: '奇幻'
  },
  {
    value: '武侠',
    label: '武侠'
  },
  {
    value: '历史',
    label: '历史'
  },
  {
    value: '恐怖',
    label: '恐怖'
  },
  {
    value: '战争',
    label: '战争'
  },
  {
    value: '冒险',
    label: '冒险'
  },
  {
    value: '犯罪',
    label: '犯罪'
  },
  {
    value: '纪录片',
    label: '纪录片'
  }
]
const change_method = changemethod => {
  method.value = changemethod
  reset()
}
const close_login = () => {
  store.commit('chageLoginPopup', false)
}
const loginRef = ref('loginRef')
const login = async formEl => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (valid) {
      const { code, data } = await userLogin(loginForm)
      if (code == 200) {
        localStorage.setItem('token', data)
        ElMessage.success('登陆成功')
        store.commit('chageLoginPopup', false)
        store.commit('chageLogin', true)
        store.dispatch('saveUserMsg', loginForm.userLoginName)
        reset()
      } else {
        ElMessage.error(data)
      }
    } else {
      return false
    }
  })
}
const register = async formEl => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (valid) {
      const { code, data } = await userRegister(loginForm)
      if (code == 200) {
        ElMessage.success('注册成功')
        reset()
      } else {
        ElMessage.error(data)
      }
    } else {
      return false
    }
  })
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
