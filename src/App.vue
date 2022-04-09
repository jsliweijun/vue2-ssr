<!--  根组件 -->
<template>
    <div id="app">
        <router-view></router-view>
        <div>
            <router-link to="/">首页</router-link>
            <router-link to="/topic">主题</router-link>
            <router-link to="/about">关于</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            message: 'vue-ssr'
        };
    },
    methods: {
        onClick() {
            console.log('Hello world !');
        }
    }
};
</script>
