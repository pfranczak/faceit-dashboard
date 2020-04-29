import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        authenticated: false,
        steamUser: null,
        playersToCompare: [],
        favouritePlayers:[]
    },
    getters: {
        authenticated(state) {
            return state.authenticated;
        },
        steamUser(state) {
            return state.steamUser;
        },
        playersToCompare(state) {
            return state.playersToCompare;
        },
        favouritePlayer(state) {
            return state.favouritePlayers
        }
    },
    actions: {},
    mutations: {
        authenticate(state, payload) {
            state.authenticated = payload;
        },
        setSteamUser(state, payload) {
            state.steamUser = payload;
        },
        addToCompare(state, payload) {
            const isAdded = state.playersToCompare.filter(({id}) => id === payload.id).length !== 0;

            if (!isAdded) {
                state.playersToCompare = [...state.playersToCompare, payload];
            }
        },
        removeFromCompare(state, payload) {
            state.playersToCompare = state.playersToCompare.filter(({id}) => id !== payload.id);
        },
        setFavouritePlayers(state, payload) {
            state.favouritePlayers = payload
        }
    }
});

export default store;