import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        authenticated: false
    },
    getters: {

    },
    actions: {

    },
    mutations: {
        authenticate (state, payload) {
            state.authenticated = payload
        }
    }
});

export default store;