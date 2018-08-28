<template lang="pug">
.manage-einstein.container(v-if="einstein")
  file-progess-bar(:value='fileProgress')
  modal-img(:img='modalImg')

  .row
    .col-12.col-md-3.mb-3
      vertical-menu(:subPages='subPages' :subPage='subPage' @c='setSubPage')

    // 前 5 項
    .col-12.col-md(v-if="subPage!='partnerships' && subPage!='add' && subPage!='edit' && subPage!=''")
      h2
        span
          | {{einstein[queryArray(einstein, 'page', subPage)].name}}
          small {{einstein[queryArray(einstein, 'page', subPage)].name_en}}
        a.compact.ui.tiny.button.mx-3(title='新增' @click="clickAddEinstein(subPage)") #[fa(icon='plus')]

      draggable(v-model="einstein[queryArray(einstein, 'page', subPage)].content", @end="modifyEinstein('sort', subPage, einstein[queryArray(einstein, 'page', subPage)].content)")
        .ui.segment.drag(v-for="(i, i_index) in einstein[queryArray(einstein, 'page', subPage)].content")
          .row
            .col-12.col-md-auto.order-3.order-md-1(v-if="subPage!='press'")
              img.img-fluid(:src='i.img', style={maxWidth: '200px'})
            .col.order-1.order-md-2
              h5(v-if="subPage=='demonstration' || subPage=='press' || subPage=='equipment'" ) {{i.title}}
              p.ellipsis(v-if="subPage!='press'") {{i.content}}
              span(v-if="subPage=='press'") {{i.source}} | {{i.date}}
            .col-auto.order-2.order-md-3
              a.text-info.mr-1(href='#', @click="clickEditEinstein(subPage, i_index)", title='修改') #[fa(icon='edit')]
              a.text-danger(href='#', @click.prevent="modifyEinstein('del', subPage, i_index)", title='刪除') #[fa(icon='trash')]


    // Partnerships List
    .col-12.col-md(v-else-if="subPage=='partnerships' && subPage!='add' && subPage!='edit' ")
      .form-row.align-items-end
        .col-12.col-md-12.form-group.input-group-sm
          form-label(ch='內容' en='Content')
          VueEditor(v-model=`einstein[queryArray(einstein, 'page', subPage)].content.content` :editorToolbar='customToolbar')

        .col-12.col-md-12.form-group.input-group-sm
          form-label(ch='英文內容' en='Content (English)')
          VueEditor(v-model=`einstein[queryArray(einstein, 'page', subPage)].content.content_en` :editorToolbar='customToolbar' placeholder='<同中文>')

        .col-auto.form-group.input-group-sm
          button.compact.ui.teal.button(type='button', @click="modifyEinstein('edit', 'partnerships', einstein[queryArray(einstein, 'page', subPage)].content)") #[fa(icon='edit')] 修改

      hr
      h2 Logo
      .form-group.input-group-sm
        label #[fa(icon='upload')] 上傳Logo圖片
        .custom-file
          input.custom-file-input(type='file', accept='image/*', @change="uploadEinsteinLogo($event)")
          label.custom-file-label Choose New File...
          tip(t='fileSize')
      div
        draggable(v-model="einstein[queryArray(einstein, 'page', subPage)].content.logo", @end="modifyEinsteinLogo('sort', einstein[queryArray(einstein, 'page', subPage)].content.logo)", :class="'ui middle aligned divided list'")
          transition-group(mode='out-in', enter-active-class='animated bounceIn', leave-active-class='animated bounceOut')
            .ui.compact.segment.mr-2.drag(style='display:inline-flex', v-for="(c,c_index) in einstein[queryArray(einstein, 'page', subPage)].content.logo", :key='c.img')
              img.img-fluid.rounded.pointer(:src='c.img', style='height:64px', @click='showModalImg(c.img)')
              .ui.bottom.left.attached.label
                | {{c_index+1}}
                a.text-danger(@click.prevent="modifyEinsteinLogo('del', c_index)", title='刪除') #[fa(icon='times')]


    // Add / Edit Einstein
    transition(enter-active-class='animated fadeInUp')
      .col-12.col-md(v-if="subPage=='add' || subPage=='edit'")
        .ui.segment
          h2(v-if="subPage=='add'") Add
          h2(v-if="subPage=='edit'") Edit
          .container-fluid
            .row
              .col-12
                form.form-row(@submit.prevent='modifyEinstein(subPage)', @keydown.enter.prevent)
                  .col-12.col-md-6.form-group.input-group-sm(v-if="newObj.type=='demonstration' || newObj.type=='press' || newObj.type=='equipment'")
                    form-label(ch='標題' en='Title' :r='true')
                    input.form-control(type='text', maxlength='300', v-model.trim='newObj.content.title', required)

                  .col-12.col-md-6.form-group.input-group-sm(v-if="newObj.type=='demonstration' || newObj.type=='press' || newObj.type=='equipment'")
                    form-label(ch='英文標題' en='Title (English)')
                    input.form-control(type='text', maxlength='300', v-model.trim='newObj.content.title_en', placeholder='<同中文>')

                  .col-12.form-group.input-group-sm(v-if="newObj.type=='press'")
                    form-label(ch='來源' en='Source')
                    input.form-control(type='text', maxlength='300', v-model.trim='newObj.content.source', required)

                  .col-12.form-group.input-group-sm(v-if="newObj.type=='press'")
                    form-label(ch='日期' en='Date')
                    input.form-control(type='text', maxlength='300', v-model.trim='newObj.content.date')

                  .col-12.col-md-12.form-group.input-group-sm(v-if="newObj.type=='demonstration' || newObj.type=='press'")
                    form-label(ch='連結' en='Link')
                    input.form-control(type='text', maxlength='300', v-model.trim='newObj.content.link')
                    small.form-text #[code http://] 或 #[code https://] 開頭

                  .col-12.form-group.input-group-sm(v-if="!(newObj.type=='press')")
                    form-label(ch='內容' en='Content')
                    VueEditor(v-model='newObj.content.content' :editorToolbar='customToolbar')

                  .col-12.form-group.input-group-sm(v-if="!(newObj.type=='press')")
                    form-label(ch='英文內容' en='Content (English)')
                    VueEditor(v-model='newObj.content.content_en' :editorToolbar='customToolbar' placeholder='<同中文>')

                  .col-12.form-group.input-group-sm(v-if="newObj.type=='demonstration' || newObj.type=='press'")
                    label #[fa(:icon='[`fab`, `youtube`]')] Youtube Link
                    input.form-control(type='text', maxlength='300', v-model.trim='newObj.content.youtube')

                  .col-12.form-group.input-group-sm(v-if="newObj.type!='press'")
                    label #[fa(icon='image')] 圖片 #[small Image]
                    div
                      transition(mode='out-in', enter-active-class='animated bounceIn')
                        .ui.blue.image.label.mx-2.mb-2(v-if="newObj.content.img!=''")
                          img.bg-light(:src='newObj.content.img', @click.prevent='showModalImg(newObj.content.img)')
                          |  已上傳
                          a(href='#', @click.prevent="newObj.content.img=''") #[fa(icon='times')]
                        .ui.basic.grey.label.mx-2.mb-2(v-else) no image
                    .custom-file
                      input.custom-file-input(type='file', accept='image/*', @change="uploadEinsteinImg($event)")
                      label.custom-file-label Choose New File...
                      tip(t='fileSize')

                  .col-12.form-group.input-group-sm(v-if="newObj.type=='demonstration'")
                    label #[fa(icon='file-pdf')] 附加檔案 #[small Attachment]
                    div
                      transition(mode='out-in', enter-active-class='animated bounceIn')
                        .ui.blue.image.label.mx-2.mb-2(v-if="newObj.content.attachment!=''")
                          a(:href='newObj.content.attachment' target='_blank') #[fa(icon='file-pdf')]
                          |  已上傳
                          a(href='#', @click.prevent="newObj.content.attachment=''") #[fa(icon='times')]
                        .ui.basic.grey.label.mx-2.mb-2(v-else) no file
                    .custom-file
                      input.custom-file-input(type='file' accept='application/pdf' @change="uploadEinsteinAttachment($event,'cover')")
                      label.custom-file-label Choose New File...

                  .col-12.col-md-12.form-group.input-group-sm
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
      einstein: null,
      subPages: [
        {name:'Purpose', page: 'purpose'},
        {name:'Scope', page: 'scope'},
        {name:'Equipment', page: 'equipment'},
        {name:'Demonstration', page: 'demonstration'},
        {name:'Press', page: 'press'},
        {name:'Partnerships', page: 'partnerships'},
      ]
    }
  },
  mounted () {
    this.fetch(`einstein`)
  },
  methods: {
    modifyEinstein (opertaion, type, data) {
      const vm = this
      const dbRef = config.dbRef
      var list = []
      var newObj = this.newObj
      var ref = dbRef.child('einstein/' + vm.queryArray(vm.einstein, 'page', type) + '/content')

      switch (opertaion) {
        case 'add':
          var ref = dbRef.child('einstein/' + vm.queryArray(vm.einstein, 'page', newObj.type) + '/content/')
          ref.on('value', function(snap) {
            list = (snap.val()) ? snap.val() : []
          })
          list.push(newObj.content)
          ref.set(list, (e) => {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功新增' })
              vm.init()
            } else alert(e)
          })
          break
        case 'edit':
          if(type == 'partnerships'){ // 針對Partnerships修改content
            var ref = dbRef.child('einstein/' + vm.queryArray(vm.einstein, 'page', 'partnerships') + '/content/')

            ref.set(data, (e) => {
              if (!e) vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功修改' })
              else alert(e)
            })
          }else{
            var ref = dbRef.child('einstein/' + vm.queryArray(vm.einstein, 'page', newObj.type) + '/content/' + newObj.i_index)
            ref.set(newObj.content, (e) => {
              if (!e) {
                vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功修改' })
                vm.init()
              } else alert(e)
            })
          }
          break
        case 'del':
          if(confirm(config.CONFIRM_MSG)){
            ref.on('value', function(snap) {
              list = (snap.val()) ? snap.val() : []
            })
            list.splice(data, 1)
            ref.set(list, (e) => {
              if (!e) vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功移除' })
              else alert(e)
            })
          }
          break
        case 'sort':
          list = data
          ref.set(list, (e) => {
            if (!e) vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 已重新排序' })
            else alert(e)
          })
          break
        default:
      }
    },
    uploadEinsteinLogo (evt) {
      const vm = this
      var file = evt.target.files[0]
      var fileName = this.getRandomNum().toString()
      var uploadTask = config.storageRef.child('einstein/logo/' + fileName).put(file)

      if(evt.target.files[0].size > config.MAX_FILE_SIZE){
        vm.$notify({ group: 'snackbar', type: 'error', title: config.FILE_SIZE_MSG })
        return
      }

      uploadTask.on('state_changed',function (snap) {
        vm.fileProgress = ((snap.bytesTransferred / snap.totalBytes) * 100).toFixed(1)
      })
      uploadTask.then(function (snap) {
        vm.fileProgress = null
        snap.ref.getDownloadURL().then((url) => {
          vm.modifyEinsteinLogo('add', {img: url})
        })
      })
    },
    modifyEinsteinLogo (opertaion, data) {
      const vm = this
      const dbRef = config.dbRef
      var list = []
      var newObj = this.newObj
      var ref = dbRef.child('einstein/' + vm.queryArray(vm.einstein, 'page', 'partnerships') + '/content/logo')

      switch (opertaion) {
        case 'add':
          ref.on('value', function(snap) {
            list = (snap.val()) ? snap.val() : []
          })
          list.push(data)
          ref.set(list, (e) => {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功新增' })
            } else alert(e)
          })
          break
        case 'del':
          if(confirm(config.CONFIRM_MSG)){
            ref.on('value', function(snap) {
              list = (snap.val()) ? snap.val() : []
            })
            list.splice(data, 1)
            ref.set(list, (e) => {
              if (!e) {
                vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功移除' })
              } else alert(e)
            })
          }
          break
        case 'sort':
          list = data
          ref.set(list, (e) => {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 已重新排序' })
            } else alert(e)
          })
          break
        default:
      }
    },
    clickAddEinstein (type) {
      this.init()
      this.subPage = 'add'
      this.newObj.type = type
    },
    clickEditEinstein (type, i_index) {
      this.init()
      this.subPage = 'edit'
      var newObj = this.newObj  // 新index obj
      var i = this.einstein[this.queryArray(this.einstein, 'page', type)].content[i_index]  // 原index obj
      newObj.type = type
      newObj.i_index = i_index
      newObj.content = $.extend(true,{}, i)  // 複製object
    },
    init () {
      this.subPage = (this.newObj) ? this.newObj.type : 'purpose'
      this.newObj = {
        type: '', i_index: '',
        content: { title: '', title_en: '', content: '', content_en: '', img: '', youtube: '', link: ''}
      }
      this.newObj = {
        type: '', i_index: '',
        content: {img: '', attachment: ''}
      }
    },
    uploadEinsteinImg (evt) {
      const vm = this
      const file = evt.target.files[0]
      const fileName = this.getRandomNum().toString()
      const uploadTask = config.storageRef.child('einstein/' + fileName).put(file)

      if(evt.target.files[0].size >  config.MAX_FILE_SIZE){
        vm.$notify({ group: 'snackbar', type: 'error', title: config.FILE_SIZE_MSG })
        return
      }

      uploadTask.on('state_changed',function (snap) {
        vm.fileProgress = ((snap.bytesTransferred / snap.totalBytes) * 100).toFixed(1)
        vm.file = file
      })
      uploadTask.then(function (snap) {
        vm.fileProgress = null
        snap.ref.getDownloadURL().then((url) => {
          vm.newObj.content.img = url
        })
      })
    },
    uploadEinsteinAttachment (evt) {
      const vm = this
      const file = evt.target.files[0]
      const fileName = this.getRandomNum().toString()
      const uploadTask = config.storageRef.child('einstein/' + fileName).put(file)

      uploadTask.on('state_changed', (snap) => {
        vm.fileProgress = ((snap.bytesTransferred / snap.totalBytes) * 100).toFixed(1)
      })
      uploadTask.then((snap) => {
        vm.fileProgress = null
        snap.ref.getDownloadURL().then((url) => vm.newObj.content.attachment = url)
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
