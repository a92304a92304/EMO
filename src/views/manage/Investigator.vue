<template lang="pug">
.container(v-if="investigator")
  .row
    .col-12.col-md-3.mb-3
      vertical-menu(:subPages='subPages' :subPage='subPage' @c='setSubPage')

    // Investigator List
    .col-12.col-md(v-if="subPage==''")
      template(v-for="type in ['teaching', 'researchProject', 'reviewer']")
        h2.sticky-top(style='background:white;')
          span(v-if="type=='teaching'")
            | 教學課程
            small Teaching
          span(v-else-if="type=='researchProject'")
            | 研究計畫
            small Research Project
          span(v-else-if="type=='reviewer'")
            | SCI國際期刊論文審查
            small Reviewer
          add-btn(@c='clickAddInvestigator(type)')

        draggable(v-model='investigator[type]', @end="modifyInvestigator('sort', type, investigator[type])", :class="'ui middle aligned divided list mb-5'")
          .item.drag(v-for='(i, i_index) in investigator[type]')
            .container-fluid
              .row
                .col-auto
                  span(style='vertical-align:-webkit-baseline-middle') {{i_index+1}}.
                .col(v-if="type == 'teaching'")
                  | {{i.name}}
                  small.text-muted {{i.name_en}}
                  span.ui.tiny.label
                    i.fas.fa-calendar-alt
                    |  {{i.year}}
                .col(v-if="type == 'researchProject'")
                  | {{i.content}}
                  br
                  small.text-muted {{i.content_en}}
                .col(v-if="type == 'reviewer'")
                  | {{i.content}}
                  span.ui.tiny.label
                    i.fas.fa-calendar-alt
                    |  {{i.year}}
                .col-auto
                  //- +edit-and-del-btn("ClickEditInvestigator(type, i_index)", "modifyInvestigator('del', type, i_index)")

    // Add Investigator
    transition(enter-active-class='animated fadeInUp')
      .col-12.col-md(v-if="subPage=='add' || subPage=='edit'")
        .ui.segment
          h2(v-if="subPage=='add'")
            i.fas.fa-plus-square
            |  Add
          h2(v-if="subPage=='edit'")
            i.fas.fa-edit
            |  Edit
          .container-fluid
            .row
              .col-12
                form.form-row(@submit.prevent='modifyInvestigator(subPage)')
                  .col-12.col-md-6.form-group.input-group-sm(v-if="newObj.type=='teaching'")
                    form-label(ch='名稱' en='Name' :r='true' )
                    input.form-control(type='text', maxlength='100', v-model.trim='newObj.content.name', required)

                  .col-12.col-md-6.form-group.input-group-sm(v-if="newObj.type=='teaching'")
                    form-label(ch='英文名稱' en='Name (English)')
                    input.form-control(type='text', maxlength='100', v-model.trim='newObj.content.name_en')

                  .col-12.col-md-12.form-group.input-group-sm
                    form-label(ch='內容' en='Content')
                    textarea.form-control(rows='4', cols='100', v-model.trim='newObj.content.content')

                  .col-12.col-md-12.form-group.input-group-sm(v-if="newObj.type!='reviewer'")
                    form-label(ch='英文內容' en='Content (English)')
                    textarea.form-control(rows='4', cols='100', v-model.trim='newObj.content.content_en')

                  .col-12.col-md-12.form-group.input-group-sm(v-if="newObj.type!='researchProject'")
                    form-label(ch='年份' en='Year')
                    input.form-control(type='text', maxlength='50', v-model.trim='newObj.content.year')

                  .col-12.form-group.input-group-sm
                    //- +submitAddBtn()(type='submit', v-if="subPage=='add'")
                    //- +submitEditBtn()(type='submit', v-if="subPage=='edit'")
                    //- +cancelBtn()(type='button', @click='initInvestigatorField()')

    // Investigator Introduction (修改介紹和圖片)
    .col-12.col-md(v-if="subPage=='introduction'")
      .form-row.align-items-end
        .col-12.col-md-12.form-group.input-group-sm
          form-label(ch='內容' en='Content' :r='true' )
          textarea.form-control(rows='6', cols='100', v-model='investigator.introduction.content')
          //- +br-text-tip

        .col-12.col-md-12.form-group.input-group-sm
          form-label(ch='英文內容' en='Content (English)')
          textarea.form-control(rows='6', cols='100', v-model='investigator.introduction.content_en', placeholder='<同中文>')

        .col-12.form-group.input-group-sm
          form-label(ch='上傳自訂大頭照' en='Upload Avatar')
          transition(mode='out-in', enter-active-class='animated bounceIn')
            .ui.blue.image.label.mx-2(v-if="investigator.introduction.img!=''")
              img.bg-light(:src='investigator.introduction.img', @click.prevent='ShowModalImg(investigator.introduction.img)')
              | 已上傳圖片
              a(href='#', @click="investigator.introduction.img=''")
                i.fas.fa-times
          .custom-file
            input.custom-file-input(type='file', accept='image/*', @change='UploadInvestigatorImg($event)')
            label.custom-file-label Choose New File...
            //- +file-size-tip

        .col-auto.form-group.input-group-sm
          //- +submitEditBtn()(type='button', @click="modifyInvestigator('introduction', 'introduction', investigator.introduction)")
