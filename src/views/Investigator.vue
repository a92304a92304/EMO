<template lang="pug">
main
  jumbotron-title(:style='setBg()')
  loading(c='page', v-if='!investigator')
  .container.investigator(v-if='investigator', v-cloak)
    .row.align-items-start.justify-content-center
      .col-12.col-md-4.text-center.sr(v-for='i in 1')
        img.img-fluid.rounded(:src='investigator.introduction.img')
        h2.mt-3.mr-3.d-inline-block(style={fontWeight: `bold`}) {{(!language)?'陳晏笙':'Yen-Sheng Chen'}}
        h4.d-inline-block(style={fontWeight: 400}) {{(!language)?'博士':'PI'}}
      .col-12.col-md-8.mobile-no-padding
        .ui.padded.segment.sr
          p(v-html='selectTextLanguage(language, investigator.introduction.content, investigator.introduction.content_en)')

    hr
    .row.align-items-start.justify-content-center
      .col-12.col-sm-12
        h2.subtitle {{(!language) ? '教學課程' : 'Teaching'}}
        template(v-for='t in investigator.teaching')
          h5
            | {{(!language) ? t.name : t.name_en}}
            span(v-if="t.year!=''") （{{t.year}}）
          p.mb-5.pl-0.pl-sm-3.sr(v-html='(!language) ? t.content : t.content_en')

    hr
    .row.align-items-start.justify-content-center
      .col-12.col-md-12.mb-5.sr
        h2.subtitle {{(!language) ? '研究計畫' : 'Research Project'}}
        ol.ui.divided.animated.very.relaxed.list
          template(v-for='r in investigator.researchProject')
            li.item(style='line-height:1.5rem', v-html='(!language) ? r.content : r.content_en')

    hr
    .row.align-items-start.justify-content-center
      .col-12.col-md-12.mb-5.sr
        h2.subtitle {{(!language) ? 'SCI國際期刊論文審查' : 'Reviewer'}}
        ul.ui.divided.animated.very.relaxed.list
          template(v-for='r in investigator.reviewer')
            li.item
              span(v-html='r.content')
              span.text-muted ({{r.year}})
</template>

<script>
import { page } from '@/mixins/page.js'

export default {
  data () {
    return {
      investigator: null,
    }
  },
  mounted () {
    this.setBg()
    this.fetch('investigator')
  },
  methods: {
  },
  mixins: [page]
}
</script>

<style scoped lang="sass">
</style>
