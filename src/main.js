import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import ModalImg from '@/components/ModalImg.vue'
import Loading from '@/components/Loading.vue'

import { globalMethods } from './mixins/global.js'
import * as VueGoogleMaps from 'vue2-google-maps'
import draggable from 'vuedraggable'

library.add(fas)
library.add(fab)

Vue.mixin(globalMethods)

Vue.component('fa', FontAwesomeIcon)
Vue.component('draggable', draggable)
Vue.component('loading', Loading)
Vue.component('modal-img', ModalImg)

// Notification
import Notifications from 'vue-notification' // https://github.com/euvl/vue-notification/
import velocity from 'velocity-animate'
Vue.use(Notifications, { velocity })

// Manage 頁面用組件

import VerticalMenu from '@/components/manage/VerticalMenu.vue'
import FormLabel from '@/components/manage/FormLabel.vue'
import Tip from '@/components/manage/Tip.vue'

Vue.component('vertical-menu', VerticalMenu)
Vue.component('form-label', FormLabel)
Vue.component('tip', Tip)

//

import VueCarousel from 'vue-carousel'
Vue.use(VueCarousel)


Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBS6J7v9nG5bvbIN-mR0NhSjRdNtigemJk',
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || `EM Optimization Lab - NTUT`
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
