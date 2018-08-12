<template lang="pug">
.manage
  Navbar
  router-view(style=`margin-top: 6rem`)
  Footer
  notifications(group='snackbar' position='bottom right' animation-type='velocity' :max='5')
</template>

<script>
import Navbar from '@/components/manage/Navbar.vue'
import Footer from '@/components/manage/Footer.vue'
export default {
  data () {
    return {
      fileProgress: null,
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
    Navbar,
    Footer,
  }
}
</script>

<style lang="sass">
@import "@/assets/css/_manage.sass"
</style>
