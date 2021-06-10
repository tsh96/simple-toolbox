import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/base-converter',
    name: 'Base Converter',
    component: () => import('../views/BaseConverter.vue')
  },
  {
    path: '/binary-decimal-converter',
    name: 'Binary Decimal Converter',
    component: () => import('../views/BinaryDecimalConverter.vue')
  },
  {
    path: '/list-randomizer',
    name: 'List Randomizer',
    component: () => import('../views/ListRandomizer.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
