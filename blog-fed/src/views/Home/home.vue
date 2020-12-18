<template>
  <div class="home">
    <giant-screen />
    <div class="container-wrapper">
      <div class="container-main">
        <article-card />
      </div>
      <div class="container-right">
        <div>搜索</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GiantScreen from './components/GiantScreen.vue'
import ArticleCard from './components/ArticleCard.vue'

export default Vue.extend({
  name: 'home',

  components: {
    GiantScreen,
    ArticleCard
  }
})
</script>

<style lang="scss" scoped>
.container-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
}

.container-main {
  width: 70%;
  padding: 16px;
}

.container-right {
  width: 20%;
  padding: 16px;
  background: #fff;
}

@media screen and (min-width: 1024px) and (max-width: 1366px) {
  .container-wrapper {
    width: 850px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 1366px) {
  .container-wrapper {
    width: 850px;
    margin: 0 auto;
  }
}
</style>
