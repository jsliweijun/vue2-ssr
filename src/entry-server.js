/**
 * 服务端 启动入口
 */

import { createApp } from './app';

export default (context) => {
    const { app } = createApp();

    // 服务端 路由处理， 数据预区

    return app;
};
