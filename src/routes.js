import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import LoginSite from './views/LoginSite';
import ComparisonSite from './views/ComparisonSite';
import store from './store';
import PlayerSite from './views/Player';
import Axios from 'axios';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/auth', redirect: () => {
            return '/'
        }},
        { path: '/login' , component: LoginSite },
        { path: '/steam-login-success', beforeEnter: (to, from, next) => {
            // const urlParams = new URLSearchParams(window.location.search);
            // const user = JSON.parse(urlParams.get('user'));
            // store.commit('setSteamUser', user);
            next('/')
        }},
        { path: '/comparison' , component: ComparisonSite },
        { path: '/player/:id', name: 'player' , component: PlayerSite, props: true },
        { path: '/' , component: Home,  beforeEnter: (to, from, next) => {
            store.commit('authenticate', window.FACEIT.getAuthenticationStatus() === "connected" || store.getters.steamUser !== null);
            next()
        }},
    ]
});

router.beforeEach((to, from, next) => {
    Axios.get('http://localhost:5000/user', { withCredentials: true }).then(({ data: steamUser }) => {
        store.commit('setSteamUser', steamUser);
    }).finally(() => {
        store.commit('authenticate', window.FACEIT.getAuthenticationStatus() === "connected" || store.getters.steamUser !== null);
        next()
    })
});



export {
    router
};
