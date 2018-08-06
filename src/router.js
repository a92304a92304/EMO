import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Einstein from './views/Einstein.vue'
import Investigator from './views/Investigator.vue'
import Publication from './views/Publication.vue'
import Thesis from './views/Thesis.vue'
import ThesisDetail from './views/ThesisDetail.vue'

import Member from './views/Member.vue'
import Contact from './views/Contact.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: { title: 'EM Optimization Lab - NTUT' }
    },
    {
      path: '/einstein',
      name: 'einstein',
      component: Einstein,
      meta: { title: 'Einstein Program - EM Optimization Lab - NTUT' }
    },
    {
      path: '/investigator',
      name: 'investigator',
      component: Investigator,
      meta: { title: 'Principal Investigator - EM Optimization Lab - NTUT' }
    },
    {
      path: '/publication',
      name: 'publication',
      component: Publication,
      meta: { title: 'Publication List - EM Optimization Lab - NTUT' }
    },
    {
      path: '/thesis/:category/:id',
      name: 'thesisDetail',
      component: ThesisDetail,
      meta: { title: 'Graduate Thesis - EM Optimization Lab - NTUT - EM Optimization Lab - NTUT' }
    },
    {
      path: '/thesis',
      name: 'thesis',
      component: Thesis,
      meta: { title: 'Graduate Thesis - EM Optimization Lab - NTUT - EM Optimization Lab - NTUT' }
    },
    {
      path: '/member',
      name: 'member',
      component: Member,
      meta: { title: 'Lab Members - EM Optimization Lab - NTUT' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: { title: 'Contact Us - EM Optimization Lab - NTUT' }
    },

    // Graduate Thesis - EM Optimization Lab - NTUT
    // Undergraduate Project - EM Optimization Lab - NTUT

    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ],
  linkActiveClass: 'active',
})