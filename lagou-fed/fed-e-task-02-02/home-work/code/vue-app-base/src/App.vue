<template>
  <div id="app">
    <i class="iconfont icon-home"></i>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import $ from 'jquery'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    $('#app').on('click', () => {
      console.log('click app')
    })
  }
}
</script>

<style>
#app {
  margin-top: 60px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}

.icon-home {
  color: red;
}
</style>
