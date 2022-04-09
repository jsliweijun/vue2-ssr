import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export const createStore = () => {
    const store = new Vuex.Store({
        state: () => {
            topicList: [];
        },
        mutations: {
            setTopicList(state, data) {
                state.topicList = data;
            }
        },
        actions: {
            async getTopicList(store) {
                const res = await Axios.get('https://cnodejs.org/api/v1/topics');
                store.commit('setTopicList', res.data.data);
            }
        }
    });

    return store;
};
