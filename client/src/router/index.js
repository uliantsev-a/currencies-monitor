import Vue from 'vue'
import Router from 'vue-router'
import ComponentBase from '@/components/base/base.vue'
import HomePage from '@/components/home/home.vue'
import Currency from '@/components/currency/currency.vue'
import NotFound from '@/components/NotFound/NotFound.vue'
// import * as types from '@/store/mutation-types'
// import store from '@/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      abstract: true
      // Ignore or pass on to server
    },
    {
      path: '/',
      component: ComponentBase,
      redirect: 'currency',
      children: [
        {
          path: '/currency',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/currency/:name',
          name: 'currItem',
          component: Currency
          // beforeEnter: (to, from, next) => {
          //   store.dispatch(types.RATE_REQUEST, to.params.name)
          //     .then((request) => {
          //       console.info('RATE_REQUEST1')
          //       next()
          //       // next({name: 'currItem', params: {name: to.params.name}})
          //     })
          //     .catch(err => {
          //       console.error(err)
          //       next()
          //     })
          // }
        }
      ]
    },
    {
      path: '/*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
