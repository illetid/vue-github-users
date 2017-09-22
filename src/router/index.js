import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue';


const User = resolve => {
    require.ensure(['../components/User.vue'], () => {
        resolve(require('../components/User.vue'))
    }, 'user');
};
Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/', name: 'home', components: {
            default: Home,
        }
        },
        {path: '/user/:id', name: 'user', component: User},
        {path: '*', redirect: {name: 'home'}}
    ],
    mode: 'history',
})
