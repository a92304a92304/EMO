<template lang="pug">
main
  .jumbotron.jumbotron-fluid.title.index(v-cloak :style='setBg()')
    .container.text-light.my-2.my-md-5
      .row.align-items-center.py-0.py-sm-5
        .col-12.col-lg-8.offset-lg-1.order-2.order-lg-1
          h1.ml11.d-block(v-if='!language')
            span.text-wrapper
              span.line.line1
              span.letters 電磁最佳化實驗室
          h1.ml11.d-block(v-else)
            span.text-wrapper
              span.line.line1
              span.letters EM Optimization Lab
          h1.subtitle.mb-4(style='letter-spacing:3px', v-if='!language') 陳晏笙研究團隊
          h1.subtitle.mb-4(style='font-size: 1.4rem', v-else) Yen-Sheng Research Group, Department of Electronic Engineering
          p.lead(style='color:#eee;font-weight: bold;', v-if='!language') 國立臺北科技大學
          p.lead(style='color:#eee;font-weight: bold;', v-else) National Taipei University of Technology
  .container-fluid.mb-5(v-if='carousel && index')
    .row.align-items-center
      .col-12.col-lg-6
        carousel(:data='carousel')

      .col-12.col-lg
        .px-0.px-lg-5.mt-3.mt-lg-0
          p(v-html='index.introduction.content', v-if='!language')
          p(v-html='index.introduction.content_en', v-else)

  loading(c='page', s='margin-top:5rem', v-else)
  .py-3(style='background:#eee')
    .container.my-3(v-if='index', v-cloak)
      .row.justify-content-center
        .col-12.col-lg-8.mt-3.mb-5.mb-md-0.mobile-no-padding(v-if='calcObjLength(index.research)!=0')
          h2.text-center
            i.fas.fa-search.color-secondary-dark
            |  {{(!language) ? '研究議題' : 'Research Highlights'}}
          .ui.purple.segment
            .ui.relaxed.divided.list
              .item(v-for='r in index.research')
                .content.my-3
                  .container-fluid(style={paddingLeft: 0,paddingRight: 0})
                    .row.no-gutters.align-items-center
                      .col-12
                        h5.mb-2.color-secondary-dark
                          | {{(!language) ? r.name : r.name_en}}
                          i.fas.fa-angle-right
                      .col-12.col-md-3(v-if="r.img!=''")
                        .mr-0.mr-md-3.d-block
                          img.img-fluid.rounded(:src='r.img')
                      .col-12.col-md
                        p.my-0.text-left(v-html='(!language) ? r.content : r.content_en')
        .col-12.col-lg-4.mt-3.mb-5.mb-md-0.mobile-no-padding(v-if='calcObjLength(index.events)!=0')
          h2.text-center
            i.fas.fa-calendar-alt.color-primary-dark
            |    {{(!language) ? '近期活動' : 'Upcoming Events'}}
          .ui.olive.segment
            .ui.relaxed.divided.list
              .item(v-for='e in index.events')
                .content.my-3
                  p.text-left(style='line-height:1.8rem') {{(!language) ? e.content : e.content_en}}
  .container.my-5.py-3.d-none.d-md-block
    .row.quick
      .col-12.col-md-6
        router-link.item(to='/investigator' :style="getBgStyle('img/title/3.jpg')")
          .caption
            h3.title Principal Investigator
            h5.info 主持人
      .col-12.col-md-6
        router-link.item(to='/member' :style="getBgStyle('img/title/7.jpg')")
          .caption
            h3.title Lab Members
            h5.info 團隊成員
      .col-12.col-md-6.col-lg-4
        router-link.item(to='/thesis' :style="getBgStyle('img/title/5.jpg')")
          .caption
            h3.title Graduate Thesis
            h5.info 研究所論文
      .col-12.col-md-6.col-lg-4
        router-link.item(to='/project' :style="getBgStyle('img/title/6.jpg')")
          .caption
            h3.title Undergraduate Project
            h5.info 大學部專題
      .col-12.col-md-12.col-lg-4
        router-link.item(to='/publication' :style="getBgStyle('img/title/4.jpg')")
          .caption
            h3.title Publication List
            h5.info 著作
</template>

<script>
import { page } from '@/mixins/page.js'
import * as config from '@/config'
import anime from 'animejs'
import carousel from '@/components/Carousel.vue'

export default {
  data () {
    return {
      carousel: null,
      index: null,
    }
  },
  mounted () {
    this.setBg()
    this.fetch('index')
    this.fetchCarousel('index')
    this.typingAnimation()
  },
  methods: {
    // 首頁入場動畫
    typingAnimation () {
      $('.ml11 .letters').each(function() {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"))
      })
      anime.timeline({
        loop: false
      })
      .add({
        targets: '.ml11 .line',
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: 'easeOutExpo',
        duration: 700
      })
      .add({
        targets: '.ml11 .line',
        translateX: [0, $('.ml11 .letters').width()],
        easing: 'easeOutExpo',
        duration: 700,
        delay: 100
      }).add({
        targets: '.ml11 .letter',
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 600,
        offset: '-=775',
        delay: function(el, i) {
          return 34 * (i + 1)
        }
      }).add({
        targets: '.ml11 .line',
        opacity: 0,
        duration: 500,
        offset: '-=500',
        easing: 'easeOutExpo'
      }).add({
        targets: '.index h1.subtitle',
        translateY: ['-1rem', 0],
        opacity: [0, 1],
        color: ['#a376e8', '#C2E812'],
        duration: 500,
        offset: '-=200',
        easing: 'easeOutExpo'
      }).add({
        targets: '.index p.lead',
        translateY: ['-1rem', 0],
        opacity: [0, 1],
        duration: 1000,
        offset: '-=200',
        easing: 'easeOutExpo'
      })
    },

  },
  components: { carousel },
  mixins: [page]
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_index.sass"
</style>
