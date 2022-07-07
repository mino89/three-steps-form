/* eslint-disable */
import { createStore } from 'vuex'
import axios from 'axios'

// in a real scenario store this value in 
const API = "http://localhost:4000"

// resets the message value 
const resetData = (data) => {
    return new Promise((resolve) => {
        data = null
        resolve(data)
    })
}

export default createStore({
    state: {
        count: 0,
        ready: [],
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
        IS_READY_PUSH(state, ready) {
            state.ready.push(ready)
        },
        UPDATE_CONFIGURATION(state, configuration) {
            state.configuration = configuration
        },
        UPDATE_LOADING(state, val) {
            state.loading = val
        },
        UPDATE_MESSAGE(state, message) {
            resetData(state.message)
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
        //default post request method
        postRequest({ commit }, { endpoint, payload, to }) {
            if (this.state.ready) {
                axios
                    .post(`${API}/${endpoint}`, payload)
                    .then(() => {
                        commit("CHANGE_COUNT", to);
                    })
            }
        },
        //check if there is a false vaule in array
        async checkReadyState() {
            const errors =  this.state.ready.some( x => !x)
            this.state.ready = []
            return errors ? false : true
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