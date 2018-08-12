<template lang="pug">
#app
  Navbar(:language='language' @toggleLanguage='toggleLanguage' v-show='isNavbarAndFooterShow')
  router-view(:language='language')
  Footer(:language='language' v-show='isNavbarAndFooterShow')
</template>

<script>
import Cookies from 'js-cookie'

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  data () {
    return {
      language: true,
    }
  },
  mounted () {
    this.getCookieLanguage()
    this.isIE()

    $('body').scrollspy({ target: '#nav', offset: 56 })

    const navbarCollapse = () => {
      if ($('#nav').offset().top > 50) {
        $('#nav').addClass('navbar-shrink')
        $('.einstein .menu').addClass('shrink')
      } else {
        $('#nav').removeClass('navbar-shrink')
        $('.einstein .menu').removeClass('shrink')
      }
      return navbarCollapse
    }
    $(window).scroll(navbarCollapse())

  },
  methods: {
    // 切換語言
    toggleLanguage () {
      this.language = !this.language
      Cookies.remove('language')
      Cookies.set('language', this.language)
      $('#navbarCollapse').collapse('hide')
    },
    // cookie取得語言
    getCookieLanguage () {
      if (!(typeof(Cookies.get('language')) === 'undefined')) {
        this.language = (Cookies.get('language') == 'true')
      }
    },
  },
  computed: {
    isNavbarAndFooterShow () {
      const page = this.$route.name || ''
      const list = ['login', 'manage']
      return !list.some((val) => page.indexOf(val) > -1  )
    }
  },
  components: { Navbar, Footer }
}

</script>

<style lang="sass">
@import "assets/css/semantic"
@import "~bootstrap/scss/bootstrap"
</style>
