<template lang="pug">
header
  nav#nav.navbar.navbar-expand-xl.navbar-dark.fixed-top
    .container
      router-link.navbar-brand(to='/' active-class='')
        img.img-fluid.logo(src='../assets/img/logo.svg', alt='EMO Logo')
        span EM Optimization Lab
      button.navbar-toggler(type='button', data-toggle='collapse', data-target='#navbarCollapse')
        span.navbar-toggler-icon
      #navbarCollapse.collapse.navbar-collapse
        ul.navbar-nav.ml-auto.mt-3.mt-xl-0(v-cloak)
          // 選單項目
          li.nav-item.d-flex.align-items-center(v-for='p in pages')
            router-link.nav-link.text-center(:to='`/${p.page}`')
              span.d-inline.d-xl-none(v-html='(language) ? p.shortName : p.shortName_ch')
              span.d-none.d-xl-inline(v-html='(language) ? p.shortNameWrap : p.shortName_ch')

          // 語言切換btn
          li.nav-item.d-flex.align-items-center.language-toggle.ml-0.ml-xl-3.mt-3.mt-xl-0
            button(@click='toggleLanguage()')
              fa(icon='globe')
              transition(mode='out-in', enter-active-class='animated fadeInRight', leave-active-class='animated fadeOutLeft')
                span(v-if='language' key='ch') 中
                span(v-else key='en') En
</template>

<script>
import animate from 'animate.css'

export default {
  data () {
    return {

    }
  },
  methods: {
    toggleLanguage () {
      this.$emit('toggleLanguage')
    }
  },
  watch:{
    // 當路由切換時，折疊手機版的漢堡選單，回到頁面頂端
    $route (to, from){
      $('#navbarCollapse').collapse('hide')
      window.scrollTo(0,0)
    }
  },
  props: ['language']
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_function.sass"
@import "@/assets/css/_color.sass"
@import "@/assets/css/_nav.sass"

</style>
