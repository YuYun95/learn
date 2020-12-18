<template>
  <div class="layout">

    <router-view />

    <footer class="footer-wrapper">
      <div class="">备案号：</div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'index',

  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.footer-wrapper {
  margin-top: 45px;
  padding: 50px 0;
  text-align: center;
  background-color: #fff;
}
</style>
