<template>
  <div>
    <button @click="handleClick">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'LgFButton',
  methods: {
    handleClick (event) {
      this.$emit('click', event)
      event.preventDefault()
    }
  }
}
</script>

<style>

</style>
