<template lang="pug">
section(v-if='data')
  .control.middle
    a(@click.prevent='goPage(`prev`)' href='#')
      fa(icon='angle-left')
    a(@click.prevent='goPage()' href='#')
      fa(icon='angle-right')
  .control.bottom.d-none.d-md-flex(v-if='data')
    template(v-for='i in count')
      a(@click.prevent='goPage(i-1)' href='#' :class='{ active: (i-1) == getCarousel()}')

  carousel(v-if='data' ref='carousel' :per-page='1' :autoplay='true' :autoplayHoverPause='true' :loop='true' :paginationEnabled='false' style={ height: `100%`, width: `100%`, position: `relative`, background: `#333`, margin: 0 })
    slide(v-for='(c, c_index) in data.content' style={ textAlign: `center` } :key='c')
      img.img-fluid(:src='c' style={ height: `100%`, objectFit: `cover`} :key='c' @click='f()')
</template>

<script>
import * as config from '@/config'
import { Carousel, Slide } from 'vue-carousel'

export default {
  data () {
    return {
      count: 0,
      timer: null,
    }
  },
  mounted () {
    const vm = this
    vm.timer = setInterval(() => {
      vm.count = vm.getCarousel(`slideCount`)
      if(vm.count > 0) clearInterval(vm.timer)
    }, 1000)
  },
  methods: {
    // 切換上/下一張輪播照片
    goPage (page = 'next') {
      const carousel = this.$refs.carousel
      const next = carousel.getNextPage()
      const prev = carousel.getPreviousPage()

      if(page == 'next') carousel.goToPage(next)        // 下一張
      else if(page == 'prev') carousel.goToPage(prev)   // 上一張
      else carousel.goToPage(parseInt(page))            // 跳至某頁
    },
    // 取得輪播組件的 ref
    getCarousel (type = 'currentPage') {
      if(typeof this.$refs.carousel !== 'undefined')
        return this.$refs.carousel[type]
      else return 0
    },
  },

  components: { Carousel, Slide },
  props: [`data`],
}
</script>

<style scoped lang="sass">
section
  position: relative
  height: 500px
  .VueCarousel-slide
    height: 500px

.control
  display: flex
  position: absolute
  left: 0
  right: 0
  z-index: 100
  &.bottom
    bottom: 2rem
    justify-content: center
    a
      transition: background-color .2s
      width: .5rem
      height: .5rem
      border-radius: 100%
      margin: 0 .2rem
      background-color: rgba(white, .5)
      &.active
        background-color: rgba(white, 1)

  &.middle
    z-index: 101
    justify-content: space-between
    top: calc(50% - (3rem / 2))
    width: 100%
    height: 3rem
    padding: 0 2rem
    a
      font-size: 2rem
      color: rgba(white, .5)
      z-index: 20
      padding: .5rem

img
  object-fit: cover

@media (max-width: 768px)
  section
    position: relative
    height: 300px
    .VueCarousel-slide
      height: 300px
</style>
