<template>
  <div class="advert">
    <list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import List from './components/List.vue'

export default Vue.extend({
  name: 'AdvertIndex',

  components: {
    List
  }
})
</script>

<style lang="scss" scoped>

</style>
