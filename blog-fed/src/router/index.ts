import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '../layout/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: 'home' */ '../views/Home/home.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
