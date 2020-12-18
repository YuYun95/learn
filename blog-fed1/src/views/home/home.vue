<template>
  <div class="home">
    <giant-screen />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GiantScreen from './components/GiantScreen.vue'

export default Vue.extend({
  name: 'Home',

  components: {
    GiantScreen
  }
})
</script>

<style lang="scss" scoped>

</style>
