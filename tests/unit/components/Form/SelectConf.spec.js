import { shallowMount } from '@vue/test-utils'
import SelectConf from '@/components/Form/SelectConf.vue'

describe('SelectConf.vue', () => {
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
          { id: 'cactus', value: '🌵' },
          { id: 'pine', value: '🌲' },
          { id: 'palm', value: '🌴' },
          { id: 'sun', value: '☀️' },
          { id: 'star', value: '✨' }
        ]
      },
      configuration: {
        size: null,
        color: null,
        emote: null
      }
    }
  }

  const request = $store.state.configuration
  const defaults = $store.state.defaults



  const wrapper = shallowMount(SelectConf, {
    global: {
      mocks: {
        $store
      }
    },
    props: { request, defaults }

  })

  const sizeInputs = wrapper.findAll('input[name=size]')
  const colorInputs = wrapper.findAll('input[name=color]')
  const emoteInputs = wrapper.findAll('input[name=emote]')

  const checkAvailability = jest.spyOn(wrapper.vm, 'checkAvailability')

  it('must renders props and submit values when passed', async () => {
    await sizeInputs[2].setChecked('true')
    expect(request.size).toBe('M')
    await colorInputs[2].setChecked('true')
    expect(request.color).toBe('green')
    await emoteInputs[2].setChecked('true')
    expect(request.emote).toBe('palm')
    await wrapper.find('form').trigger('submit')
    expect(checkAvailability).toBeCalledTimes(1)
  })

  it('mustrender all options', () => {
    expect(sizeInputs.length).toBe($store.state.defaults.sizes.length)
    expect(colorInputs.length).toBe($store.state.defaults.colors.length)
    expect(emoteInputs.length).toBe($store.state.defaults.emotes.length)
  })
})
