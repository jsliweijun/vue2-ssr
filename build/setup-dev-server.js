// 启动开发环境配置
// 开发环境也是启动 node 服务进行开发，不同点是，开发环境要监视 src 的代码自动更新。
// 提供 setupDevServer 函数功能

const fs = require('fs');
const path = require('path');

const chokidar = require('chokidar');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const resolve = (file) => path.resolve(__dirname, file);

// callback 函数就是创建新的 renderer
module.exports = (server, callback) => {
    // 通过promise 状态告诉 开发环境编译构建完成。
    let ready; // 改变状态
    const onReady = new Promise((resolve, reject) => {
        ready = resolve;
    });

    // 监视构建 =》 更新 render

    //监视 三种资源
    let template;
    let serverBundle;
    let clientManifext;

    // 当三种资源都更新好，就进行触发回调进行开发环境创建 renderer
    const update = () => {
        if (template && serverBundle && clientManifext) {
            ready();
            callback(serverBundle, template, clientManifext);
        }
    };

    // 监视 template  -> 调用 update  -》 更新 renderer 渲染器
    const templatePath = path.resolve(__dirname, '../index.template.html');
    template = fs.readFileSync(templatePath, 'utf-8');
    update();
    // 监视 文件变化， fs.watch  fs.watchFile  它们通用性不太好，使用优化后的第三方包。
    chokidar.watch(templatePath).on('change', () => {
        template = fs.readFileSync(templatePath, 'utf-8');
        update();
    });

    // 监视 serverBundle -> 调用 update  -》  更新渲染器
    const serverConfig = require('./webpack.server.config');
    const serverCompiler = webpack(serverConfig);

    // 使用 内存构建大包
    const serverDevMiddleware = devMiddleware(serverCompiler, { logLevel: 'silent' });
    // 在回调中将内存文件赋值
    serverCompiler.hooks.done.tap('server', () => {
        serverBundle = JSON.parse(serverDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8'));
        update();
    });

    // 监视 clientManifest -> 调用 update  -》 更新 renderer 渲染器
    const clientConfig = require('./webpack.client.config');

    // 增加热更新
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    // 处理热根下
    clientConfig.entry.app = ['webpack-hot-middleware/client?quiet=true&reload=true', clientConfig.entry.app];
    clientConfig.output.filename = '[name].js'; // 热更新模式下保持一致的hash，不然报错，无法热更新
    const clientCompiler = webpack(clientConfig);

    // 在内存中进行更新
    const clientDevMiddleware = devMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        logLevel: 'silent'
    });

    clientCompiler.hooks.done.tap('client', () => {
        clientManifext = JSON.parse(clientDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-client-manifest.json'), 'utf-8'));
        update();
    });

    // 实现前端代码修改进行热更新
    server.use(hotMiddleware(clientCompiler, { log: false }));

    // express 提供资源时，默认提供的是生成的物理文件，需要提供内存文件进行开发时，需要将中间使用到 express中
    // 重要！！！将 clientDevMiddleware 挂载到 Express 服务中，提供对其内部内存中数据的访问
    server.use(clientDevMiddleware);

    return onReady;
};
