<template lang="pug">
main
  jumbotron-title(:style='setBg()')

  .container.thesis.mt-3
    .row.no-gutters.timeline(v-if='!data')
      each val in [1, 2]
        .col-12
          .row
            .col-auto.text-center
              .time-circle
                span
            .col-12.col-lg.my-5
              .row.list
                each val in [1, 2]
                  .col-12.col-md-12.col-lg-6.text-center
                    a.item.d-flex(style={backgroundColor: '#eee'})
    .row.no-gutters.timeline(v-if='data')
      // 各年
      .col-12(v-for='(t,t_index) in data.order')
        .row(v-if='data.content[t]')
          .col-auto.text-center
            .time-circle
              span(v-if="data.content[t].name_en!='ee'") {{data.content[t].name}}
              span.special(v-if="data.content[t].name_en=='ee' && !language")
                | 碩士<br>在職專班
              span.special(v-if="data.content[t].name_en=='ee' && language")
                | Extension<br>Education
          .col-12.col-lg.my-5
            .row.list
              // 各專案
              .col-12.col-md-12.col-lg-6.text-center.sr(v-for='(item,i_index) in data.content[t].content')
                router-link.item.d-flex(:to='getThesisItemLink(t, i_index)' :style='getThesisItemStyle(item.img.cover)')
                  .filter
                  .caption
                    h3.name {{(!language) ? item.name : item.name_en}}
                    hr
                    h4.author {{(!language) ? item.author : item.author_en}}
                  .info
                    p(v-html='(!language) ? item.content : item.content_en')
</template>

<script>
import * as config from '@/config'
import { page } from '@/mixins/page.js'

export default {
  data () {
    return {
      data: null,
    }
  },
  mounted () {
    this.setBg()
    this.fetch(this.$route.name)
  },
  methods: {
    fetch (page) {
      const vm = this
      config.dbRef.child(`${page}`).once('value', function(snap) {
        vm.data = snap.val()
      })
    },
  },
  watch: {
    $route () {
      this.data = null
      this.fetch(this.$route.name)
    }
  },
  mixins: [page],
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_thesis.sass"
</style>
