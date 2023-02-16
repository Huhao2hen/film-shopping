<template>
  <section class="user_info">
    <el-row>
      <el-col :span="8">
        <div class="my_avatar">
          <el-upload class="avatar-uploader" action="http://192.168.56.1:8000/api/file/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
          </el-upload>
          <p>Tip:点击上方头像即可更换头像</p>
        </div>
      </el-col>
      <el-col :span="16" class="my_info">
        <el-form label-width="80px" label-position="right" :rules="rules" :model="userInfo" ref="formRef">
          <el-form-item label="昵称" prop="nickname">
            <el-col :span="16">
              <el-input v-model="userInfo.nickname"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" maxlength="11">
            <el-col :span="16">
              <el-input v-model="userInfo.phone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别">
            <el-col :span="16">
              <el-select v-model="userInfo.gender" placeholder="请选择性别" style="width: 100%">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-col :span="16">
              <el-input v-model="userInfo.age"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="偏好类型" prop="movieType">
            <el-col :span="16">
              <el-select v-model="types" multiple>
                <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value" style="width: 100%"> </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="16">
              <el-date-picker type="date" placeholder="选择日期" v-model="userInfo.birth" :picker-options="pickerBirthday" style="width: 100%"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-col :span="16">
              <el-input v-model="userInfo.email"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="manageUserInfo()" class="btn">保存</el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script setup>
import { ref, computed, toRefs, reactive } from 'vue'
import { useStore } from 'vuex'
import { editUser } from '@/api/user'
import { throttle } from '@/util/throttle'
import { ElMessage } from 'element-plus'

const store = new useStore()

let userInfo = computed(() => store.state.userMsg).value
let types = ref(userInfo.interesteTag.split(','))
let throttle_editUser = throttle(editUser)
const type = [
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

const manageUserInfo = async () => {
  try {
    userInfo.interesteTag = types.value.join(',')
    const { code } = await throttle_editUser(userInfo)
    if (code === 200) {
      store.commit('setUserMsg', userInfo)
      ElMessage.success('修改信息成功')
    } else {
      ElMessage.error('修改信息失败')
    }
  } catch (err) {}
}
const handleAvatarSuccess = res => {
  userInfo.avatar = res
  ElMessage.success('头像修改成功')
}
</script>

<style lang="less" scoped>
.my_avatar {
  height: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #606266;
}
.my_info {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .btn {
    height: 50px;
    width: 250px;
    font-size: 24px;
    align-self: center;
  }
}
.avatar-uploader {
  width: 200px;
  height: 200px;
  border: 1px dashed #d9d9d9;
}
.el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 200px;
  display: block;
}
</style>
