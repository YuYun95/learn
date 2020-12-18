<template>
  <el-dialog title="添加分类" :visible="showAdd" @close="$emit('update:showAdd', false)">
    <el-form :model="resourceCategory" :rules="rules" ref="resourceCategory" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="resourceCategory.name"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input v-model="resourceCategory.sort"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('resourceCategory')">确 定</el-button>
        <el-button @click="handleCancel('resourceCategory')">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { saveOrderUpdate } from '@/services/resource'

export default {
  name: 'AddResourceCategory',

  props: {
    showAdd: {
      type: Boolean,
      default: false
    },
    category: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      resourceCategory: {
        name: '',
        sort: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      }
    }
  },

  watch: {
    category: {
      deep: true,
      immediate: true,
      handler (value) {
        if (value.name) {
          this.resourceCategory.id = value.id
          this.resourceCategory.name = value.name
          this.resourceCategory.sort = value.sort
        }
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await saveOrderUpdate(Object.assign({}, this.resourceCategory))
            this.$message.success('操作成功')
            this.handleCancel(formName)
          } catch (e) {
            console.log(e)
          }
        } else {
          return false
        }
      })
    },

    handleCancel () {
      this.resourceCategory = {
        id: '',
        name: '',
        sort: ''
      }
      this.$emit('update:category', {})
      this.$parent.handleLoadCategory()
      this.$emit('update:showAdd', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
