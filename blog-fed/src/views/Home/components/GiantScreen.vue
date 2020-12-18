<template>
  <div class="giant-screen">
    <div class="img-outer">
      <div class="banner-title">
        <h1>标题、logo</h1>
      </div>
      <img class="banner-image" src="@/assets/main1.jpg">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'GiantScreen'
})
</script>

<style lang="scss" scoped>
.giant-screen {
  z-index: 8;
  position: relative;
  margin: 0;
  line-height: 0;
}

.img-outer {
  position: relative;
  background-image: url("../../../assets/main1.jpg");
  display: block;
  line-height: 0;
  background-color: #495150;
  background-position: center top;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100% auto;
}

.banner-title {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  line-height: 0;
  text-align: center;

  a {
    padding: 48px;
  }
}

.banner-image {
  max-width: 100%;
  margin-left: -999em;
}
</style>
