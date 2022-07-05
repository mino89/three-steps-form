<template>
  <form @submit.prevent="checkUser" ref="form">
      <div>
      Dati Personali
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
    <button v-show="$store.state.isMobile" @click="$store.commit('CHANGE_COUNT',0)" >
      Precedente
    </button>
    <button v-show="$store.state.isMobile" type="submit" ref="submit">Successivo</button>
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
  mounted () {},
  methods: {
    handleSubmit () {
      this.$refs.submit.click()
    },
    checkUser () {
      this.$store.dispatch('checkUserData', this.req)
    }
  }
}
</script>
