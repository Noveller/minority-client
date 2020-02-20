import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const LOADING = 'LOADING';
export const LOADING_ACTION = 'LOADING_ACTION';

export default new Vuex.Store({
    state: {
        loading: true
    },
    getters: {
        isLoading: state => state.loading
    },
    mutations: {
        [LOADING](state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        async [LOADING_ACTION]({commit}, loading) {
            commit(LOADING, loading);
        }
    }
})
