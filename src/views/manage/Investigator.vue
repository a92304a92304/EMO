<template lang="pug">
.container(v-if="investigator")
  file-progess-bar(:value='fileProgress')
  modal-img(:img='modalImg')

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
          a.compact.ui.tiny.button.mx-3(title='新增' @click='clickAddInvestigator(type)') #[fa(icon='plus')]

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
                    fa(icon='calendar-alt')
                    |  {{i.year}}
                .col(v-if="type == 'researchProject'")
                  | {{i.content}}
                  br
                  small.text-muted {{i.content_en}}
                .col(v-if="type == 'reviewer'")
                  | {{i.content}}
                  span.ui.tiny.label
                    fa(icon='calendar-alt')
                    |  {{i.year}}
                .col-auto
                  a.text-info.mr-1(href='#', @click="clickEditInvestigator(type, i_index)", title='修改') #[fa(icon='edit')]
                  a.text-danger(href='#', @click.prevent="modifyInvestigator('del', type, i_index)", title='刪除') #[fa(icon='trash')]

    // Add Investigator
    transition(enter-active-class='animated fadeInUp')
      .col-12.col-md(v-if="subPage=='add' || subPage=='edit'")
        .ui.segment
          h2(v-if="subPage=='add'") Add
          h2(v-if="subPage=='edit'") Edit
          .container-fluid
            .row
              .col-12
                form.form-row(@submit.prevent='modifyInvestigator(subPage)')
                  .col-12.col-md-6.form-group.input-group-sm(v-if="newObj.type=='teaching'")
                    form-label(ch='名稱' en='Name' :r='true')
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
                    button.compact.ui.olive.button(type='submit', v-if="subPage=='add'") #[fa(icon='plus')] 新增
                    button.compact.ui.teal.button(type='submit', v-if="subPage=='edit'") #[fa(icon='edit')] 修改
                    button.compact.ui.button(type='button', @click='initInvestigatorField()') 取消

    // Investigator Introduction (修改介紹和圖片)
    .col-12.col-md(v-if="subPage=='introduction'")
      .form-row.align-items-end
        .col-12.col-md-12.form-group.input-group-sm
          form-label(ch='內容' en='Content' :r='true' )
          textarea.form-control(rows='6', cols='100', v-model='investigator.introduction.content')
          tip(t='br')

        .col-12.col-md-12.form-group.input-group-sm
          form-label(ch='英文內容' en='Content (English)')
          textarea.form-control(rows='6', cols='100', v-model='investigator.introduction.content_en', placeholder='<同中文>')

        .col-12.form-group.input-group-sm
          form-label(ch='上傳自訂大頭照' en='Upload Avatar')
          transition(mode='out-in', enter-active-class='animated bounceIn')
            .ui.blue.image.label.mx-2(v-if="investigator.introduction.img!=''")
              img.bg-light(:src='investigator.introduction.img', @click.prevent='showModalImg(investigator.introduction.img)')
              | 已上傳圖片
              a(href='#', @click="investigator.introduction.img=''")  #[fa(icon='times')]
          .custom-file
            input.custom-file-input(type='file', accept='image/*', @change='uploadInvestigatorImg($event)')
            label.custom-file-label Choose New File...
            tip(t='fileSize')

        .col-auto.form-group.input-group-sm
          button.compact.ui.teal.button(type='button', @click="modifyInvestigator('introduction', 'introduction', investigator.introduction)") #[fa(icon='edit')] 修改
</template>

<script>
import * as config from '@/config'
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
    clickEditInvestigator (type, i_index) {
      this.initInvestigatorField()
      this.subPage = 'edit'
      const ni = this.newObj  // 新investigator obj
      const i = this.investigator[type][i_index]  // 原investigator obj
      ni.type = type
      ni.i_index = i_index
      ni.content = $.extend(true,{}, i)  // 複製object
    },
    initInvestigatorField () {
      this.subPage = ''
      this.newObj = {
        type: '', i_index: '',
        content: { name: '', name_en: '', content: '', content_en: '', year: '',}
      }
    },
    modifyInvestigator (opertaion, type, data) {
      const vm = this
      const dbRef = config.dbRef
      let list = []
      let newObj = this.newObj
      let ref = dbRef.child('investigator/' + type)

      switch (opertaion) {
        case 'add':
          ref = dbRef.child('investigator/' + newObj.type)
          ref.on('value', function(snap) {
            list = (snap.val()) ? snap.val() : []
          })
          list.unshift(newObj.content)
          ref.set(list, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功新增' })
              vm.initInvestigatorField()
            } else alert(e)
          })
          break
        case 'edit':
          ref = dbRef.child('investigator/' + newObj.type + '/' + newObj.i_index)
          ref.set(newObj.content, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功修改' })
              vm.initInvestigatorField()
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
          break
        case 'introduction':
          ref.set(data, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功修改' })

            } else alert(e)
          })
          break
        default:
      }
    },
    uploadInvestigatorImg (evt) {
      const vm = this
      var file = evt.target.files[0]
      var fileName = this.getRandomNum().toString()
      var uploadTask = config.storageRef.child('investigator/'+ fileName).put(file)

      if(evt.target.files[0].size > config.MAX_FILE_SIZE){
        vm.$notify({ group: 'snackbar', type: 'error', title: config.FILE_SIZE_MSG })
        return
      }

      uploadTask.on('state_changed',(snap) => {
        vm.fileProgress = ((snap.bytesTransferred / snap.totalBytes) * 100).toFixed(1)
      })
      uploadTask.then((snap) => {
        vm.fileProgress = null
        snap.ref.getDownloadURL().then((url) => {
          vm.investigator.introduction.img = url
        })
      })
    },
  },
  components: {},
  mixins: [manage]
}
</script>

<style scoped lang="sass">
</style>
