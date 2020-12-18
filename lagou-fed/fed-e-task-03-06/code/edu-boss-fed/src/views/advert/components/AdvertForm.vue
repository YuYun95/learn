<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="广告名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="广告位置" prop="spaceId">
          <el-select v-model="form.spaceId" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :on-success="handleUploadSuccess"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file">
              <img
                class="el-upload-list__item-thumbnail"
                :src="form.img" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="广告链接：" prop="endTime">
          <el-input v-model="form.link"></el-input>
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
export default {
  name: 'AdvertForm',

  data () {
    return {
      form: {
        endTime: '2020-12-18T16:00:00.000Z',
        img: 'https://edu-lagou.oss-cn-beijing.aliyuncs.com/images/2020/12/18/16082830664951765.png',
        link: 'link',
        name: 'name',
        sort: 0,
        spaceId: 3,
        startTime: '2020-12-18T09:17:43.000Z',
        status: 1,
        text: 'beizdd'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    onSubmit () {
      console.log('submit!')
    },

    handleUploadSuccess(res, file, fileList) {

    },

    handleRemove (file) {
      console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
