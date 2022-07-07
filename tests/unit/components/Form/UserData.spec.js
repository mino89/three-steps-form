import { shallowMount } from '@vue/test-utils'
import UserData from '@/components/Form/UserData.vue'

describe('UserData.vue', () => {
  const $store = {
    state: {
      userData: {
        name: null,
        email: null
      }
    },
    actions: {
      checkUserData: jest.fn((param) => { return Promise.resolve(() => { }) })
    },
  }
  const request = $store.state.userData
  const wrapper = shallowMount(UserData, {
    global: {
      mocks: {
        $store
      }
    },
    props: { request }

  })
  const nameInput = wrapper.find('input[name=name]')
  const emailInput = wrapper.find('input[name=email]')
  const checkUser = jest.spyOn(wrapper.vm, 'checkUser')

  it('must renders props and submit values when passed', async () => {
    await nameInput.setValue('Name SecondNAme')
    expect(request.name).toBe('Name SecondNAme')
    await emailInput.setValue('mail@mail.it')
    expect(request.email).toBe('mail@mail.it')
    await wrapper.find('form').trigger('submit')
    expect(checkUser).toBeCalledTimes(1)
  })
})
