// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  data: {
    'main_nav': true
  },
  mounted: function () {
    console.log(this['main_nav'])
  },
  template: '<App/>',
  components: {App}
})
