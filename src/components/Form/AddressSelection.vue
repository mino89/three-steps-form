<template>
  <form @submit.prevent="checkUser" ref="form">
    <div>
      spedizione
      <hr />
    </div>
    <fieldset>
      <label for="name">Indirizzo</label>
      <input type="text" name="name" v-model="req.address" required />
    </fieldset>
    <button v-show="$store.state.isMobile" @click="$store.commit('CHANGE_COUNT',1)" >
      Precedente
    </button>
    <button v-show="$store.state.isMobile" type="submit" ref="submit">
      Successivo
    </button>
  </form>
</template>

<script>
export default {
  name: 'AddresSelection',
  props: {
    isMobile: Boolean,
    request: Object
  },

  data () {
    return {
      req: this.request
    }
  },
  mounted () {},
  methods: {
    handleSubmit () {
      this.$refs.submit.click()
    },
    checkUser () {
      this.$store.dispatch('checkAddressData', this.req)
    }
  }
}
</script>
