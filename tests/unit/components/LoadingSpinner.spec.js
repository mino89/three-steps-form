import { shallowMount } from '@vue/test-utils'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import store from '@/store'

describe('TshirtItem.vue', () => {
  const wrapper = shallowMount(LoadingSpinner, {
    global: {
        plugins: [store]
  
      },
  })
  it('renders if is loading', async () => {
    await store.commit('UPDATE_LOADING', true)
    expect(wrapper.find('.loading').isVisible()).toBe(true)
  })
  it('hide if is loading', async () => {
    await store.commit('UPDATE_LOADING', false)
    expect(wrapper.find('.loading').isVisible()).toBe(false)
  })
})
