<template>
  <form @submit.prevent="checkUser" ref="form">
      <div>
      <h2 class="title">Dati Personali</h2>
      <hr>
    </div>
    <fieldset>
      <label for="name">Nome</label>
      <input type="text" name="name" v-model="req.name" required />
    </fieldset>
    <fieldset>
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        v-model="req.email"
        required
      />
    </fieldset>
    <div class="buttons-container">
      <button v-show="isMobile" @click="$store.commit('CHANGE_COUNT',0)" >
        Precedente
      </button>
      <button v-show="isMobile" type="submit" ref="submit">Successivo</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'UserData',
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
    checkUser (e) {
      if (e.currentTarget.checkValidity() && this.isMobile) {
        this.$store.dispatch('checkUserData', this.req)
      }
    }
  }
}
</script>
