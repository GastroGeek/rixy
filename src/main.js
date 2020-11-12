import Vue from 'vue'
import App from '@app'
import router from '@router'
import store from '@store'

import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faAngleRight,
  faArrowsAlt,
  faBars,
  faEllipsisV,
  faPowerOff,
  faTrashAlt,
  faUndo
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { SwipeList, SwipeOut } from 'vue-swipe-actions'

import Draggable from 'vuedraggable'
import VueSidebarMenu from 'vue-sidebar-menu'

import VueSelect from 'vue-select'

import GuitarixPlugin from '@plugins/guitarix'

import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'animate.css'
import 'vue-swipe-actions/dist/vue-swipe-actions.css'
import 'vue-select/dist/vue-select.css'

import '@assets/styles/tailwind.css'
import '@assets/styles/overrides.css'
import '@worker'

const {
  VUE_APP_GUITARIX_HOST: GUITARIX_HOST,
  VUE_APP_GUITARIX_PORT: GUITARIX_PORT
} = process.env

Vue.config.productionTip = false

library.add(
  faAngleRight,
  faArrowsAlt,
  faBars,
  faEllipsisV,
  faPowerOff,
  faTrashAlt,
  faUndo
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.component('Draggable', Draggable)
Vue.component('SwipeList', SwipeList)
Vue.component('SwipeOut', SwipeOut)
Vue.component('VueSelect', VueSelect)

Vue.use(VueSidebarMenu)

Vue.use(GuitarixPlugin, {
  host: GUITARIX_HOST,
  port: GUITARIX_PORT,
  store
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