</template>

<script>
import { manage } from '@/mixins/manage.js'

export default {
  data () {
    return {
      investigator: null,
      subPages: [
        {name:'Add / Edit / Sort', page: ''},
        {name:'Introduction', page: 'introduction'},
      ]
    }
  },
  mounted () {
    this.fetch(`investigator`)
  },
  methods: {
    clickAddInvestigator (type) {
      this.initInvestigatorField()
      this.subPage = 'add'
      this.newObj.type = type
    },
    initInvestigatorField : function () {
      this.subPage = ''
      this.newObj = {
        type: '', i_index: '',
        content: { name: '', name_en: '', content: '', content_en: '', year: '',}
      }
    },

    modifyInvestigator (opertaion, type, data) {
      const vm = this
      var list = []
      var newObj = this.newObj
      var ref = dbRef.child('investigator/' + type)

      switch (opertaion) {
        case 'add':
          var ref = dbRef.child('investigator/' + newObj.type)
          ref.on('value', function(snap) {
            list = (snap.val()) ? snap.val() : []
          })
          list.unshift(newObj.content)
          ref.set(list, function (e) {
            if (!e) {
              vm.ShowSnackbar(`${SUCCESS_ICON} 成功新增`)
              vm.InitInvestigatorField()
            } else alert(e)
          })
          break
        case 'edit':
          var ref = dbRef.child('investigator/' + newObj.type + '/' + newObj.i_index)
          ref.set(newObj.content, function (e) {
            if (!e) {
              vm.ShowSnackbar(`${SUCCESS_ICON} 成功修改`)
              vm.InitInvestigatorField()
            } else alert(e)
          })
          break
        case 'del':
          if(confirm(CONFIRM_MSG)){
            ref.on('value', function(snap) {
              list = (snap.val()) ? snap.val() : []
            })
            list.splice(data, 1)
            ref.set(list, function (e) {
              if (!e) {
                vm.ShowSnackbar(`${SUCCESS_ICON} 成功移除`)
              } else alert(e)
            })
          }
          break
        case 'sort':
          list = data
          ref.set(list, function (e) {
            if (!e) {
              vm.ShowSnackbar(`${SUCCESS_ICON} 已重新排序`)
            } else alert(e)
          })
          break
        case 'introduction':
          ref.set(data, function (e) {
            if (!e) {
              vm.ShowSnackbar(`${SUCCESS_ICON} 成功修改`)
            } else alert(e)
          })
          break
        default:
      }
    },
  },
  components: {
  },
  mixins: [manage]
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_manage.sass"
</style>
