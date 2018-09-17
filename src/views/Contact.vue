<template lang="pug">
main
  jumbotron-title(:style='setBg()')
  loading(c='page', v-if='!contact')

  .container.contact(v-if='contact', v-cloak)
    .row
      .col-12.col-md-12.mb-3
        h2.subtitle {{(!language)? '陳晏笙博士' : 'Dr. Yen-Sheng Chen'}}
        p.text-center
          span.ui.label.mr-2(v-for='item in contact.investigator.content')
            i.fas.fa-envelope(:class="'fa-'+item.icon")
            |  {{selectTextLanguage(language, item.name, item.name_en)}}
            span.detail(v-html='selectTextLanguage(language, item.content, item.content_en)')
    hr
    .row
      .col-12.col-md-12.mb-3
        h2.subtitle {{(!language)? '實驗室位置' : 'Mailing Address'}}
        .row.align-items-center.justify-content-center
          .col-12.col-md-8.mb-3
            .row.align-items-center.justify-content-center
              .col-auto.d-none.d-sm-flex
                span(style='font-size: 3rem')
                  i.fas.fa-location-arrow
              .col-12.col-sm-8.mb-3
                .ui.segment
                  address.mb-0.px-2(v-html='selectTextLanguage(language, contact.lab.address, contact.lab.address_en)') 地址
              .col-12
                p.text-center(v-html='selectTextLanguage(language, contact.lab.addressInfo, contact.lab.addressInfo_en)') （如需申請臺北科大臨時停車位，請郵寄通知）
                p.text-center
                  span.ui.label.mr-2.mb-2(v-for='item in contact.lab.content')
                    i.fas.fa-envelope(:class="'fa-'+item.icon")
                    |                   {{selectTextLanguage(language, item.name, item.name_en)}}
                    span.detail(v-html='selectTextLanguage(language, item.content, item.content_en)')
          .col-12.col-md-6.order-10
            img.img-fluid(src='img/lab-location.jpg', alt='實驗室位置', v-if='!language')
            img.img-fluid(src='img/lab-location-en.jpg', alt='Lab Location', v-else)
  div
    gmap-map(:center='labPosition', :zoom='16', map-type-id='terrain', style='width: 100%; height: 30rem; margin-bottom:-3rem')
      gmap-marker(:position='labPosition' icon='./img/marker.png')
</template>

<script>
import { page } from '@/mixins/page.js'

export default {
  data () {
    return {
      contact: null,
      labPosition: { lat: 25.043133, lng: 121.536019 }
    }
  },
  mounted () {
    this.setBg()
    this.fetch('contact')
  },
  mixins: [page],
}
</script>

<style scoped lang="sass">
// @import "@/assets/css/contact.sass"
</style>
