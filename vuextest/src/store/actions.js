export default {
    increment (context) {
        console.log('actions');
        console.log(context);
        context.getters.addOne;
        context.commit('increment');
    },
    getModuleACount (context) {
        console.log('moduleA count:', context.rootState.moduleA.count);
    }
}
