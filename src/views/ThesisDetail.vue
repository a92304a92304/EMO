<template lang="pug">
  modal-img(:img='modalImg')
</template>

<script>
import { page } from '@/mixins/page.js'

export default {
  data () {
    return {
      data: null,
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
// @import "@/assets/css/_investigator.sass"
</style>
