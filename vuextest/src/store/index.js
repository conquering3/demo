import Vue from 'vue';
import Vuex from 'vuex';
import mutations from '@/store/mutations';
import actions from '@/store/actions';
import moduleA from '@/store/modules/moduleA';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    getters: {
        addOne (state) {
            console.log('getters');
            console.log(state);
            state.count++;
            return state.count + 1;
        }
    },
    mutations,
    actions,
    modules: {
        moduleA
    }
});
export default store;
