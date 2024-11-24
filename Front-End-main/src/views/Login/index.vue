<template>
  <div class="login-container">
    <el-card class="login-box">
      <div class="login-title">登入</div>
      <el-form ref="userFormRef" :model="userInfo" :rules="rules" class="demo-ruleForm" label-width="70px" status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username" autocomplete="off" clearable type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userInfo.password" autocomplete="off" clearable show-password type="password"></el-input>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: flex-end">
          <el-button type="primary" @click="login">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { userLoginApi } from '@/api/userApi'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'login',
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    // 登入
    login () {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) return
        const res = await userLoginApi(this.userInfo)
        if (res.status !== 200) return this.resetForm() + this.$message.error(res.msg)
        await this.$store.commit('setUser', res.data)
        await this.$router.push('/user')
        this.$message.success(res.msg)
      })
    },
    resetForm () {
      this.$refs.userFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("@/assets/bj.jpg") no-repeat center / 100% 100%;
}

.login-title {
  text-align: center;
  font-size: 2em;
  font-weight: 900;
  margin-bottom: 25px;
}

.login-box {
  width: 450px;
  height: 300px;
  border-radius: 25px;
}
</style>
