import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'home',
   
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/details/:id',
    name: 'details',
   
    component: () => import(/* webpackChunkName: "about" */ '../views/Details.vue')
  },
  {
    path: '/stats',
    name: 'stats',
   
    component: () => import(/* webpackChunkName: "about" */ '../views/Stats.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
