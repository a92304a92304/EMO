<template lang="pug">
footer
  .container
    .row
      .col-12.col-md-6.col-lg-3
        h5
          a(href='./') EM Optimization Lab
        ul(v-cloak)
          li(v-for='p in pages')
            router-link(:to='`/${p.page}`' v-html='(!language)?p.shortName_ch:p.name')

      .col-12.col-md
        h5(v-html="(!language)?'聯絡方式':'Contact Us'")
        ul(v-cloak)
          li
            span.center-icon
              fa(icon='phone')
            | +886-2-27712171-2266
          li
            span.center-icon
              fa(icon='envelope')
            a(href='mailto:yschen@ntut.edu.tw') yschen@ntut.edu.tw
          li
            span.center-icon
              fa(icon='map-marker')
            span(v-if='!language') 10608 台北市忠孝東路三段一號
            span(v-else) No.1, Sec. 3, Zhongxiao E. Rd., Da’an Dist., Taipei City 106
          li
            span.center-icon
            span(v-if='!language') 電子工程系
            span(v-else) Department of Electronic Engineering
          li
            span.center-icon
            span(v-if='!language') 綜合科館 407-1 室
            span(v-else) Complex Building 407-1

      .col-12.col-md-12.col-lg-3.text-center
        a(target='_blank', href='http://www.ntut.edu.tw/')
          img.ntut-logo.img-fluid.mb-3.mx-3(src='img/ntut.svg', alt='NTUT Logo')
          br
          | National Taipei University of Technology
      .col-12.col-md-12.mt-3.text-center
        |  ©
        span#footer-year(v-html='getYear()')  2018
        |  EM Optimization Lab. All rights reserved.
        a(href='login.html', title='後台管理')
          fa(icon='wrench')
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  props: ['language']
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_function.sass"
@import "@/assets/css/_color.sass"

footer
  background: $black
  color: #ccc
  min-height: 5rem
  z-index: 1000
  position: relative
  +py(3rem)
  .ntut-logo
    max-width: 150px
  h5 a:hover
    color: rgba($primary,1)
  h5, h5 a
    color: rgba($primary,.8)
  a
    color: #ccc
    &:hover
      color: rgba(#fff,1)
      img
        opacity: 1
  ul
    list-style-type: none
    padding: 0
  img
    transition: all .4s
    opacity: .7

@media (max-width: 768px)
  footer
    .ntut-logo
      max-width: 4rem
</style>
