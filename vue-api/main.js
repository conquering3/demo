// components
Vue.productionTip = true;

const App = window.ns('views').App;
const router = window.ns('routers').index;
const store = window.ns('store').index;

new Vue({
    template: '<App></App>',
    router,
    store,
    created () {
        console.log(this.$store.state);
    },
    components: {
        App: App
    }
}).$mount('#app');