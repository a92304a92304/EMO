<template lang="pug">
div
  .ui.fluid.secondary.vertical.menu.d-none.d-md-block
    a.item(:class='(subPage == p.page) ? `active` : ``' @click='click(p.page)' v-for='p in subPages') {{ p.name }}
  .dropdown.d-block.d-md-none
    button#dropdownMenuButton.btn.btn-light.btn-block.dropdown-toggle(type='button' data-toggle='dropdown')
      | Menu
    .dropdown-menu
      a.dropdown-item(href='#'  @click='click(p.page)' v-for='p in subPages') {{ p.name }}
</template>


<script>
export default {
  methods: {
    click (page) {
      this.$emit('c', page)
    }
  },
  props: [`subPages`, `subPage`]
}
</script>
