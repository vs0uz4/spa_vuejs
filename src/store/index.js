import Vue from 'vue'
import Vuex from 'vuex'

import categories from '@app/categories/store'

Vue.use(Vuex)

const modules = {
  categories
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules,
  state: {}
})
