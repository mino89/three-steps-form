<template>
  <div>
    <SliderNode
      v-for="(node, i) of nodes"
      :key="i"
      :value="node"
    />
  </div>
</template>

<script>
import debounce from '../utils/debounce'
import { h } from 'vue'

const SliderNode = {
  props: {
    value: { type: [Object, Array], required: true },
    tag: { type: String, default: 'div' },
    options: {
      type: Object,
      default: () => {}
    }
  },
  render () {
    let nodes = this.value
    console.log({ nodes })
    if (!Array.isArray(nodes)) {
      nodes = [nodes]
    }
    return h(this.tag, this.options, nodes)
  },
  created () {
    console.log(this.value)
  }
}

export default {
  name: 'SliderItem',
  props: {
    count: Number,
    mobile: Boolean
  },
  components: { SliderNode },
  computed: {
    nodes () {
      return this.$slots.default()[0].children
    }
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
    switchMobileMode () {
      this.$store.commit('SWITCH_MOBILE', window.innerWidth < 768)
      if (this.isMobile) {
        this.$store.commit('CHANGE_COUNT', 0)
      }
    }
  }
}
</script>
