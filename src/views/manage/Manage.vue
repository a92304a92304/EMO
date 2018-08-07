<template lang="pug">
div
  ManageNavbar
  router-view
</template>

<script>
import ManageNavbar from '@/components/ManageNavbar.vue'
export default {
  data () {
    return {
      data: null,
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
