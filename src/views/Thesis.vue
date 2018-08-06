<template lang="pug">
main
  jumbotron-title(:style='setBg()')

  .container.thesis.mt-3(v-cloak)
    //- include include/project-loader.pug
    .row.no-gutters.timeline(v-if='thesis')
      // 各年
      .col-12(v-for='(t,t_index) in thesis.order')
        .row(v-if='thesis.content[t]')
          .col-auto.text-center
            .time-circle
              span(v-if="thesis.content[t].name_en!='ee'") {{thesis.content[t].name}}
              span.special(v-if="thesis.content[t].name_en=='ee' && !language")
                | 碩士<br>在職專班
              span.special(v-if="thesis.content[t].name_en=='ee' && language")
                | Extension<br>Education
          .col-12.col-lg.my-5
            .row.list
              // 各專案
              .col-12.col-md-12.col-lg-6.text-center.sr(v-for='(item,i_index) in thesis.content[t].content')
                a.item.d-flex(:style='getThesisItemStyle(item.img.cover)', :href='getThesisItemLink(t, i_index)')
                  .filter
                  .caption
                    h3.name {{(!language) ? item.name : item.name_en}}
                    hr
                    h4.author {{(!language) ? item.author : item.author_en}}
                  .info
                    p(v-html='(!language) ? item.content : item.content_en')
</template>

<script>
import { page } from '@/mixins/page.js'

export default {
  data () {
    return {
      data: null,
      thesis: null,
    }
  },
  mounted () {
    this.setBg()
    this.fetch('thesis')
  },
  methods: {
  },
  mixins: [page]
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_thesis.sass"
</style>
