<template>
  <form @submit.prevent="checkAvailability">
    <div>
      <h2 class="title">Seleziona le opzioni</h2>
      <hr />
    </div>
    <fieldset>
      <label> Taglia </label>
      <div class="radio-group">
        <div class="radio-item" v-for="item in defaults.sizes" :key="item">
          <label :for="item">{{ item }}</label>
          <input
            type="radio"
            :id="item"
            name="size"
            :value="item"
            v-model="req.size"
            required
          />
        </div>
      </div>
    </fieldset>
    <fieldset>
      <label> Colore </label>
      <div class="radio-group">
        <div class="radio-item" v-for="item in defaults.colors" :key="item">
          <label :for="item.id">
            <div class="square" :style="{ background: item.value }"></div>
          </label>
          <input
            type="radio"
            :id="item.id"
            name="color"
            :value="item.id"
            v-model="req.color"
            required
          />
        </div>
      </div>
    </fieldset>
    <fieldset>
      <label> Emote </label>
      <div class="radio-group">
        <div class="radio-item" v-for="item in defaults.emotes" :key="item">
          <label class="emote" :for="item.id">{{ item.value }}</label>
          <input
            type="radio"
            :id="item.id"
            name="emote"
            :value="item.id"
            v-model="req.emote"
            required
          />
        </div>
      </div>
    </fieldset>
    <div class="buttons-container">
      <button v-show="$store.state.isMobile" type="submit" ref="submit">
        Continua
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SelectConf',
  props: {
    request: Object,
    defaults: Object
  },
  data () {
    return {
      req: this.request
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.submit.click()
    },
    checkAvailability () {
      this.$store.dispatch('checkConfiguration', this.req)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio {
  &-group {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  &-item {
    display: flex;
    flex-direction: column;
    label {
      cursor: pointer;
      padding: 0.5rem;
    }

  }
}
.emote{
  font-size: 2.5rem;
}
.square {
  height: 24px;
  width: 24px;
  border-radius: 6px;
}
</style>
