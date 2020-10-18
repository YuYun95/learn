<template>
  <div id="app">
    <!-- 跟路由出口 -->
    <router-view/>

    <p class="text">hell</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss">
.text{
  color: $success-color;
}
</style>
