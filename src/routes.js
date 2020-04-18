import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import LoginSite from './views/LoginSite';
import ComparisonSite from './views/ComparisonSite';
import store from './store';
Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/auth', redirect: () => {
        
            return '/'
        }},
        { path: '/login' , component: LoginSite },
        { path: '/comparison' , component: ComparisonSite },
        { path: '/' , component: Home,  beforeEnter: (to, from, next) => {
            store.commit('authenticate', window.FACEIT.getAuthenticationStatus() === "connected");
            next()
        }},
    ]
});
