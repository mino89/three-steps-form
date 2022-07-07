/* eslint-disable */
import { createStore } from 'vuex'
import axios from 'axios'

// in a real scenario store this value in 
const API = "http://localhost:4000"

// resets the message value 
const clearMessage = (message) => {
    return new Promise((resolve) => {
        message = null
        resolve(message)
    })
}

export default createStore({
    state: {
        count: 0,
        loading: false,
        success: false,
        isMobile: false,
        defaults: {
            sizes: ["XS", "S", "M", "L", "XXL"],
            colors: [
                { id: "red", value: "#f54b42" },
                { id: "yellow", value: "#f5e642" },
                { id: "green", value: "#48f542" },
                { id: "orange", value: "#f5aa42" },
                { id: "grey", value: "#d1d1d1" },
            ],
            emotes: [
                { id: "cactus", value: "🌵" },
                { id: "pine", value: "🌲" },
                { id: "palm", value: "🌴" },
                { id: "sun", value: "☀️" },
                { id: "star", value: "✨" },
            ]
        },
        configuration: {
            size: null,
            color: null,
            emote: null,
        },
        userData: {
            name: null,
            email: null,
        },
        addressData: {
            address: null
        },
        message: null
    },
    mutations: {
        CHANGE_COUNT(state, count) {
            state.count = count
        },
        UPDATE_CONFIGURATION(state, configuration) {
            state.configuration = configuration
        },
        UPDATE_LOADING(state, val) {
            state.loading = val
        },
        UPDATE_MESSAGE(state, message) {
            clearMessage(state.message)
                .then((res) => {
                    state.message = res
                })
                .then(() => state.message = message)
        },
        SWITCH_MOBILE(state, bool) {
            state.isMobile = bool
        },
        SWITCH_SUCCESS(state) {
            state.success = !state.success
        }
    },
    actions: {
        postRequest({ commit }, { endpoint, payload, to }) {
            axios
                .post(`${API}/${endpoint}`, payload)
                .then(() => {
                    commit("CHANGE_COUNT", to);
                })
        },
        checkConfiguration({ dispatch }, payload) {
            return dispatch('postRequest', { endpoint: 'check-availability', payload, to: 1 })
        },
        checkUserData({ dispatch }, payload) {
            return dispatch('postRequest', { endpoint: 'check-users', payload, to: 2 })
        },
        checkAddressData({ dispatch }, payload) {
            return dispatch('postRequest', { endpoint: 'check-address', payload, to: 3 })
        },
        submitData({ commit }, payload) {
            axios
                .post(`${API}/submit-data`, payload)
                .then(() => {
                    commit('SWITCH_SUCCESS')
                })
        }
    }
})