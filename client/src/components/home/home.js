
import ComponentBase from '@/components/base/base.vue'
import * as types from '@/store/mutation-types'

export default {
  created() {
    this.$store.dispatch(types.CURRENCIES_REQUEST)
      .catch(err => {
        console.error(err)
      })
  },
  components: {
    ComponentBase
  },
  methods: {
    currencyClickHandler(event) {
      const nameCurr = event.target.parentElement.firstChild.textContent
      this.$router.push({name: 'currItem', params:{name:nameCurr}})
      // let self = this
      // this.$store.dispatch(types.RATE_REQUEST, nameCurr)
      //   .then((request)=>{
      //     console.info('RATE_REQUEST')
      //     let nameCurr = request.data.name
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
    }
  },
  computed: {
    currencyList() {
      return this.$store.getters.currencies
    }
  }
}
