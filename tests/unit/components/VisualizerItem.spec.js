import { shallowMount } from '@vue/test-utils'
import VisualizerItem from '@/components/VisualizerItem.vue'

describe('VisualizerItem.vue', () => {
  const $store = {
    state: {
      defaults: {
        sizes: ['XS', 'S', 'M', 'L', 'XXL'],
        colors: [
          { id: 'red', value: '#f54b42' },
          { id: 'yellow', value: '#f5e642' },
          { id: 'green', value: '#48f542' },
          { id: 'orange', value: '#f5aa42' },
          { id: 'grey', value: '#d1d1d1' }
        ],
        emotes: [
          { id: "cactus", value: "🌵" },
          { id: "pine", value: "🌲" },
          { id: "palm", value: "🌴" },
          { id: 'sun', value: '☀️' },
          { id: 'star', value: '✨' }
        ]
      },
      configuration: {
        color: 'red',
        emote: 'cactus'
      }
    },
  }

  const config = $store.state.configuration
  const defaults = $store.state.defaults

  const wrapper = shallowMount(VisualizerItem, {
    props: {
      config,
      defaults
    }
  })

  it('must render computed properties', () => {
    expect(wrapper.vm.color).toBe(defaults.colors[0].value)
    expect(wrapper.vm.emote).toBe(defaults.emotes[0].value)
  })


  it('must render computed properties when they changes', () => {
    wrapper.vm.config.color = 'yellow'
    wrapper.vm.config.emote = 'pine'
    expect(wrapper.vm.color).toBe(defaults.colors[1].value)
    expect(wrapper.vm.emote).toBe(defaults.emotes[1].value)
  })
})
