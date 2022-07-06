
import { mount } from '@vue/test-utils'
import FormSteps from '@/components/FormSteps.vue'
import SelectConf from '@/components/Form/SelectConf.vue'
import UserData from '@/components/Form/UserData.vue'
import AddressSelection from '@/components/Form/AddressSelection.vue'
import VisualizerItem from '@/components/VisualizerItem.vue'
import store from '@/store'

describe('FormSteps.vue', () => {

    const wrapper = mount(FormSteps, {
        global: {
            plugins: [store],

        },
        components: {
            SelectConf,
            UserData,
            AddressSelection,
            VisualizerItem
        },
    })

    const SelectConfCmp = wrapper.findComponent({ name: 'SelectConf' })
    const UserDataCmp = wrapper.findComponent({ name: 'UserData' })
    const AddressSelectionCmp = wrapper.findComponent({ name: 'AddressSelection' })
    const VisualizerItemCmp = wrapper.findComponent({ name: 'VisualizerItem' })

    const FinalStep = wrapper.find('.final-step')

    const spy = jest.fn()
    wrapper.vm.submitMultiple = spy

    it('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('must render all children components', async () => {
        expect(VisualizerItemCmp.isVisible()).toBe(true)
        expect(SelectConfCmp.isVisible()).toBe(true)
        expect(UserDataCmp.isVisible()).toBe(true)
        expect(AddressSelectionCmp.isVisible()).toBe(true)
    })

    it('must render all children components in desktop mode', async () => {
        expect(SelectConfCmp.isVisible()).toBe(true)
        expect(UserDataCmp.isVisible()).toBe(true)
        expect(AddressSelectionCmp.isVisible()).toBe(true)
    })

    it('must render component Based On steps in mobile Mode', async () => {
        await store.commit('SWITCH_MOBILE', true)
        expect(SelectConfCmp.isVisible()).toBe(true)
        expect(UserDataCmp.isVisible()).toBe(false)
        expect(AddressSelectionCmp.isVisible()).toBe(false)
    })

    it('must render second Step on Mobile', async () => {
        await store.commit('SWITCH_MOBILE', true)
        await store.commit('CHANGE_COUNT', 1)
        expect(SelectConfCmp.isVisible()).toBe(false)
        expect(UserDataCmp.isVisible()).toBe(true)
        expect(AddressSelectionCmp.isVisible()).toBe(false)
    })

    it('must render third Step on Mobile', async () => {
        await store.commit('SWITCH_MOBILE', true)
        await store.commit('CHANGE_COUNT', 2)
        expect(SelectConfCmp.isVisible()).toBe(false)
        expect(UserDataCmp.isVisible()).toBe(false)
        expect(AddressSelectionCmp.isVisible()).toBe(true)
    })

    it('must call the method to submit data', async () => {
        await store.commit('SWITCH_MOBILE', false)
        wrapper.find('.submit-form').trigger('click')
        expect(wrapper.vm.submitMultiple).toBeCalled()

    })

    it('must render final Step', async () => {
        expect(FinalStep.isVisible()).toBe(false)
        await store.commit('SWITCH_SUCCESS')
        expect(FinalStep.isVisible()).toBe(true)
    })

})
