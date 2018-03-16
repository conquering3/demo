import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tab from '@/components/Tab'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'tab',
    component: Tab
  },
  {
    path: '/hello',
    name: 'hello',
    component: HelloWorld
  }
]
export default new Router({
  routes
})
