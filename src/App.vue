<!--  根组件 -->
<template>
    <div id="app">
        <input type="text" v-model="message" />
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
