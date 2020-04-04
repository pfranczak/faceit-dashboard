import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import LoginSite from './views/LoginSite';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        { path: '' , component: Home },
        { path: '/login' , component: LoginSite }
    ]
});
