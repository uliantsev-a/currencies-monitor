
import ComponentBase from '@/components/base/base.vue'
import * as types from '@/store/mutation-types'

export default {
  components: {
    ComponentBase
  },
  created() {
    let nameCurr = this.$route.params.name

    this.$store.dispatch(types.RATE_REQUEST, nameCurr)
    .then((request)=>{
      console.info('RATE_REQUEST')
      // let nameCurr = request.data.name
      // self.$router.push({name: 'currItem', params:{name:nameCurr}})
    })
    .catch(err => {
      console.error(err.request)
      console.error(err)
      console.error(err)
      // this.$router.push({name: 'not-found'})
    })
  },
  computed: {
    rateList() {
      return this.$store.getters.rateList
    },
    currentCurrency() {
      return this.$store.getters.currentCurrency
    },
    rStatus() {
      return this.$store.getters.status
    }
  }
}
