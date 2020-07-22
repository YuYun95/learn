import Vue from 'vue'
import App from './App.vue'
import YunUi from '../packages'

Vue.config.productionTip = false

Vue.use(YunUi)

new Vue({
  render: h => h(App)
}).$mount('#app')
