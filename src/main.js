import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import App from './App.vue';
import { router } from './routes';

Vue.config.productionTip = false;
Vue.use(Buefy);

export const globalState = new Vue({
    data: {
        authenticated: false
    }
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
