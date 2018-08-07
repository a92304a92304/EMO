<template lang="pug">
main
  jumbotron-title(:style='setBg()')
  loading(c='page', v-if='!publication')
  .container.publication(v-if='publication')
    .row.justify-content-center
      template(v-for='(p,p_index) in publication')
        .col-12.col-md-11.mb-5
          h2.subtitle {{(!language)?p.name:p.name_en}}
          ol.ui.divided.animated.very.relaxed.list
            template(v-for='(item, i_index) in p.content')
              li.item(v-html='item.content')
</template>

<script>
import { page } from '@/mixins/page.js'

export default {
  data () {
    return {
      publication: null,
    }
  },
  mounted () {
    this.setBg()
    this.fetch('publication')
  },
  mixins: [page]
}
</script>

<style scoped lang="sass">
li
  line-height: 1.5rem
</style>
