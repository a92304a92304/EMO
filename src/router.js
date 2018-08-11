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

import Login from './views/Login.vue'
import Manage from './views/manage/Manage.vue'

import ManageEinstein from './views/manage/Einstein.vue'
import ManageInvestigator from './views/manage/Investigator.vue'
import ManagePublication from './views/manage/Publication.vue'



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
      meta: { title: 'Graduate Thesis - EM Optimization Lab - NTUT ' }
    },
    {
      path: '/thesis',
      name: 'thesis',
      component: Thesis,
      meta: { title: 'Graduate Thesis - EM Optimization Lab - NTUT' }
    },
    {
      path: '/project/:category/:id',
      name: 'projectDetail',
      component: ThesisDetail,
      meta: { title: 'Undergraduate Project - EM Optimization Lab - NTUT' }
    },
    {
      path: '/project',
      name: 'project',
      component: Thesis,
      meta: { title: 'Undergraduate Project - EM Optimization Lab - NTUT' }
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
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: 'Login - EM Optimization Lab - NTUT' }
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      meta: { title: 'Manage - EM Optimization Lab - NTUT' },
      children: [
        {
          path: 'einstein',
          name: 'manage/einstein',
          component: ManageEinstein,
        },
        {
          path: 'investigator',
          name: 'manage/investigator',
          component: ManageInvestigator,
        },
        {
          path: 'publication',
          name: 'manage/publication',
          component: ManagePublication,
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ],
  linkActiveClass: 'active',
})
