/**
 * 服务端 启动入口
 */

import { createApp } from './app';

export default async (context) => {
    const { app, router } = createApp();
    // 服务端 路由处理， 数据预区

    // 路由处理，服务端将路由信息给router 处理
    router.push(context.url);

    // 服务端需要等异步路由解析完
    await new Promise(router.onReady.bind(router));

    return app;
};
