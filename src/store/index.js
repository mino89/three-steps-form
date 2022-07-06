/* eslint-disable */
import { createStore } from 'vuex'
import axios from 'axios'

const API = "http://localhost:4000"

export default createStore({
    state: {
        count: 0,
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
                { id: "heart", value: "❤️" },
                { id: "bolt", value: "⚡️" },
                { id: "experiment", value: "🧪" },
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
        UPDATE_MESSAGE(state, message) {
            state.message = message
        },
        CLEAR_MESSAGE(state) {
            state.message = null
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
                .then((res) => {
                    commit("CLEAR_MESSAGE")
                    commit("CHANGE_COUNT", to);
                    console.log(res)
                })
                .catch((err) => {
                    commit('UPDATE_MESSAGE', err.response.data.message);
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
                .catch((error) => {
                    this.$store.commit('UPDATE_MESSAGE', error.response.data.message)
                })

        }
    }
})