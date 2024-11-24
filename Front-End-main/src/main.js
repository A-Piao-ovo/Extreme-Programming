import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/global.less'
import '@/utils/element-ui'

Vue.config.productionTip = false

Vue.filter('dateFormat', (v) => {
  return new Date(Number(v)).toLocaleString()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
