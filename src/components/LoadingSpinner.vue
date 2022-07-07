<template>
  <Transition>
    <div class="loading" v-show="$store.state.loading">
      <span class="loading-bg"></span>
      <i class="loading-spinner">🍃</i>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'LoadingSpinner'
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  &-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: var(--base-color);
    opacity: 0.3;
    z-index: 999;
  }
  &-spinner {
    font-size: 10vh;
    animation: rotating 1s linear infinite;
  }
}
@keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
