import * as types from '../mutation-types'
import { HTTP } from '@/main.js'

const state = {
  currencies: [],
  rateList: [],
  currentCurrency: '',
  status: '',
  status_desc: ''
}
const getters = {
  currencies: state => state.currencies,
  rateList: state => state.rateList,
  currentCurrency: state => state.currentCurrency,
  statusDescription: state => state.status_desc,
  status: state => state.status
}

const actions = {
  [types.CURRENCIES_REQUEST]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      console.info(HTTP)
      HTTP.get('/currency')
        .then(resp => {
          const data = resp.data

          commit(types.CURRENCIES_SUCCESS, data)
          resolve(resp)
        })
        .catch(err => {
          commit(types.CURRENCIES_ERROR, err)
          reject(err)
        })
    })
  },
  [types.RATE_REQUEST]: ({commit, dispatch}, nameCurr) => {
    return new Promise((resolve, reject) => {
      HTTP.get(`/currency/${nameCurr}/`)
        .then(resp => {
          const data = resp.data

          commit(types.RATE_SUCCESS, data)
          resolve(resp)
        })
        .catch(err => {
          commit(types.RATE_ERROR, err)
          reject(err)
        })
    })
  }
}

// basic mutations, showing loading, success, error to reflect the api call status and the token when loaded
const mutations = {
  [types.CURRENCIES_SUCCESS]: (state, data) => {
    state.currencies = data
  },
  [types.CURRENCIES_ERROR]: (state, err) => {
    state.status = 'error'
    state.status_desc = err.request
  },
  [types.RATE_SUCCESS]: (state, data) => {
    state.rateList = data.rates
    state.currentCurrency = data.name
  },
  [types.RATE_ERROR]: (state, err) => {
    state.status = err.request.status
    state.status_desc = err.request
    if (err.request.status === 404) {
      console.info(err.request.status)
      state.currentCurrency = 'Not found'
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
