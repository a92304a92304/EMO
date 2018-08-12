<template lang="pug">
footer.text-center.bg-light
  small.text-dark
    fa.mr-1(icon='database')
    a.text-dark(:href='db', target='_blank') {{ db }}
</template>

<script>
import * as config from '@/config'

export default {
  computed: {
    db () {
      return config.config.databaseURL
    }
  }
}
</script>

<style lang="sass">
footer
  margin-top: 2rem
  +py(2rem)
</style>
