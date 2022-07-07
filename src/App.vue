<template>
  <LoadingSpinner/>
  <FormSteps />
</template>

<script>
import FormSteps from '@/components/FormSteps.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
export default {
  name: 'App',
  components: {
    FormSteps,
    LoadingSpinner
  }
}
</script>
