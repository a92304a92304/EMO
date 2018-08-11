<template lang="pug">
header
  nav#nav.navbar.navbar-expand-xl.navbar-dark.fixed-top.navbar-shrink
    .container
      router-link.back-btn(title='返回首頁' to='/' data-toggle='tooltip' data-placement='bottom' active-class='')
        span.text-info
          fa(icon='angle-left')
      router-link.navbar-brand(to='/manage/index' active-class='')
        img.img-fluid.logo(src='../assets/img/logo.svg' alt='EM Optimization Lab Logo')
        span.d-none.d-lg-inline-block  Manage
      button.navbar-toggler(type='button' data-toggle='collapse' data-target='#navbarCollapse')
        span.navbar-toggler-icon
      #navbarCollapse.collapse.navbar-collapse(style='float:right;')
        ul.navbar-nav.ml-auto(v-cloak)
          li.nav-item.d-flex.align-items-center(v-for='p in pages')
            router-link.nav-link.text-center(:to='`/manage/${p.page}`')
              span.d-inline.d-xl-none(v-html='p.shortName')
              span.d-none.d-xl-inline(v-html='p.shortNameWrap')
          li.nav-item
            a#logout-btn.nav-link.text-warning(v-if='isLogin' @click='logout()')
              fa(icon='sign-out-alt')
              |  Logout
            a.nav-link(v-else) ...
</template>

<script>
import animate from 'animate.css'
import { manage } from '@/mixins/manage.js'
import * as config from '@/config'

export default {
  data () {
    return {

    }
  },
  mounted () {
    this.checkAuth()
  },
  methods: {
    logout () {
      config.auth.signOut()
    },
  },
  watch:{
  },
  mixins: [manage]
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_function.sass"
@import "@/assets/css/_color.sass"
@import "@/assets/css/_nav.sass"

a.nav-link
  line-height: 18px
</style>
