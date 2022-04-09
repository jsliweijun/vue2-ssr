import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';

Vue.use(VueRouter);

// 每次请求都是一次独立的应用，需要每个路由对象都是单独实例
export const createRouter = () => {
    const router = new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                name: 'home',
                component: Home
            },
            {
                path: '/topic',
                name: 'topic',
                component: () => import('../views/Topic.vue')
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('../views/About.vue')
            },
            {
                path: '*',
                name: '404',
                component: () => import('../views/404.vue')
            }
        ]
    });

    return router;
};
