<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="50%"
    @close="close">
    <!--添加用户的表单-->
    <el-form v-if="type === 1" ref="addUserFormRef" :model="userInfo" :rules="userRule" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userInfo.username" clearable type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password" clearable show-password type="password"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="userInfo.age" clearable type="number"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="userInfo.address" clearable type="text"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email" clearable type="email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="userInfo.phone" clearable type="phone"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="userInfo.sex" placeholder="请选择性别">
          <el-option
            label="男"
            value="男">
          </el-option>
          <el-option
            label="女"
            value="女">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-form v-else-if="type === 2" ref="editUserFormRef" :model="dataInfo" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="dataInfo.username" clearable disabled type="text"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="dataInfo.age" clearable type="number"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="dataInfo.address" clearable type="text"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataInfo.email" clearable type="email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="dataInfo.phone" clearable type="phone"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="dataInfo.sex" placeholder="请选择性别">
          <el-option
            label="男"
            value="男">
          </el-option>
          <el-option
            label="女"
            value="女">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import { addUserApi, updateUserApi } from '@/api/userApi'

export default {
  props: {
    // 状态
    visible: {
      type: Boolean,
      required: true
    },
    // 标题
    title: {
      type: String
    },
    // 类型
    type: {
      type: Number,
      required: true
    },
    data: {
      type: Object
    }
  },
  name: 'UserDialog',
  data () {
    return {
      dialogVisible: this.dislogState,
      // 用户信息
      userInfo: {
        username: '',
        password: '',
        age: '',
        address: '',
        email: '',
        phone: '',
        sex: ''
      },
      // 添加用户的验证规则
      userRule: {
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
      },
      dataInfo: this.data
    }
  },
  methods: {
    // 关闭对话框
    close () {
      this.$emit('close', this.dialogVisible)
    },
    // 提交
    submit () {
      // 通过 type 类型来调用不同的方法
      const Obj = {
        1: () => this.addUser(),
        2: () => this.updateUserInfo()
      }
      Obj[this.type]()
    },
    // 添加用户
    addUser () {
      this.$refs.addUserFormRef.validate(async valid => {
        if (!valid) return
        const res = await addUserApi(this.userInfo)
        if (res.status !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        this.close()
      })
    },
    updateUserInfo () {
      this.$refs.editUserFormRef.validate(async valid => {
        if (!valid) return
        const res = await updateUserApi(this.dataInfo)
        if (res.status !== 200) return this.$message.error(res.msg)
        this.$message.success(res.msg)
        this.close()
      })
    }
  },
  watch: {
    'visible' (nv, ov) {
      this.dialogVisible = nv
    },
    'data' (nv, ov) {
      this.dataInfo = nv
    }
  }
}
</script>

<style scoped>

</style>
