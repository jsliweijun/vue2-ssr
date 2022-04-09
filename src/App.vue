<!--  根组件 -->
<template>
    <div id="app">
        {{ message }}
        <hr />
        <button @click="onClick">点击</button>
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
