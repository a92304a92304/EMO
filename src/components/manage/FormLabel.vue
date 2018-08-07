<template lang="pug">
label
  | {{ ch }}
  small   {{ en }}
  span.text-danger(v-if='isRequired') *
</template>


<script>
export default {
  computed: {
    isRequired () {
      return this.r || false
    }
  },
  props: [`ch`, `en`, `r`]
}
</script>
