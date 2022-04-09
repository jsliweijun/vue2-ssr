const fs = require('fs');

// 在服务端使用 vue 实例，创建出模版
const Vue = require('vue');
const express = require('express'); //  结合服务端，将 vue-ssr 渲染的内容进行提供访问。
const { createBundleRenderer } = require('vue-server-renderer');
const setupDevServer = require('./build/setup-dev-server');

const isProd = process.env.NODE_ENV === 'production';

const server = express();
let renderer; // 渲染器
let onReady; // 判断开发环境是否加载好资源

if (isProd) {
    // 生产环境直接对构建好的资源文件，启动应用。
    const serverBundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    const template = fs.readFileSync('./index.template.html', 'utf-8'); // 传入编码参数会将二进制数据 转化 字符串

    renderer = createBundleRenderer(serverBundle, {
        template,
        clientManifest
    });
} else {
    // 开发环境 -》 监视构建完成 -》 重新生成 Renderer 渲染器
    // 这个函数回调创建 渲染器
    onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
        renderer = createBundleRenderer(serverBundle, {
            template,
            clientManifest
        });
    });
}

// express 提供静态资源访问。
server.use('/dist', express.static('./dist'));

// express 的请求处理回调函数
const render = (req, res) => {
    // 渲染成字符串
    renderer.renderToString(
        {
            title: 'vue-ssr',
            meta: `  <meta name="description" content="vue-ssr" />`
        },
        (err, html) => {
            console.log(html);
            if (err) {
                res.status('500').end('Internet err');
            }

            // 设置响应头
            res.setHeader('Content-Type', 'text/html;charset=utf-8');

            // 这里返回的是 html 片段，没有 html5的 meta 信息，会报乱码。
            // res.end(html);

            res.end(html);
        }
    );
};

// vue-ssr 结合到 web 服务中。
server.get(
    '/',
    isProd
        ? render
        : async (req, res) => {
              // 处理成同步写法,需要开发环境将资源构建好在执行
              await onReady;
              render(req, res);
          }
);

server.listen(3000, () => {
    console.log('http://localhost:3000');
});
