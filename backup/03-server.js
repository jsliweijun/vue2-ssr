const fs = require('fs');
// 在服务端使用 vue 实例，创建出模版
const Vue = require('vue');
const express = require('express'); //  结合服务端，将 vue-ssr 渲染的内容进行提供访问。

const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8') // 传入编码参数会将二进制数据 转化 字符串
});

const server = express();

// vue-ssr 结合到 web 服务中。
server.get('/', (req, res) => {
    // 创建 vue实例
    const app = new Vue({
        template: `<div id="app"> <h1> {{message}}</h1>  </div>`,
        data: { message: 'vue-ssr  使用模版' }
    });

    // 渲染成字符串
    renderer.renderToString(app, (err, html) => {
        console.log(html);
        if (err) {
            res.status('500').end('Internet err');
        }

        // 设置响应头
        res.setHeader('Content-Type', 'text/html;charset=utf-8');

        // 这里返回的是 html 片段，没有 html5的 meta 信息，会报乱码。
        // res.end(html);

        res.end(html);
    });
});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});
