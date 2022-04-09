<template>
    <div class="container">
        <h1>主题列表</h1>
        <ul>
            <li v-for="item in topicList" :key="item.id">
                {{ item.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'Home',
    computed: {
        ...mapState(['topicList'])
    },
    methods: {
        ...mapActions(['getTopicList'])
    },
    mounted() {
        // this.getTopicList();  如果需要数据是在服务端渲染回来，需要使用 serverPrefetch 钩子中进行获取数据
    },
    // 这个钩子默认返回一个promise，服务端需要等这个钩子数据处理才进行返回页面
    serverPrefetch() {
        return this.getTopicList();
    }
};
</script>

<style scoped lang="scss"></style>
