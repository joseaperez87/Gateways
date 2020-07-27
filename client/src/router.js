import Vue from 'vue'
import Router from 'vue-router'

import Gateways from './components/Gateways'
import Gateway from './components/Gateway'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', name: 'glist', component: Gateways},
        {path: '/gateway/:id', name: 'gelement', component: Gateway},
        {path: '*', name: 'notfound', component: Gateways}
    ]
});