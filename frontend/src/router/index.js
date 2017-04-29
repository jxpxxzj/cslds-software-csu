import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Application from '@/components/Application';
import Admin from '@/components/Admin';
import Material from '@/components/Material';
import Teacher from '@/components/Teacher';
import NotFound from '@/components/NotFound';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            path: '/application',
            component: Application
        },
        {
            path: '/admin',
            component: Admin
        },
        {
            path: '/material',
            component: Material
        },
        {
            path: '/teacher',
            component: Teacher
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});
