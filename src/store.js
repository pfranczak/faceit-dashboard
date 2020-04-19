import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        authenticated: false,
        playersToCompare: []
    },
    getters: {
        authenticated(state) {
            return state.authenticated;
        },
        playersToCompare(state) {
            return state.playersToCompare;
        }
    },
    actions: {},
    mutations: {
        authenticate(state, payload) {
            state.authenticated = payload;
        },
        addToCompare(state, payload) {
            const isAdded = state.playersToCompare.filter(({id}) => id === payload.id).length !== 0;

            if (!isAdded) {
                state.playersToCompare = [...state.playersToCompare, payload];
            }
        },
        removeFromCompare(state, payload) {
            state.playersToCompare = state.playersToCompare.filter(({id}) => id !== payload.id);
        }
    }
});

export default store;