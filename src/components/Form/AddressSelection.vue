<template>
  <form @submit.prevent="checkAddress" ref="form">
    <div>
      <h2 class="title">Spedizione</h2>
      <hr />
    </div>
    <fieldset>
      <label for="name">Indirizzo</label>
      <input type="text" name="address" v-model="req.address" required />
    </fieldset>
    <div class="buttons-container">
      <button v-show="isMobile" @click="$store.commit('CHANGE_COUNT',1)" >
        Precedente
      </button>
      <button v-show="isMobile" type="submit" ref="submit">
        Successivo
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AddressSelection',
  props: {
    request: Object
  },
  data () {
    return {
      req: this.request
    }
  },
  computed: {
    isMobile () {
      return this.$store.state.isMobile
    }
  },
  methods: {
    async handleValidation () {
      await this.$refs.submit.click()
      this.$store.commit('IS_READY_PUSH', this.$refs.form.checkValidity())
    },
    checkAddress (e) {
      if (e.currentTarget.checkValidity() && this.isMobile) {
        this.$store.dispatch('checkAddressData', this.req)
        this.$emit('finalStep', true)
      }
    }
  }
}
</script>
