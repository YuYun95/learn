<template>
  <div class="alloc-menu">
    分配菜单
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AllocMenu',

  props: {
    roleId: { // 参数和路由解耦了，也可以作为普通组件使用
      type: [String, Number],
      required: true
    }
  }
})
</script>

<style scoped>

</style>
