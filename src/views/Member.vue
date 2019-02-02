<template lang="pug">
main
  #member-detail.modal.fade(tabindex='-1', role='dialog', aria-hidden='true')
    .modal-dialog.modal-dialog-centered(role='document')
      .modal-content
        .modal-body
          .container.py-3
            .row.align-items-center(v-if='memberModal != null')
              .col-12(hidden='')
                button.close(type='button', data-dismiss='modal', aria-label='Close')
                  span(aria-hidden='true') ×
              .col-12.col-md-auto.text-center
                img.img-fluid.rounded-circle.profile(:src='getMemberImgLink(memberModal)')
              .col.meishi
                h3 {{(!language) ? memberModal.name : memberModal.name_en}}
                h5(v-if='!language')
                  fa(icon='angle-right')
                  |   {{(!language) ? memberModal.grade : translateGrade(memberModal.grade)}}
                p.my-0(v-if="memberModal.email!=''")
                  fa(icon='envelope')
                  a(:href="'mailto:'+memberModal.email")  {{memberModal.email}}
          img.img-fluid.logo(src='../assets/img/logo.svg')

  jumbotron-title(:style='setBg()' style={ marginBottom: 0 })

  .member.mb-5(v-if='member')
    carousel(:data='carousel')

  loading(c='page', v-if='!member')
  .container.member(v-if='member')
    template(v-for='(p, p_index) in member.investigator[0].content')
      h2.subtitle {{(!language)? '主持人' : 'Principal Investigator'}}
      .row.justify-content-center.align-items-center.mb-5
        .col-auto
          img.img-fluid.rounded-circle.profile(:src='getMemberImgLink(p)')
        .col-auto.meishi
          h3 {{(!language) ? p.name : p.name_en}}
          h5 {{(!language) ? p.position : p.position_en}}
          p.my-0
            fa(icon='envelope')
            a(:href="'mailto:'+p.email")  {{p.email}}

    hr
    // Student
    template(v-for='(s, s_index) in member.student', v-if='calcArrayLength(s.content) != 0')
      h2.subtitle
        | {{(!language)?s.category:s.category_en}}
      .row.justify-content-around
        .col-6.col-md-4.col-lg-3.col-xl-3.text-center.mb-0.mb-md-4(v-for='(p, p_index) in s.content')
          // 成員item
          .item.sr(@click='clickMember(p)')
            img.img-fluid.rounded-circle.profile(:src='getMemberImgLink(p)')
            h4.my-0.mt-3(style='font-weight:400') {{(!language) ? p.name : p.name_en}}
      hr
    // Alumni
    h2.subtitle {{(!language)? '畢業生' : 'Alumni'}}
    .row.alumni
      .col-12.mb-3(v-for='(a, a_index) in member.alumni')
        h3.mb-3.d-inline-block {{(!language) ? a.category : a.category_en}}
        .row
          .col-6.col-md-3.item(v-for='(p,p_index) in a.content')
            .d-inline-block.mr-2(style='vertical-align: middle')
              fa(icon='user-circle' style='font-size:1.8rem')
            .d-inline-block(style='vertical-align: middle')
              h6.mb-0 {{(!language) ? p.name : p.name_en}}
              small(style='text-muted') {{(!language) ? p.date : translateDate(p.date)}}
</template>

<script>
import { page } from '@/mixins/page.js'
import carousel from '@/components/Carousel.vue'

export default {
  data () {
    return {
      member: null,
      carousel: null,
      memberModal: null,
    }
  },
  mounted () {
    this.setBg()
    this.fetch('member')
    this.fetchCarousel('member')
  },
  methods: {
    translateDate (ch) {
      if (typeof ch !== `string`) return ch
      return ch.replace(/年/g, '/').replace(/月/g, '').replace(/至/g, ' ~ ')
    },
    translateGrade (ch) {
      if (typeof ch !== `string`) return ch
      return ch.replace('大一', 'Freshman').replace('大二', 'Sophomore').replace('大三', 'Junior').replace('大四', 'Senior')
      .replace('碩一', 'First year of graduate school').replace('碩二', 'Second year of graduate school')
    },
    // 設定Member的modal詳情 (按下“成員”時設定)
    clickMember (p) {
      this.memberModal = p
      $('#member-detail').modal('show')
    }
  },
  components: { carousel },
  mixins: [page]
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_member.sass"
</style>
