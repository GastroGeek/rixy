import Vue from 'vue'
import VueRouter from 'vue-router'
import RackView from '@views/RackView'
import FxView from '@views/FxView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'RackView',
    component: RackView
  },
  {
    path: '/:id',
    name: 'FxView',
    component: FxView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
