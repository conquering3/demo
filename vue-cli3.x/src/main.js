import Vue from "vue";
import App from "./App.vue";
import { Autocomplete } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Autocomplete);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
