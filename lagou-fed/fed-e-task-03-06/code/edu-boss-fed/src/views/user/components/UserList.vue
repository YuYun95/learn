<template>
  <el-card>
    <div slot="header">
      <el-form :model="filterParams" ref="filter-form">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="filterParams.phone"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="rangeDate">
          <el-date-picker
            v-model="filterParams.rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"/>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="loading" @click="handleReset">重置</el-button>
          <el-button type="primary" :disabled="loading" @click="handleQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="users"
      style="width: 100%"
      v-loading="loading">
      <el-table-column prop="id" label="用户ID"/>
      <el-table-column prop="name" label="头像">
        <template slot-scope="scope">
          <img width="30px"
               :src="scope.row.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名"/>
      <el-table-column prop="phone" label="手机号"/>
      <el-table-column prop="createTime" label="注册时间"/>
      <el-table-column
        prop="name"
        label="状态"
        align="center">
        <template slot-scope="scope">
          <i
            class="status"
            :class="scope.row.status === 'DISABLE' ? 'status-danger' : 'status-success'"
            @click="handleForbidUser(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'ENABLE'" type="text" @click="handleForbidUser(scope.row)">禁用
          </el-button>
          <el-button type="text" @click="handleSelectRole(scope.row)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :disabled="loading"
      :current-page.sync="filterParams.current"
      :page-sizes="[5, 10, 20]"
      :page-size="filterParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>

    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="50%">
      <el-select v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAllocRole">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { forbidUser, getUserPages } from '@/services/user'
import { getAllRole, allocateUserRoles, getUserRoles } from '@/services/role'

export default Vue.extend({
  name: 'UserList',

  data () {
    return {
      filterParams: {
        currentPage: 1,
        pageSize: 5,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: ''
      },
      totalCount: 0,
      users: [],
      loading: false,
      dialogVisible: false,
      roles: [],
      roleIdList: [],
      currentUser: {} // 分配角色的当前用户
    }
  },

  created (): void {
    this.loadUsers()
  },

  methods: {
    async loadUsers () {
      this.loading = true
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const { data } = await getUserPages(this.filterParams)
      this.users = data.data.records
      this.loading = false
      this.totalCount = data.data.total
    },

    async handleForbidUser (user: any) {
      try {
        await forbidUser(user.id)
        if (user.status === 'DISABLE') {
          user.status = 'ENABLE'
        } else {
          user.status = 'DISABLE'
        }
      } catch (e) {
        console.dir(e)
      }
    },

    handleQuery () {
      this.filterParams.currentPage = 1
      this.loadUsers()
    },

    handleReset () {
      (this.$refs['filter-form'] as Form).resetFields()
      this.loadUsers()
    },

    async handleSelectRole (role: object) {
      // 加载角色列表
      this.currentUser = role
      const { data } = await getAllRole()
      this.roles = data.data

      const { data: { data: userRoles } } = await getUserRoles((this.currentUser as any).id)
      this.roleIdList = userRoles.map((item: any) => item.id)

      // 展示对话框
      this.dialogVisible = true
    },

    async handleAllocRole () {
      const { data } = await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList
      })
      this.$message.success('操作成功')
      this.dialogVisible = false
    },

    handleSizeChange (val: number) {
      this.filterParams.pageSize = val
      this.filterParams.currentPage = 1
      this.loadUsers()
    },

    handleCurrentChange (val: number) {
      this.filterParams.currentPage = val
      this.loadUsers()
    }
  }
})
</script>

<style scoped lang="scss">
.status {
  display: inline-block;
  cursor: pointer;
  width: .875rem;
  height: .875rem;
  vertical-align: middle;
  border-radius: 50%;
}

.status-danger {
  background: #ff6b6b;
}

.status-success {
  background: #51cf66;
}
</style>
