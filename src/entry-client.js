/**
 * 客户端入口,激活客户端的 vue 代码。
 */
import { createApp } from './app';

// router 用于前端进行管理路由，
const { app, router, store } = createApp();

// 将服务端 预先请求的数据初始化到 前端的 store 中
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

// 根组件的 App.vue 的根元素是 id=app
router.onReady(() => {
    app.$mount('#app');
});
