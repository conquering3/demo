import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import HomeContent from '../components/HomeContent'
import HelloWorld from '../components/HelloWorld'

Vue.use(VueRouter)

const routes = [
  {
    path: '/hello',
    component: HelloWorld
  },
  {
    name: 'home',
    path: '/',
    component: Home,
    children: [
      {
        path: 'content',
        // redirect: '/',
        component: HomeContent,
        meta: {auth: true}
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
export default router
