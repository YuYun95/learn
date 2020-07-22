<template>
  <div class="yun-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'YunRadioGroup',

  props: {
    value: null
  },

  provide () {
    return {
      RadioGroup: this
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
