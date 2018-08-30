<template lang="pug">
.container(v-if="publication")
  .row
    .col-12.col-md-3.mb-3
      vertical-menu(:subPages='subPages' :subPage='subPage' @c='setSubPage')

    .col-12.col-md(v-if="subPage==''")
      template(v-for='(p,p_index) in publication')
        h2
          | {{p.name}}
          small {{p.name_en}}
          a.compact.ui.tiny.button.mx-3(title='新增' @click='clickAddPublication(p_index)') #[fa(icon='plus')]
        draggable(v-model='p.content', :class="'ui aligned vary relaxed divided list'", @end="modifyPublication('sort', p_index, p.content)")
          .item.drag(v-for='(i, i_index) in p.content')
            .container-fluid
              .row
                .col
                  strong {{i_index+1}}.
                  span(v-html='i.content')
                .col-auto.edit-del-btn
                  a.mr-1(href='#', @click="clickEditPublication(p_index, i_index)", title='修改') #[fa(icon='edit')]
                  a(href='#', @click.prevent="modifyPublication('del', p_index, i_index)", title='刪除') #[fa(icon='times')]

    // Add Publication
    transition(enter-active-class='animated fadeInUp')
      .col-12.col-md(v-if="subPage=='add' || subPage=='edit'")
        .ui.segment
          h2(v-if="subPage=='add'") Add Publication
          h2(v-if="subPage=='edit'") Edit Publication
          .container-fluid
            .row
              .col-12
                form.form-row(@submit.prevent='modifyPublication(subPage)')
                  .col-12.form-group.input-group-sm(hidden='')
                    label Category ID
                    input.form-control(type='text', v-model='newObj.p_index', readonly='')
                  .col-12.col-md-12.form-group.input-group-sm
                    form-label(ch='內容' en='Content' :r='true')
                    VueEditor(v-model='newObj.content.content' :editorToolbar='customToolbar' required)
                    tip(t='em')

                  .col-12.col-md-12.form-group.input-group-sm
                    form-label(ch='預覽' en='Preview')
                    .bg-gray.px-2(v-html='newObj.content.content')

                  .col-12.form-group.input-group-sm
                    button.compact.ui.olive.button(type='submit', v-if="subPage=='add'") #[fa(icon='plus')] 新增
                    button.compact.ui.teal.button(type='submit', v-if="subPage=='edit'") #[fa(icon='edit')] 修改
                    button.compact.ui.button(type='button', @click='init()') 取消
</template>

<script>
import * as config from '@/config'
import { manage } from '@/mixins/manage.js'

export default {
  data () {
    return {
      publication: null,
      subPages: [
        {name:'Add / Edit / Sort', page: ''},
      ]
    }
  },
  mounted () {
    this.fetch(`publication`)
  },
  methods: {
    clickAddPublication (p_index) {
      this.init()
      this.subPage = 'add'
      this.newObj.p_index = p_index
    },
    clickEditPublication (p_index, i_index) {
      this.init()
      this.subPage = 'edit'
      var newObj = this.newObj  // 新publication obj
      var p = this.publication[p_index].content[i_index]  // 原publication obj
      newObj.p_index = p_index
      newObj.i_index = i_index
      newObj.content = $.extend(true,{}, p)  // 複製object
    },
    init () {
      this.subPage = ''
      this.newObj = { 'p_index': '', 'i_index': '', 'content': {'content': '',} }
    },
    modifyPublication(opertaion, p_index, data) {
      const vm = this
      var list = []
      var newObj = this.newObj
      var ref = config.dbRef.child('publication/' + p_index + '/content/')

      newObj.content.content = this.replacePTag(newObj.content.content)

      switch (opertaion) {
        case 'add':
          var ref = config.dbRef.child('publication/' + newObj.p_index + '/content/')
          ref.on('value', function(snap) {
            list = (snap.val()) ? snap.val() : []
          })
          list.unshift(newObj.content)
          ref.set(list, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功新增' })
              vm.init()
            } else alert(e)
          })
          break
        case 'edit':
          var ref = config.dbRef.child('publication/' + newObj.p_index + '/content/' + newObj.i_index)
          ref.set(newObj.content, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功修改' })
              vm.init()
            } else alert(e)
          })
          break
        case 'del':
          if(confirm(config.CONFIRM_MSG)){
            ref.on('value', function(snap) {
              list = (snap.val()) ? snap.val() : []
            })
            list.splice(data, 1)
            ref.set(list, function (e) {
              if (!e) {
                vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功移除' })
              } else alert(e)
            })
          }
          break
        case 'sort':
          list = data
          ref.set(list, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 已重新排序' })
            } else alert(e)
          })
        default:
      }
    },
  },
  components: {},
  mixins: [manage]
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_manage.sass"
</style>
