<template lang="pug">
.manage
  ManageNavbar
  router-view(style=`margin-top: 6rem`)
  notifications(group='snackbar' position='bottom right' animation-type='velocity' :max='5')
</template>

<script>
import ManageNavbar from '@/components/ManageNavbar.vue'
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
    ManageNavbar
  }
}
</script>

<style lang="sass">
@import "@/assets/css/_manage.sass"
</style>
