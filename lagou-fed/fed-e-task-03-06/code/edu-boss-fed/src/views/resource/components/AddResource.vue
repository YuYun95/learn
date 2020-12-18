<template>
  <el-dialog :visible="showAdd" @close="$emit('update:showAdd', false)">
    <el-form :model="resourceForm" :rules="rules" ref="resourceForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="资源名称：" prop="name">
        <el-input v-model="resourceForm.name"></el-input>
      </el-form-item>
      <el-form-item label="资源路径：" prop="url">
        <el-input v-model="resourceForm.url"></el-input>
      </el-form-item>
      <el-form-item label="资源分类：" prop="categoryId">
        <el-select v-model="resourceForm.categoryId" placeholder="请选择资源分类" style="width: 100%;">
          <el-option v-for="(ca,index) in options " :label="ca.name" :value="ca.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model="resourceForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('resourceForm')">确 定</el-button>
        <el-button @click="handleCancel('resourceForm')">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getAllCategory, saveOrUpdate } from '@/services/resource'

export default {
  name: 'add',

  props: {
    showAdd: {
      type: Boolean,
      default: false
    },
    resourceFormProp: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      options: [],
      resourceForm: {
        name: '',
        categoryId: '',
        url: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入资源路径', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择资源分类', trigger: 'change' }]
      }
    }
  },

  watch: {
    resourceFormProp: {
      handler (value) {
        if (value.name) {
          this.resourceForm.name = value.name
          this.resourceForm.id = value.id
          this.resourceForm.categoryId = value.categoryId
          this.resourceForm.url = value.url
          this.resourceForm.description = value.description
        }
      },
      deep: true,
      immediate: true
    }
  },

  created () {
    this.handleGetAllCategory()
  },

  methods: {
    async handleGetAllCategory () {
      const res = await getAllCategory()
      this.options = res.data.data
    },

    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await saveOrUpdate(Object.assign({}, this.resourceForm))
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
      this.$emit('update:resourceFormProp', {})
      this.resourceForm = {
        name: '',
        categoryId: '',
        url: '',
        description: ''
      }
      this.$parent.loadResources()
      this.$emit('update:showAdd', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
