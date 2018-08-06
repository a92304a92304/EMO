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

  jumbotron-title(:style='setBg()')

  .member.mb-5(v-if='member')
    #carousel.carousel.carousel-member.slide(data-ride='carousel', v-if='carousel')
      ol.carousel-indicators.d-none.d-md-flex
        li(data-target='#carousel', :data-slide-to='c_index', v-for='(c, c_index) in carousel.content', :class="(c_index==0)?'active':''")
      .carousel-inner.align-items-center
        .carousel-item(v-for='(c, c_index) in carousel.content', :class="(c_index==0)?'active':''")
          img.img-fluid(:src='c', alt='Index Carousel')
      a.carousel-control-prev(href='#carousel', role='button', data-slide='prev')
        span.carousel-control-prev-icon(aria-hidden='true')
      a.carousel-control-next(href='#carousel', role='button', data-slide='next')
        span.carousel-control-next-icon(aria-hidden='true')

  loading(c='page', v-if='!member')
  .container.member(v-if='member', v-cloak)
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
    template(v-for='(s, s_index) in member.student', v-if='s.content.length!=0')
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

export default {
  data () {
    return {
      data: null,
      member: null,
      carousel: null,
      memberModal: null,
    }
  },
  mounted () {
    this.setBg()
    this.fetch('member')
  },
  methods: {
    getMemberImgLink (obj) {
      if (obj.img == '' || !obj.img) {
        if (obj.fbid == '' || !obj.fbid) {
          return `img/avatar.png`
        } else {
          return `https://graph.facebook.com/${obj.fbid}/picture?type=large`
        }
      } else {
        return obj.img
      }
    },
    translateDate (ch) {
      return ch.replace(/年/g, '/').replace(/月/g, '').replace(/至/g, ' ~ ')
    },
    translateGrade (ch) {
      return ch.replace('大一', 'Freshman').replace('大二', 'Sophomore').replace('大三', 'Junior').replace('大四', 'Senior')
      .replace('碩一', 'First year of graduate school').replace('碩二', 'Second year of graduate school')
    },
    // 設定Member的modal詳情 (按下“成員”時設定)
    clickMember (p) {
      this.memberModal = p
      $('#member-detail').modal('show')
    }
  },
  mixins: [page]
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_member.sass"
</style>
