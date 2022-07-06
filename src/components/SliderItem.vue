<template >
  <div v-for="(slot, index) of $slots" :key="index">
  {{slot}}
    <slot v-if="count == 0 || !mobile" />
  </div>
</template>
<script>
export default {
  name: 'SliderItem',
  props: {
    count: Number,
    mobile: Boolean
  },
  created () {
    console.log(Object.keys(this.$slots))
  }
}
</script>

<style>
</style>
