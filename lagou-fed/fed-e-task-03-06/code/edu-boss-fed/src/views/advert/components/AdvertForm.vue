<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" :rules="rules"  label-width="100px">
        <el-form-item label="广告名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="广告位置" prop="spaceId">
          <el-select v-model="form.spaceId" placeholder="请选择活动区域">
            <el-option
              v-for="space in spaceList"
              :label="space.name"
              :value="space.id"
              :key="space.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始时间" />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间" />
        </el-form-item>
        <el-form-item label="上线/下线" prop="status">
          <el-radio-group v-model="form.status" size="medium">
            <el-radio :label="0">下线</el-radio>
            <el-radio :label="1">上线</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公共图片" prop="status">
          <el-upload
            action="http://eduboss.lagou.com/boss/course/upload"
            list-type="picture-card"
            :limit="1"
            :auto-upload="true"
            :on-success="handleUploadSuccess"
            :on-exceed="handleBeforeUpload"
            :on-remove="handleRemove"
            :file-list="picList"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="广告链接：" prop="endTime">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="广告备注：">
          <el-input type="textarea" v-model="form.text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getAllSpaces, adSaveOrUpdate, getAdById } from '@/services/advert'

export default {
  name: 'AdvertForm',

  props: {
    id: {
      type: [String, Number],
      default: ''
    }
  },

  data () {
    return {
      spaceList: [],
      picList: [],
      form: {
        endTime: '',
        img: '',
        link: '',
        name: '',
        sort: 0,
        spaceId: '',
        startTime: '',
        status: 1,
        text: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '选择日期', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '选择日期', trigger: 'change' }
        ],
        link: [
          { required: true, message: '请输入链接', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.handleGetAllSpaces()
    if (this.id) {
      this.handleGetAdById()
    }
  },

  methods: {

    async handleGetAdById () {
      const res = await getAdById({ id: this.id })
      this.form = Object.assign({}, this.form, res.data.content)
      this.picList.push({ url: res.data.content.img })
      console.log(this.form)
    },

    async handleGetAllSpaces () {
      const res = await getAllSpaces()
      this.spaceList = res.data.content
    },

    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await adSaveOrUpdate(this.form)
          if (res.data.success) {
            this.$message.success('添加成功')
            this.$router.push({ name: 'advert' })
          }
        }
      })
    },

    handleUploadSuccess (res) {
      this.form.img = res.data.name
      this.picList.push({ url: res.data.name })
    },

    handleBeforeUpload () {
      this.$message.error('每个板块只能上传一张图片！请先移除图片再上传')
    },

    handleRemove () {
      this.form.img = ''
      this.picList.pop()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
