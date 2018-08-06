<template lang="pug">
.jumbotron.jumbotron-fluid.title.member&attributes(attributes)
  .container.text-light
    .row.align-items-center.justify-content-center(v-cloak)
      .col.col-sm-auto.illustration.d-none.d-sm-block
        img.img-fluid.mr-1.fade-in(src='img/signal.svg')
      .col.col-sm
        h1.display-4 {{currPage.name}}
        h1.lead {{currPage.name_ch}}
</template>

<script>
export default {
  name: 'jumbotron-title',
  data () {
    return {
    }
  },
  computed: {
    currPage () {
      let currentPage = null
      this.pages.forEach((val) => {
        if(val.page === this.$route.name) currentPage = val
      })
      return currentPage
    }
  }
}
</script>

<style scoped lang="sass">

</style>
