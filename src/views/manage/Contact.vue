<template lang="pug">
.container(v-if="contact")
  file-progess-bar(:value='fileProgress')
  modal-img(:img='modalImg')

  .row
    .col-12.col-md-3.mb-3
      vertical-menu(:subPages='subPages' :subPage='subPage' @c='setSubPage')

    .col-12.col-md(v-if="subPage==''")
      .ui.segment
        form.form-row(@submit.prevent='submit()', @keydown.enter.prevent)
          .col-12.mb-3(v-for="type in ['investigator', 'lab']")
            h2(v-if="type == 'investigator'") Investigator
            h2(v-else) Lab
            .card.bg-light.mb-2.py-1.px-3(v-for='(item,item_index) in contact[type].content')
              .form-row
                .col-12.mt-3
                  h5 {{item.name}}
                .col-12.col-lg-6.form-group.input-group-sm
                  form-label(ch='內容' en='Content' :r='true')
                  input.form-control(type='text', maxlength='300', required, v-model='item.content')
                .col-12.col-lg-6.form-group.input-group-sm
                  form-label(ch='英文內容' en='Content (English)')
                  input.form-control(type='text', maxlength='300', placeholder='<同中文>', v-model='item.content_en')

          .col-12.col-md-12.form-group.input-group-sm
            button.compact.ui.teal.button(type='submit') #[fa(icon='edit')] 修改
</template>

<script>
import * as config from '@/config'
import { manage } from '@/mixins/manage.js'

export default {
  data () {
    return {
      contact: null,
      subPages: [
        {name:'Edit', page: ''},
      ]
    }
  },
  mounted () {
    this.fetch(`contact`)
  },
  methods: {
    submit:function () {
      const vm = this
      const dbRef = config.dbRef
      var ref = dbRef.child('contact/')
      ref.set(this.contact, function (e) {
        if (!e) {
          vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功修改' })
        } else alert(e)
      })
    },
  },
  components: {},
  mixins: [manage]
}
</script>

<style lang="sass">
@import "@/assets/css/_manage.sass"
</style>
