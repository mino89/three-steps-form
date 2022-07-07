<template>
  <div class="layout">
    <div class="col layout-preview">
      <VisualizerItem :config="configuration" :defaults="defaults" />
    </div>
    <div class="col">
      <div class="slot">
        <h1 class="main-title main-title-spaces">Configura la tua t-shirt!</h1>
        <div v-if="!success">
          <SelectConf
            :request="configuration"
            :defaults="defaults"
            ref="selectConf"
            v-show="count == 0 || !isMobile"
          />
          <UserData
            :request="userData"
            ref="userData"
            v-show="count == 1 || !isMobile"
          />
          <AddressSelection
            :request="addressData"
            ref="addressSelection"
            v-show="count == 2 || !isMobile"
          />
          <div class="buttons-container">
            <button class="submit-form" @click="submitMultiple()" v-show="!isMobile">Continua</button>
          </div>
        </div>
        <div class="final-step" v-show="success">
          <hr>
          <br>
          Ci siamo ! abbiamo inviato una mail di conferma a {{ userData.email }}
          <br>
          <br>
          <div class="buttons-container alt-class">
            <button @click="reload">Continua</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectConf from './Form/SelectConf.vue'
import UserData from './Form/UserData.vue'
import AddressSelection from './Form/AddressSelection.vue'
import VisualizerItem from './VisualizerItem.vue'
import { createToaster } from '@meforma/vue-toaster'
import { mapState } from 'vuex'
import debounce from '../utils/debounce'
const toaster = createToaster({
  type: 'error'
})
export default {
  name: 'FormSteps',
  components: {
    SelectConf,
    UserData,
    AddressSelection,
    VisualizerItem
  },
  computed: {
    ...mapState([
      'count',
      'success',
      'configuration',
      'userData',
      'addressData',
      'isMobile',
      'defaults'
    ])
  },
  created () {
    this.switchMobileMode()
  },
  mounted () {
    window.addEventListener('resize', debounce(this.switchMobileMode, 500))
  },
  unmounted () {
    window.removeEventListener('resize', debounce(this.switchMobileMode, 500))
  },
  methods: {
    // submit methods of child components are triggered in desktop mode
    submitMultiple () {
      this.$refs.addressSelection.handleSubmit()
      this.$refs.userData.handleSubmit()
      this.$refs.selectConf.handleSubmit()
    },
    // send to store currendt mode setting
    switchMobileMode () {
      this.$store.commit('SWITCH_MOBILE', window.innerWidth < 768)
      // if the window is resized it resets the order of elements to first
      if (this.isMobile) {
        this.$store.commit('CHANGE_COUNT', 0)
      }
    },
    // reload the page at the end of last step
    reload () {
      window.location.reload()
    }
  },
  watch: {
    // show toaster when message state changes
    '$store.state.message': {
      handler: function (message) {
        if (message) toaster.show(message)
      }
    },
    // in last step we will send all data to backend
    '$store.state.count': {
      handler: function (count) {
        if (count > 2) {
          this.$store.dispatch('submitData', {
            configuration: this.configuration,
            user: this.userData,
            address: this.addressData
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 65vh 1fr;
  &-preview {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-rows: 1fr;

  }
  @media all and(min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    min-height: 100vh;
    grid-auto-flow: column;
  }
}
.col {
  display: grid;
  align-items: center;
  position: relative;
}
</style>
