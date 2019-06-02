import Vue from 'vue'
import Vuex from 'vuex'
import trades from './modules/trades'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    trades
  },
  strict: debug
})
