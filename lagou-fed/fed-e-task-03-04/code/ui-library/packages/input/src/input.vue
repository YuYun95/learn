<template>
  <div>
    <input v-bind="$attrs" :type="type" :value="value" @input="handleInput">
  </div>
</template>

<script>
export default {
  name: 'LgInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
      const findParent = parent => {
        while (parent) {
          if (parent.$options.name === 'LgFormItem') {
            break
          }
          parent = parent.$parent
        }
        return parent
      }
      const parent = findParent(this.$parent)
      if (parent) {
        parent.$emit('validator')
      }
    }
  }
}
</script>

<style>

</style>
