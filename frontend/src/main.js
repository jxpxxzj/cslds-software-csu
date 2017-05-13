// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-default/index.css';
import 'normalize.css';
import ElementUI from 'element-ui';
import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import App from './App';
import router from './router';

const baseURL = '/api';
Vue.prototype.$axios = axios.create({
    baseURL,
    withCredentials: true
});

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1,
    lazyComponent: true
});

Vue.mixin({
    computed: {
        baseURL: () => baseURL
    }
});

const store = new Vuex.Store({
    state: {
        user: {

        }
    },
    mutations: {
        setUser(state, value) {
            state.user = value;
        }
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});
