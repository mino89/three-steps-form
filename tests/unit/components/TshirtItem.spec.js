import { shallowMount } from '@vue/test-utils'
import TshirtItem from '@/components/TshirtItem.vue'

describe('TshirtItem.vue', () => {
  it('renders props.color when passed', () => {
    const color = '#000000'
    const wrapper = shallowMount(TshirtItem, {
      props: { color }
    })
    expect(wrapper.element.style.getPropertyValue('fill')).toMatch(color)
  })
})
