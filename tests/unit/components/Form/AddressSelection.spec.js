import { shallowMount } from '@vue/test-utils'
import AddressSelection from '@/components/Form/AddressSelection.vue'

describe('AddressSelection.vue', () => {
  const $store = {
    state: {
      addressData: {
        address: null
      }
    },
    actions: {
      checkAddressData: jest.fn((param) => { return Promise.resolve(() => { }) })
    },
    dispatch: () => { data: 'dummyData' }
  }

  const request = $store.state.addressData

  const wrapper = shallowMount(AddressSelection, {
    global: {
      mocks: {
        $store
      }
    },
    props: { request }

  })

  const addressInput = wrapper.find('input[name=address]')
  const checkAddress = jest.spyOn(wrapper.vm, 'checkAddress')

  it('must renders props and submit values when passed', async () => {
    await addressInput.setValue('address')
    expect(request.address).toBe('address')
    await wrapper.find('form').trigger('submit')
    expect(checkAddress).toBeCalledTimes(1)
  })
})
