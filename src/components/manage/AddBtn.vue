<template lang="pug">
a.compact.ui.tiny.button.mx-3(title='新增' @click='click')
  fa(icon='plus')
</template>


<script>
export default {
  methods: {
    click () {
      this.$emit('c')
    }
  }
}
</script>
