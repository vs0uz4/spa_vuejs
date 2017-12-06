import Vue from 'vue'
import TheContainer from './the-container'
import router from './router'

Vue.config.productionTip = false

window.$ = window.jQuery = require('jquery')
require('bootstrap-sass')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<the-container/>',
  components: { TheContainer }
})
