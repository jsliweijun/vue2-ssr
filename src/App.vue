<!--  根组件 -->
<template>
    <div id="app"></div>
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
