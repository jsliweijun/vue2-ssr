/**
 * 客户端入口
 */

import { createApp } from './app';

// router 用于前端进行管理路由，
const { app, router } = createApp();

// 根组件的 App.vue 的根元素是 id=app

router.onReady(() => {
    app.$mount('#app');
});
