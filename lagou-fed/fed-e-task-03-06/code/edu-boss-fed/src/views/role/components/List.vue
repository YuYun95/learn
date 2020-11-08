<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
          <el-form-item prop="name" label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              :disabled="loading"
              type="primary"
              @click="onSubmit"
            >
              查询搜索
            </el-button>
            <el-button
              :disabled="loading"
              type="primary"
              @click="onReset"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="handleAdd">添加角色</el-button>
      <el-table
        :data="roles"
        style="width: 100%; margin-bottom: 20px;"
        v-loading="loading"
      >
        <el-table-column
          prop="id"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                size="mini"
                @click="$router.push({ name: 'alloc-menu', params: {roleId: scope.row.id}})">
                分配菜单
              </el-button>
              <el-button type="text" size="mini" @click="handleEdit(scope.row)">分配资源</el-button>
            </div>
            <div>
              <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="loading"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>

    <el-dialog
      :title="isEdit ? '编辑角色': '添加角色'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <create-or-edit-role
        v-if="dialogVisible"
        :is-edit="isEdit"
        :roleId="roleId"
        @success="onSuccess"
        @cancel="dialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRole, deleteRole } from '@/services/role'
import CreateOrEditRole from './CreateOrEdit.vue'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'List',

  components: {
    CreateOrEditRole
  },

  data () {
    return {
      form: {
        name: '',
        current: 1,
        size: 5
      },
      loading: false,
      roles: [],
      dialogVisible: false,
      totalCount: 0,
      roleId: null, // 编辑角色的id
      isEdit: false
    }
  },

  created (): void {
    this.loadRoles()
  },

  methods: {
    async loadRoles () {
      this.loading = true
      const { data } = await getRole(this.form)
      this.loading = false
      this.roles = data.data.records
      this.totalCount = data.data.total
    },

    handleAdd () {
      this.dialogVisible = true
      this.isEdit = false
    },

    onSubmit () {
      this.loadRoles()
    },

    onReset () {
      (this.$refs.form as Form).resetFields()
      this.loadRoles()
    },

    handleEdit (role: any) {
      this.dialogVisible = true
      this.roleId = role.id
      this.isEdit = true
    },

    async handleDelete (role: any) {
      try {
        await this.$confirm(`确认删除角色：${role.name}?`, '删除提示')
        await deleteRole(role.id)
        this.$message.success('删除成功')
        this.loadRoles()
      } catch (err) {
        if (err && err.response) {
          this.$message.error('删除失败，请重试')
        } else {
          this.$message.info('取消删除')
        }
      }
    },

    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第1页
      this.loadRoles()
    },

    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadRoles()
    },

    onSuccess () {
      this.dialogVisible = false
      this.form.current = 1
      this.onReset()
    }
  }
})
</script>

<style scoped>

</style>
