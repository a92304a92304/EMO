<template lang="pug">
.manage
  ManageNavbar
  router-view(style=`margin-top: 6rem`)
</template>

<script>
import ManageNavbar from '@/components/ManageNavbar.vue'
export default {
  data () {
    return {
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
