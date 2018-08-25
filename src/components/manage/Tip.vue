<template lang="pug">
span
  small.form-text.text-muted(v-if='t ==`fileSize`')
    | 圖片大小限制 <code>500KB</code> 以下

  small.form-text.text-muted(v-if='t ==`br`')
    code= '<br>'
    |  : 換行

  small.form-text.text-muted(v-if='t ==`em`')
    code= '<em>...</em>'
    |  :
    em 斜體文字
</template>


<script>
export default {
  props: [`t`]
}
</script>
