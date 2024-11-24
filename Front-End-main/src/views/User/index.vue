<template>
  <div class="user-container">
    <el-card>
   <h1 style="padding: 10px 0;">用户信息表</h1>
      <el-form>
        <el-row :gutter="20">
          <el-col :span="2">
            <el-button type="primary" @click="addUser">添加用户</el-button>
          </el-col>
          <el-col :span="8">
            <el-input v-model="queryInfo.query" class="input-with-select" placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-form>
      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="userList"
        border
        style="width: 100%">
        <el-table-column
          label="#"
          type="index"
          width="45">
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="username"
          width="120">
        </el-table-column>
        <el-table-column
          label="年龄"
          prop="age"
          width="80"
          >
        </el-table-column>
        <el-table-column
          label="地址"
          prop="address">
        </el-table-column>
        <el-table-column
          label="邮箱"
          prop="email">
        </el-table-column>
        <el-table-column
          label="电话"
          prop="phone">
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template #default="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column
          label="上次登入时间">
          <template #default="scope">
            {{ scope.row.lastLogin_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="80px">
          <template #default="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="updateState(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template #default="scope">
            <el-tooltip :enterable="false" content="编辑" placement="top">
              <el-button icon="el-icon-edit" round size="mini" type="primary" @click="updateUserInfo(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="删除" placement="top">
              <el-button icon="el-icon-delete" round size="mini" type="danger"
                         @click="deleteUser(scope.row._id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        :page-sizes="[1, 3, 5, 10]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>

    <UserDialog :title="dialogTitle" :type="dialogType" :visible="dialogVisible" :data="dialogData" @close="close"></UserDialog>
  </div>
</template>

<script>
import { deleteUserApi, getUserListApi, updateUserStateApi } from '@/api/userApi'
import UserDialog from '@/components/UserDialog'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'user',
  components: {
    UserDialog
  },

  data () {
    return {
      // 查询参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 用户数据列表
      userList: [],
      roleList: [],
      total: 0,
      count: 0,
      loading: true,
      dialogVisible: false,
      dialogType: 1,
      dialogTitle: '添加用户',
      dialogData: {}
    }
  },
  methods: {
    // 获取用户数据列表
    async getUserList () {
      this.loading = true
      const res = await getUserListApi(this.queryInfo)
      if (res.status !== 200) return this.$message.error(res.msg)
      this.userList = res.data
      this.total = res.total
      this.count = res.count
      this.loading = false
    },
    handleSizeChange (v) {
      this.queryInfo.pagesize = v
      this.getUserList()
    },
    handleCurrentChange (v) {
      this.queryInfo.pagenum = v
      this.getUserList()
    },
    // 搜索
    search () {
      this.getUserList()
    },
    // 删除用户
    deleteUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteUserApi(id)
        if (res.status !== 200) return this.$message.error(res.msg)
        await this.getUserList()
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 更新用户状态
    async updateState (scope) {
      const {
        _id,
        state
      } = scope
      const res = await updateUserStateApi(_id, state)
      if (res.status !== 200) return this.$message.error(res.msg)
      await this.getUserList()
      this.$message.success(res.msg)
    },
    // 添加用户
    addUser () {
      this.dialogType = 1
      this.dialogTitle = '添加用户'
      this.dialogVisible = true
    },
    updateUserInfo (data) {
      this.dialogType = 2
      this.dialogTitle = '编辑用户'
      this.dialogVisible = true
      this.dialogData = data
    },
    // 关闭对话框
    close () {
      this.dialogVisible = false
    }
  },
  filters: {
    nameFormat (v, arr) {
      const array = arr.filter(item => item._id === v)
      return array[0].name
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.user-container {
   padding: 80px;
}
</style>
