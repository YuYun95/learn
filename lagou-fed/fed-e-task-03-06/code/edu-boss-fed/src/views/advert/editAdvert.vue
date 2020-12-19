<template>
  <div>
    <advert-form :id="id" />
  </div>
</template>

<script>
import AdvertForm from './components/AdvertForm'

export default {
  name: 'createAdvert',

  components: {
    AdvertForm
  },

  data () {
    return {
      id: ''
    }
  },

  created () {
    this.id = this.$route.params.id
  }
}
</script>

<style lang="scss" scoped>

</style>
