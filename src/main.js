import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Gravatar from 'vue-gravatar'
import TheContainer from './the-container'
import router from './router'
import store from './store'
import eventBus from './plugins/event-bus'

window.$ = window.jQuery = require('jquery')
require('bootstrap-sass')

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(eventBus)

Vue.component('v-gravatar', Gravatar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<the-container/>',
  components: { TheContainer }
})
