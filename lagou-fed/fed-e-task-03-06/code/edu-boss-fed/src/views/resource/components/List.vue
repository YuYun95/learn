<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select v-model="form.categoryId" clearable>
              <el-option
                v-for="item in resourceCategories"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              :disabled="isLoading"
              type="primary"
              @click="onSubmit"
            >
              查询搜索
            </el-button>
            <el-button
              :disabled="isLoading"
              type="primary"
              @click="onReset"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
        <el-button size="small" @click="handleAdd">添加</el-button>
        <el-button size="small" @click="$router.push({ name: 'resourceCategory'})">资源分类</el-button>
      </div>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px;"
        v-loading="isLoading"
      >
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
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
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>

    <add-resource :show-add.sync="showAdd" :resource-form-prop.sync="resourceForm" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getResourcePages, deleteResource } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import AddResource from './AddResource.vue'

export default Vue.extend({
  name: 'ResourceList',

  components: {
    AddResource
  },

  data () {
    return {
      resourceForm: {},
      showAdd: false,
      resources: [],
      form: {
        name: '',
        url: '',
        current: 1, // 默认查询第1页数据
        size: 5,
        categoryId: null
      },
      totalCount: 0,
      resourceCategories: [],
      isLoading: true // 加载状态
    }
  },

  created () {
    this.loadResources()
    this.loadResourceCategories()
  },

  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },

    async loadResources () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
    },

    onSubmit () {
      this.form.current = 1
      this.loadResources()
    },

    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResources()
    },

    handleEdit (item: any) {
      this.showAdd = true
      this.resourceForm = item
    },

    handleDelete (item: any) {
      this.$confirm(`确定删除${item.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteResource(item.id)
        this.$message.success('操作成功')
        this.loadResources()
      })
    },

    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第1页
      this.loadResources()
    },

    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResources()
    },

    handleAdd () {
      this.showAdd = true
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
