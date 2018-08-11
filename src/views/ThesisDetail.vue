<template lang="pug">
main
  .jumbotron.jumbotron-fluid.project(v-if='data' :style='getBgStyle(data.img.cover)' )
    .filter
    .container.text-light
      template(v-if='!language')
        h1 {{data.name}}
        h1.secondary {{data.name_en}}
      h1(v-else='language') {{data.name_en}}
      hr
    .cover-btn
      a(href='#', @click.prevent='showModalImg(data.img.cover)')
        fa(icon='external-link-alt')

  .jumbotron.jumbotron-fluid.project(v-else style={backgroundColor: '#eee'})
    .container.text-light
      template(v-if='!language')
        h1
          span.loading-text-block
        h1.secondary
          span.loading-text-block
      h1(v-else='language')
        span.loading-text-block
      hr

  modal-img(:img='modalImg')

  .container.thesis.mt-3(v-cloak)
    .row.detail.justify-content-center(v-if='data')
      .col-12.col-md-3.order-2.order-md-2
        .gallery
          a(href='#', target='_blank', v-for='i in data.img.content', @click.prevent='showModalImg(i)')
            img.img-fluid(style='width:100%', :src='i')
      .col-12.col-md-9.order-1.order-md-1
        .row
          .col-12.sr
            .row.mb-3
              .col-auto.mb-3(style='min-width:8rem;max-width:100%')
                h4 {{(!language) ? '姓名' : 'Name'}}
                span {{(!language) ? data.author : data.author_en}}
              .col-auto.mb-3(style='min-width:8rem')
                h4 {{(!language) ? '年份' : 'Year'}}
                span(v-if="category != 'ee'") {{ categoryName }}
                span(v-else) {{data.year}}
              .col-auto.mb-3(style='max-width:100%')
                h4 {{(!language) ? '關鍵字' : 'Keywords'}}
                template(v-for="k in data.keyword.split('、')", v-if='!language')
                  span.badge.badge-dark.d-inline-block {{k}}
                template(v-for="k in data.keyword_en.split(',')", v-if='language')
                  span.badge.badge-dark {{k}}
          .col-12.sr.mb-3
            p(v-html='(!language) ? data.content : data.content_en')
          .col-12.sr.col-md-12.mb-3(v-if='calcObjLength(data.related)>0 && thisPage == `thesis`')
            h2
              fa(icon='book')
              |  {{(!language) ? '相關論著' : 'Publications'}}
            ol.pl-3
              li.mb-2(v-for='r in data.related', v-html='r')
          .col-12.sr.col-md-12.mb-3(v-if='calcObjLength(data.award)>0 && !language && thisPage == `project`')
            h2
              fa(icon='trophy')
              |  {{(!language) ? '榮譽與獎項' : 'Awards'}}
            ol.pl-3
              li.mb-2(v-for='a in data.award', v-html='a')
          .col-12.sr.col-md-12.mb-3(v-if="data.youtube!=''")
            h2
              fa.text-danger(:icon='[`fab`, `youtube`]')
              |  {{(!language) ? '影片' : 'Video'}}
            .embed-responsive.embed-responsive-16by9
              iframe.embed-responsive-item.rounded(:src='translateYoutubeLink(data.youtube)', allowfullscreen)
</template>

<script>
import * as config from '@/config'
import { page } from '@/mixins/page.js'

export default {
  data () {
    return {
      data: null,
      modalImg: null,
    }
  },
  mounted () {
    this.setBg()
    this.fetch()
  },
  methods: {
    fetch () {
      const vm = this
      const page = this.$route.name.replace(/Detail/g, '')
      const category = this.$route.params.category
      const id = this.$route.params.id

      config.dbRef.child(`${page}/content/${category}/content/${id}`).once('value', function(snap) {
        vm.data = snap.val()
      })
    },
    getBgStyle (url) {
      return {
        backgroundImage: `url('${url}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: `fixed`,
      }
    },
  },
  computed: {
    category () {
      return this.$route.params.category
    },
    categoryName () {
      return this.category != `ee` ? this.category : `碩士在職專班`
    },
    thisPage () {
      return this.$route.name.replace(/Detail/g, '')
    },
  },
  watch: {
    $route () {
      this.data = null
      this.fetch(this.$route.name)
    }
  },
  mixins: [page]
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_project.sass"
</style>
