<template lang="pug">
transition(enter-active-class='animated fadeInUp', leave-active-class='animated fadeOut')
  .progress-area(style={bottom: '1rem',animationDuration: '.3s'} v-if='value')
    .container-fluid
      .row
        .col-12.col-sm-6.col-lg-4
          .ui.olive.segment
            .mb-2 #[fa(icon='upload')] 上傳中...
            .progress
              .progress-bar.progress-bar-striped.progress-bar-animated(role='progressbar', :style="'width:' + value + '%'") {{ value }} %
</template>

<script>
export default {
  data () {
    return {}
  },
  props: [`value`]
}
</script>

<style lang="sass">
.progress-area
  position: fixed
  bottom: 1rem
  left: 0
  right: 0
  z-index: 10000

.progress-bar
  background-color: $primary
  color: $black
  overflow: hidden
</style>
