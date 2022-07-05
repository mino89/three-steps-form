<template>
  <div class="layout">
    <div class="col layout-preview">
      <VisualizerItem :config="configuration" :defaults="defaults" />
    </div>
    <div class="col">
      <div class="slot" v-if="!success">
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
        <button @click="submitMultiple()" v-show="!isMobile">Continua</button>
      </div>
      <div class="slot" v-show="success">
        Ci siamo ! abbiamo inviato una mail di conferma a {{ userData.email }}
        <br />
        <button @click="reload">Continua</button>
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
      'configuration',
      'userData',
      'addressData',
      'isMobile',
      'defaults'
    ])
  },
  data () {
    return {
      success: false
    }
  },
  created () {
    this.switchMobileMode()
  },
  mounted () {
    window.addEventListener(
      'resize',
      debounce(this.switchMobileMode, 500)
    )
  },
  unmounted () {
    window.removeEventListener(
      'resize',
      debounce(this.switchMobileMode, 500)
    )
  },
  methods: {
    submitMultiple () {
      this.$refs.addressSelection.handleSubmit()
      this.$refs.userData.handleSubmit()
      this.$refs.selectConf.handleSubmit()
    },

    switchMobileMode () {
      this.$store.commit(
        'SWITCH_MOBILE',
        window.innerWidth < 600
      )
      if (this.isMobile) {
        this.$store.commit('CHANGE_COUNT', 0)
      }
    },
    reload () {
      window.location.reload()
    }
  },
  watch: {
    '$store.state.message': {
      handler: function (message) {
        if (message) toaster.show(message)
      }
    },
    '$store.state.count': {
      handler: function (count) {
        if (count > 2) {
          this.$store
            .dispatch('submitData', {
              configuration: this.configuration,
              user: this.userData,
              address: this.addressData
            })
            .then(() => {
              this.success = true
            })
            .catch((error) => {
              this.$store.commit('UPDATE_MESSAGE', error.response.data.message)
            })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";
.layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  &-preview {
    display: grid;
    justify-content: center;
    align-items: center;
  }
  @media all and(min-width: 600px) {
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
