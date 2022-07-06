<template>
    <span class="tshirt-background" :style="{ background: color }"></span>

  <div class="tshirt-container slot">
    <i class="tshirt-icon">{{ emote }}</i>
    <tshirt-item class="tshirt-sticky-item" :color="color" />
  </div>
</template>

<script>
import TshirtItem from './TshirtItem.vue'
export default {
  components: { TshirtItem },
  name: 'VisualizerItem',
  props: {
    config: Object,
    defaults: Object
  },
  computed: {
    dynamicBg () {
      return {
        // in the case of redComp, greenComp and blueComp are a vue prop or data
        background: 'green'
      }
    },
    size () {
      return this.config.size ? this.config.size : 'M'
    },
    color () {
      return this.config.color
        ? this.defaults.colors.find((x) => x.id === this.config.color).value
        : '#000000'
    },
    emote () {
      return this.config.emote
        ? this.defaults.emotes.find((x) => x.id === this.config.emote).value
        : '🖌'
    }
  }
}
</script>

<style lang="scss" scoped>
.tshirt {
  &-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: clamp(35vw, 40vw, 35vw);
    position: relative;
  }
  &-background {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    opacity: .25;
    transition: all .3s ease;
  }

  &-icon {
    position: absolute;
    font-size:  clamp(1rem, 10vw, 8rem);
    font-style: normal;
  }
}
</style>
