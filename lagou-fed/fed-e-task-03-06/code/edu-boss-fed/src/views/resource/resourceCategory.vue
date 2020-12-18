<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" @click="showAdd=true">添加</el-button>
      </div>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px;"
      >
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序">
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
    </el-card>

    <add-resource-category :show-add.sync="showAdd" :category.sync="category"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllCategory, deleteCategory } from '@/services/resource'
import AddResourceCategory from './components/AddResourceCategory.vue'

export default Vue.extend({
  name: 'ResourceCategory',

  components: {
    AddResourceCategory
  },

  data () {
    return {
      showAdd: false,
      category: {},
      resources: []
    }
  },

  created () {
    this.handleLoadCategory()
  },

  methods: {
    async handleLoadCategory () {
      const { data } = await getAllCategory(null)
      this.resources = data.data
    },

    handleAdd () {
      console.log('add')
    },

    handleEdit (item: any) {
      this.category = item
      this.showAdd = true
    },

    handleDelete (item: any) {
      this.$confirm(`确定删除${item.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteCategory(item.id)
        this.$message.success('操作成功')
        this.handleLoadCategory()
      })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
