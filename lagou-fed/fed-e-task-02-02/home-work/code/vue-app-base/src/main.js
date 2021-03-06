import Vue from 'vue'
import App from './App.vue'

import './style.less'
import './assets/font/iconfont.css'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
