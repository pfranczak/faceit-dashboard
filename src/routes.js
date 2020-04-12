import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import LoginSite from './views/LoginSite';
<<<<<<< HEAD
import store from './store';
=======
import PlayerSite from './views/Player';
import { globalState } from './main'

>>>>>>> c1c3783... Implement player page.
Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/auth', redirect: () => {
            return '/'
        }},
        { path: '/login' , component: LoginSite },
        { path: '/player/:id', name: 'player' , component: PlayerSite, props: true },
        { path: '/' , component: Home,  beforeEnter: (to, from, next) => {
<<<<<<< HEAD
            store.commit('authenticate', window.FACEIT.getAuthenticationStatus() === "connected");
            console.log(window.FACEIT.getAuthenticationStatus() === "connected");
=======
            globalState.authenticated = window.FACEIT.getAuthenticationStatus() === "connected"
>>>>>>> c1c3783... Implement player page.
            next()
        }},
    ]
});

