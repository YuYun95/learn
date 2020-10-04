<template>
  <a
          :href="disabled ? null : href"
          :class="[disabled && 'disabled', !underline && 'no-underline']">
    <slot/>
  </a>
</template>

<script>
export default {
  name: 'ZyhLink',
  props: {
    href: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .disabled {
    cursor: not-allowed;
  }

  .no-underline {
    text-decoration: none;
  }
</style>
