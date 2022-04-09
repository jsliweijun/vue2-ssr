/**
 * 通用 启动入口
 */
import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router/index';
import { createStore } from './store/index';

// 导出一个工厂函数 ，创建 应用程序，router ，store 实例

export function createApp() {
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        router,
        store,
        render: (h) => h(App)
    });

    return { app, router, store };
}
