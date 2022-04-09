// 在服务端使用 vue 实例，创建出模版

const Vue = require('vue');

const renderer = require('vue-server-renderer').createRenderer();

// 创建 vue实例
const app = new Vue({
    template: `<div id="app"> <h1> {{message}}</h1>  </div>`,
    data: { message: '拉钩教育' }
});

// 渲染成字符串
renderer.renderToString(app, (err, html) => {
    if (err) throw err;
    console.log(html);
});
