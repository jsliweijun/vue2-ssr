/**
 * 客户端入口
 */

import { createApp } from './app';

const { app } = createApp();

// 根组件的 App.vue 的根元素是 id=app
app.$mount('#app');
