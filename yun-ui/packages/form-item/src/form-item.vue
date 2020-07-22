<template>
  <div class="yun-form-item">
    <label :style="{width:this.Form.labelWidth}" class="yun-form-item_label">{{label}}</label>
    <div class="yun-form-item_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YunFormItem',

  props: {
    label: {
      type: String,
      default: ''
    }
  },

  inject: ['Form']
}
</script>

<style lang="scss" scoped>
.yun-form-item {
  margin-bottom: 25px;

  .yun-form-item_label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }

  .yun-form-item_content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    overflow: hidden;
  }
}
</style>
