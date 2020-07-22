<template>
  <div class="yun-checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'YunCheckboxGroup',
  provide () {
    return {
      CheckboxGroup: this
    }
  },
  props: {
    value: {
      type: Array
    }
  }
}
</script>
